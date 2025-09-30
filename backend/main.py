from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from dotenv import load_dotenv

from database import get_db, engine
from models import Base
from schemas import *
from services.item_service import ItemService
from services.matching_service import MatchingService
from services.auth_service import AuthService

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BearTracks.Nice API",
    description="Campus Lost & Found System",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://beartracks.nice"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploaded photos
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Services
item_service = ItemService()
matching_service = MatchingService()
auth_service = AuthService()

@app.get("/")
async def root():
    return {"message": "BearTracks.Nice API is running! 🐻✨"}

# Auth endpoints
@app.post("/api/auth/register", response_model=UserResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    return await auth_service.create_user(db, user_data)

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    return await auth_service.authenticate_user(db, credentials)

# Found items endpoints
@app.post("/api/found", response_model=ItemFoundResponse)
async def create_found_item(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    location_id: int = Form(...),
    reporter_name: str = Form(...),
    reporter_email: str = Form(...),
    found_date: str = Form(...),
    found_time: Optional[str] = Form(None),
    photos: List[UploadFile] = File([]),
    db: Session = Depends(get_db)
):
    item_data = ItemFoundCreate(
        title=title,
        description=description,
        category=category,
        location_id=location_id,
        reporter_name=reporter_name,
        reporter_email=reporter_email,
        found_date=found_date,
        found_time=found_time
    )
    return await item_service.create_found_item(db, item_data, photos)

@app.get("/api/found", response_model=List[ItemFoundResponse])
async def get_found_items(
    status: Optional[str] = None,
    category: Optional[str] = None,
    location_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return await item_service.get_found_items(db, status, category, location_id, skip, limit)

@app.get("/api/found/{item_id}", response_model=ItemFoundResponse)
async def get_found_item(item_id: str, db: Session = Depends(get_db)):
    item = await item_service.get_found_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.put("/api/found/{item_id}/status")
async def update_item_status(
    item_id: str,
    status_update: ItemStatusUpdate,
    db: Session = Depends(get_db)
):
    return await item_service.update_item_status(db, item_id, status_update.status)

# Lost items endpoints
@app.post("/api/lost", response_model=ItemLostResponse)
async def create_lost_item(
    item_data: ItemLostCreate,
    db: Session = Depends(get_db)
):
    # Create lost item and find matches
    lost_item = await item_service.create_lost_item(db, item_data)
    matches = await matching_service.find_matches(db, lost_item.id)
    
    return ItemLostResponse(
        **lost_item.dict(),
        matches_suggested=[{"found_id": m.found_id, "score": m.score} for m in matches[:5]]
    )

@app.get("/api/lost/{item_id}/matches", response_model=List[MatchResponse])
async def get_matches(item_id: str, db: Session = Depends(get_db)):
    return await matching_service.get_matches_for_lost_item(db, item_id)

# Claims endpoints
@app.post("/api/claims", response_model=ClaimResponse)
async def create_claim(claim_data: ClaimCreate, db: Session = Depends(get_db)):
    return await item_service.create_claim(db, claim_data)

@app.get("/api/claims", response_model=List[ClaimResponse])
async def get_claims(
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return await item_service.get_claims(db, status, skip, limit)

@app.put("/api/claims/{claim_id}/verify")
async def verify_claim(
    claim_id: str,
    verification: ClaimVerification,
    db: Session = Depends(get_db)
):
    return await item_service.verify_claim(db, claim_id, verification)

# Locations endpoint
@app.get("/api/locations", response_model=List[LocationResponse])
async def get_locations(db: Session = Depends(get_db)):
    return await item_service.get_locations(db)

# Stats endpoint
@app.get("/api/stats", response_model=StatsResponse)
async def get_stats(db: Session = Depends(get_db)):
    return await item_service.get_stats(db)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)