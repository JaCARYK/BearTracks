import os
import uuid
import shutil
from pathlib import Path
from fastapi import UploadFile
import imagehash
from PIL import Image

class FileService:
    def __init__(self):
        self.upload_dir = Path("uploads")
        self.upload_dir.mkdir(exist_ok=True)
    
    async def save_photo(self, photo: UploadFile, item_id: str) -> str:
        """Save uploaded photo and return URL"""
        # Generate unique filename
        file_extension = photo.filename.split('.')[-1] if photo.filename else 'jpg'
        filename = f"{item_id}_{uuid.uuid4().hex}.{file_extension}"
        file_path = self.upload_dir / filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
        
        # Return URL path
        return f"/uploads/{filename}"
    
    def compute_phash(self, image_path: str) -> str:
        """Compute perceptual hash for image deduplication"""
        try:
            with Image.open(image_path) as img:
                hash_value = imagehash.phash(img)
                return str(hash_value)
        except Exception as e:
            print(f"Error computing phash: {e}")
            return None
    
    def delete_photo(self, photo_url: str):
        """Delete photo file"""
        try:
            filename = photo_url.split('/')[-1]
            file_path = self.upload_dir / filename
            if file_path.exists():
                file_path.unlink()
        except Exception as e:
            print(f"Error deleting photo: {e}")