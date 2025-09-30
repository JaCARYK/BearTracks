from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from datetime import datetime
import os
import uuid
import random
import string

from models import ItemFound, ItemLost, ItemPhoto, Claim, User, Location
from schemas import ItemFoundCreate, ItemLostCreate, ClaimCreate, StatsResponse
from .file_service import FileService

class ItemService:
    def __init__(self):
        self.file_service = FileService()
    
    async def create_found_item(self, db: Session, item_data: ItemFoundCreate, photos: List):
        # Create or get user
        user = db.query(User).filter(User.email == item_data.reporter_email).first()
        if not user:
            user = User(
                email=item_data.reporter_email,
                name=item_data.reporter_name,
                role="office"
            )
            db.add(user)
            db.flush()
        
        # Parse datetime
        found_datetime = datetime.fromisoformat(item_data.found_date)
        if item_data.found_time:
            time_parts = item_data.found_time.split(':')
            found_datetime = found_datetime.replace(
                hour=int(time_parts[0]),
                minute=int(time_parts[1])
            )
        
        # Create item
        item = ItemFound(
            title=item_data.title,
            description=item_data.description,
            category=item_data.category,
            location_id=item_data.location_id,
            reporter_id=user.id,
            found_at=found_datetime
        )
        db.add(item)
        db.flush()
        
        # Handle photo uploads
        for photo in photos:
            if photo.filename:
                photo_url = await self.file_service.save_photo(photo, item.id)
                photo_record = ItemPhoto(
                    item_id=item.id,
                    url=photo_url
                )
                db.add(photo_record)
        
        db.commit()
        db.refresh(item)
        return item
    
    async def get_found_items(self, db: Session, status: Optional[str] = None, 
                            category: Optional[str] = None, location_id: Optional[int] = None,
                            skip: int = 0, limit: int = 100):
        query = db.query(ItemFound)
        
        if status:
            query = query.filter(ItemFound.status == status)
        if category:
            query = query.filter(ItemFound.category == category)
        if location_id:
            query = query.filter(ItemFound.location_id == location_id)
        
        return query.offset(skip).limit(limit).all()
    
    async def get_found_item(self, db: Session, item_id: str):
        return db.query(ItemFound).filter(ItemFound.id == item_id).first()
    
    async def update_item_status(self, db: Session, item_id: str, status: str):
        item = db.query(ItemFound).filter(ItemFound.id == item_id).first()
        if item:
            item.status = status
            db.commit()
            db.refresh(item)
        return item
    
    async def create_lost_item(self, db: Session, item_data: ItemLostCreate):
        # Create or get user
        user = db.query(User).filter(User.email == item_data.reporter_email).first()
        if not user:
            user = User(
                email=item_data.reporter_email,
                name=item_data.reporter_name,
                role="student"
            )
            db.add(user)
            db.flush()
        
        # Parse datetime
        last_seen_datetime = datetime.fromisoformat(item_data.last_seen_at)
        
        # Create item
        item = ItemLost(
            title=item_data.title,
            description=item_data.description,
            last_seen_location_id=item_data.last_seen_location_id,
            last_seen_at=last_seen_datetime,
            reporter_id=user.id,
            photo_url=item_data.photo_url
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        return item
    
    async def create_claim(self, db: Session, claim_data: ClaimCreate):
        # Create or get user
        user = db.query(User).filter(User.email == claim_data.claimant_email).first()
        if not user:
            user = User(
                email=claim_data.claimant_email,
                name=claim_data.claimant_name,
                role="student"
            )
            db.add(user)
            db.flush()
        
        # Generate hold code
        hold_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        
        # Create claim
        claim = Claim(
            found_id=claim_data.found_id,
            claimant_id=user.id,
            hold_code=hold_code
        )
        db.add(claim)
        
        # Update item status to on_hold
        item = db.query(ItemFound).filter(ItemFound.id == claim_data.found_id).first()
        if item:
            item.status = "on_hold"
        
        db.commit()
        db.refresh(claim)
        return claim
    
    async def get_claims(self, db: Session, status: Optional[str] = None, skip: int = 0, limit: int = 100):
        query = db.query(Claim)
        if status:
            query = query.filter(Claim.status == status)
        return query.offset(skip).limit(limit).all()
    
    async def verify_claim(self, db: Session, claim_id: str, verification):
        claim = db.query(Claim).filter(Claim.id == claim_id).first()
        if claim:
            if verification.verified:
                claim.status = "verified"
                claim.verified_at = datetime.utcnow()
                claim.verifier_id = verification.verifier_id
            else:
                claim.status = "rejected"
                # Return item to available status
                item = db.query(ItemFound).filter(ItemFound.id == claim.found_id).first()
                if item:
                    item.status = "available"
            
            db.commit()
            db.refresh(claim)
        return claim
    
    async def get_locations(self, db: Session):
        return db.query(Location).all()
    
    async def get_stats(self, db: Session) -> StatsResponse:
        total_items = db.query(ItemFound).count()
        available_items = db.query(ItemFound).filter(ItemFound.status == "available").count()
        on_hold_items = db.query(ItemFound).filter(ItemFound.status == "on_hold").count()
        claimed_items = db.query(ItemFound).filter(ItemFound.status == "claimed").count()
        pending_claims = db.query(Claim).filter(Claim.status == "requested").count()
        
        return StatsResponse(
            total_items=total_items,
            available_items=available_items,
            on_hold_items=on_hold_items,
            claimed_items=claimed_items,
            pending_claims=pending_claims,
            items_reunited=claimed_items,  # Simplified for MVP
            match_accuracy=0.89  # Mock value for MVP
        )