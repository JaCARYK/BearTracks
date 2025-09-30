from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

from models import User
from schemas import UserCreate, UserLogin, UserResponse, TokenResponse

class AuthService:
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.secret_key = os.getenv("SECRET_KEY", "your-secret-key-here")
        self.algorithm = "HS256"
        self.access_token_expire_minutes = 30
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)
    
    def get_password_hash(self, password: str) -> str:
        return self.pwd_context.hash(password)
    
    def create_access_token(self, data: dict, expires_delta: timedelta = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt
    
    async def create_user(self, db: Session, user_data: UserCreate) -> UserResponse:
        # For MVP, we'll create users without password (simplified auth)
        user = User(
            email=user_data.email,
            name=user_data.name,
            role=user_data.role,
            campus_id=user_data.campus_id
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return UserResponse.from_orm(user)
    
    async def authenticate_user(self, db: Session, credentials: UserLogin) -> TokenResponse:
        # For MVP, simplified auth - just check if user exists
        user = db.query(User).filter(User.email == credentials.email).first()
        if not user:
            # Create user on first login (simplified for MVP)
            user = User(
                email=credentials.email,
                name=credentials.email.split('@')[0],  # Use email prefix as name
                role="student"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        # Create access token
        access_token_expires = timedelta(minutes=self.access_token_expire_minutes)
        access_token = self.create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse.from_orm(user)
        )