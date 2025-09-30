from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, ForeignKey, LargeBinary
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import uuid

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    campus_id = Column(String(64), unique=True, nullable=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, default="student")  # student, office, admin
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    found_items = relationship("ItemFound", back_populates="reporter")
    lost_items = relationship("ItemLost", back_populates="reporter")
    claims = relationship("Claim", foreign_keys="Claim.claimant_id", back_populates="claimant")

class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    building = Column(String, nullable=False)
    floor = Column(String, nullable=True)
    
    # Relationships
    found_items = relationship("ItemFound", back_populates="location")
    lost_items = relationship("ItemLost", back_populates="last_seen_location")

class ItemFound(Base):
    __tablename__ = "items_found"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    reporter_id = Column(String, ForeignKey("users.id"), nullable=False)
    found_at = Column(DateTime, nullable=False)
    status = Column(String, default="available")  # available, on_hold, claimed, donated, disposed
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    location = relationship("Location", back_populates="found_items")
    reporter = relationship("User", back_populates="found_items")
    photos = relationship("ItemPhoto", back_populates="item", cascade="all, delete-orphan")
    claims = relationship("Claim", back_populates="found_item")
    matches = relationship("Match", foreign_keys="Match.found_id", back_populates="found_item")

class ItemPhoto(Base):
    __tablename__ = "item_photos"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    item_id = Column(String, ForeignKey("items_found.id", ondelete="CASCADE"), nullable=False)
    url = Column(String, nullable=False)
    phash = Column(String, nullable=True)  # Perceptual hash as string
    img_embedding = Column(LargeBinary, nullable=True)  # Store as binary for now
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    item = relationship("ItemFound", back_populates="photos")

class ItemLost(Base):
    __tablename__ = "items_lost"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    reporter_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    last_seen_location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    last_seen_at = Column(DateTime, nullable=False)
    photo_url = Column(String, nullable=True)
    text_embedding = Column(LargeBinary, nullable=True)  # Store as binary for now
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    reporter = relationship("User", back_populates="lost_items")
    last_seen_location = relationship("Location", back_populates="lost_items")
    matches = relationship("Match", foreign_keys="Match.lost_id", back_populates="lost_item")

class Match(Base):
    __tablename__ = "matches"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    lost_id = Column(String, ForeignKey("items_lost.id"), nullable=False)
    found_id = Column(String, ForeignKey("items_found.id"), nullable=False)
    score = Column(Float, nullable=False)
    auto_suggested = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    lost_item = relationship("ItemLost", foreign_keys=[lost_id], back_populates="matches")
    found_item = relationship("ItemFound", foreign_keys=[found_id], back_populates="matches")

class Claim(Base):
    __tablename__ = "claims"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    found_id = Column(String, ForeignKey("items_found.id"), nullable=False)
    claimant_id = Column(String, ForeignKey("users.id"), nullable=False)
    status = Column(String, default="requested")  # requested, verified, rejected, picked_up
    hold_code = Column(String(6), nullable=True)
    requested_at = Column(DateTime, server_default=func.now())
    verified_at = Column(DateTime, nullable=True)
    verifier_id = Column(String, ForeignKey("users.id"), nullable=True)
    
    # Relationships
    found_item = relationship("ItemFound", back_populates="claims")
    claimant = relationship("User", foreign_keys=[claimant_id], back_populates="claims")
    verifier = relationship("User", foreign_keys=[verifier_id])