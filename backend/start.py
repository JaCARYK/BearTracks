#!/usr/bin/env python3
"""
BearTracks.Nice Backend Startup Script
"""
import os
import sys
import subprocess
from pathlib import Path

def check_requirements():
    """Check if all requirements are installed"""
    try:
        import fastapi
        import sqlalchemy
        import uvicorn
        print("✅ All requirements are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing requirement: {e}")
        print("Please run: pip install -r requirements.txt")
        return False

def setup_database():
    """Initialize database with sample data"""
    print("🗄️  Setting up database...")
    try:
        from init_db import init_database
        init_database()
        print("✅ Database setup complete")
    except Exception as e:
        print(f"❌ Database setup failed: {e}")
        return False
    return True

def create_upload_directory():
    """Create uploads directory if it doesn't exist"""
    upload_dir = Path("uploads")
    upload_dir.mkdir(exist_ok=True)
    print("📁 Upload directory ready")

def start_server():
    """Start the FastAPI server"""
    print("🚀 Starting BearTracks.Nice API server...")
    print("📍 Server will be available at: http://localhost:8000")
    print("📖 API docs will be available at: http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop the server\n")
    
    try:
        import uvicorn
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except Exception as e:
        print(f"❌ Server failed to start: {e}")

def main():
    print("🐻✨ BearTracks.Nice Backend")
    print("=" * 40)
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Create upload directory
    create_upload_directory()
    
    # Setup database
    if not setup_database():
        sys.exit(1)
    
    # Start server
    start_server()

if __name__ == "__main__":
    main()