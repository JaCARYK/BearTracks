from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Location, User, ItemFound, ItemLost
from datetime import datetime, timedelta
import uuid

def init_database():
    """Initialize database with sample data"""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(Location).count() > 0:
            print("Database already initialized!")
            return
        
        # Create sample locations
        locations = [
            Location(name="Powell Library - Front Desk", building="Powell Library", floor="1"),
            Location(name="Kerckhoff Hall - Information Desk", building="Kerckhoff Hall", floor="1"),
            Location(name="Ackerman Union - Lost & Found", building="Ackerman Union", floor="2"),
            Location(name="Royce Hall - Security Office", building="Royce Hall", floor="1"),
            Location(name="Hedrick Hall - Residential Desk", building="Hedrick Hall", floor="1"),
            Location(name="De Neve Plaza - Front Desk", building="De Neve Plaza", floor="1"),
            Location(name="Wooden Center - Reception", building="Wooden Center", floor="1"),
            Location(name="Engineering Building - Office", building="Engineering Building", floor="1"),
            Location(name="Life Sciences Building - Office", building="Life Sciences Building", floor="1"),
            Location(name="Campus Security Office", building="Campus Security", floor="1"),
        ]
        
        for location in locations:
            db.add(location)
        
        db.commit()
        
        # Create sample users
        users = [
            User(
                email="sarah.johnson@ucla.edu",
                name="Sarah Johnson",
                role="office"
            ),
            User(
                email="mike.chen@ucla.edu", 
                name="Mike Chen",
                role="office"
            ),
            User(
                email="lisa.park@ucla.edu",
                name="Lisa Park", 
                role="office"
            ),
            User(
                email="alex.rodriguez@ucla.edu",
                name="Alex Rodriguez",
                role="student"
            ),
            User(
                email="emma.wilson@ucla.edu",
                name="Emma Wilson",
                role="student"
            )
        ]
        
        for user in users:
            db.add(user)
        
        db.commit()
        
        # Get user IDs for sample items
        sarah = db.query(User).filter(User.email == "sarah.johnson@ucla.edu").first()
        mike = db.query(User).filter(User.email == "mike.chen@ucla.edu").first()
        lisa = db.query(User).filter(User.email == "lisa.park@ucla.edu").first()
        alex = db.query(User).filter(User.email == "alex.rodriguez@ucla.edu").first()
        
        # Create sample found items
        found_items = [
            ItemFound(
                title="Blue Hydro Flask",
                description="21oz blue water bottle with UCLA sticker near the cap",
                category="bottles",
                location_id=2,  # Kerckhoff Hall
                reporter_id=sarah.id,
                found_at=datetime.now() - timedelta(hours=2),
                status="available"
            ),
            ItemFound(
                title="iPhone 14 Pro",
                description="Space Gray iPhone 14 Pro with clear case and screen protector",
                category="electronics", 
                location_id=1,  # Powell Library
                reporter_id=mike.id,
                found_at=datetime.now() - timedelta(hours=4),
                status="on_hold"
            ),
            ItemFound(
                title="Black Jansport Backpack",
                description="Black Jansport backpack with laptop inside, has a small UCLA keychain",
                category="accessories",
                location_id=3,  # Ackerman Union
                reporter_id=lisa.id,
                found_at=datetime.now() - timedelta(days=1),
                status="available"
            ),
            ItemFound(
                title="Silver MacBook Air",
                description="13-inch MacBook Air M2, silver color with some stickers on the lid",
                category="electronics",
                location_id=1,  # Powell Library
                reporter_id=sarah.id,
                found_at=datetime.now() - timedelta(hours=6),
                status="available"
            ),
            ItemFound(
                title="Red Nike Hoodie",
                description="Red Nike hoodie, size Medium, with UCLA logo on front",
                category="clothing",
                location_id=5,  # Hedrick Hall
                reporter_id=mike.id,
                found_at=datetime.now() - timedelta(hours=8),
                status="available"
            )
        ]
        
        for item in found_items:
            db.add(item)
        
        # Create sample lost items
        lost_items = [
            ItemLost(
                title="Blue Water Bottle",
                description="Blue Hydro Flask 21oz with black lid and UCLA sticker",
                last_seen_location_id=2,  # Kerckhoff Hall
                last_seen_at=datetime.now() - timedelta(hours=3),
                reporter_id=alex.id
            ),
            ItemLost(
                title="Black Backpack with Laptop",
                description="Black Jansport backpack containing MacBook Pro and textbooks",
                last_seen_location_id=3,  # Ackerman Union
                last_seen_at=datetime.now() - timedelta(days=1, hours=2),
                reporter_id=alex.id
            )
        ]
        
        for item in lost_items:
            db.add(item)
        
        db.commit()
        print("Database initialized successfully with sample data!")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_database()