from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str = "student"

class UserCreate(UserBase):
    campus_id: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: str
    campus_id: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Location schemas
class LocationResponse(BaseModel):
    id: int
    name: str
    building: str
    floor: Optional[str]
    
    class Config:
        from_attributes = True

# Item schemas
class ItemFoundCreate(BaseModel):
    title: str
    description: str
    category: str
    location_id: int
    reporter_name: str
    reporter_email: EmailStr
    found_date: str
    found_time: Optional[str] = None

class ItemPhotoResponse(BaseModel):
    id: str
    url: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ItemFoundResponse(BaseModel):
    id: str
    title: str
    description: str
    category: str
    location_id: int
    location: Optional[LocationResponse]
    found_at: datetime
    status: str
    created_at: datetime
    photos: List[ItemPhotoResponse] = []
    
    class Config:
        from_attributes = True

class ItemLostCreate(BaseModel):
    title: str
    description: str
    last_seen_location_id: int
    last_seen_at: str
    reporter_name: str
    reporter_email: EmailStr
    photo_url: Optional[str] = None

class ItemLostResponse(BaseModel):
    id: str
    title: str
    description: str
    last_seen_location_id: int
    last_seen_location: Optional[LocationResponse]
    last_seen_at: datetime
    created_at: datetime
    matches_suggested: List[dict] = []
    
    class Config:
        from_attributes = True

# Match schemas
class MatchResponse(BaseModel):
    id: str
    found_id: str
    found_item: Optional[ItemFoundResponse]
    score: float
    auto_suggested: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Claim schemas
class ClaimCreate(BaseModel):
    found_id: str
    claimant_name: str
    claimant_email: EmailStr

class ClaimVerification(BaseModel):
    verified: bool
    verifier_id: str
    notes: Optional[str] = None

class ClaimResponse(BaseModel):
    id: str
    found_id: str
    found_item: Optional[ItemFoundResponse]
    status: str
    hold_code: Optional[str]
    requested_at: datetime
    verified_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Status update schemas
class ItemStatusUpdate(BaseModel):
    status: str  # available, on_hold, claimed, donated, disposed

# Stats schema
class StatsResponse(BaseModel):
    total_items: int
    available_items: int
    on_hold_items: int
    claimed_items: int
    pending_claims: int
    items_reunited: int
    match_accuracy: float