# 🚀 BearTracks.Nice - Quick Start Guide

Get your MVP running in 5 minutes!

## Prerequisites
- Node.js 18+ 
- Python 3.8+
- Terminal/Command Prompt

## Step 1: Install Frontend Dependencies
```bash
npm install
```

## Step 2: Setup Backend
```bash
cd backend

# Create virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Initialize database with sample data
python init_db.py
```

## Step 3: Start Backend API
```bash
# Make sure you're in the backend directory
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Start the API server
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

## Step 4: Start Frontend (New Terminal)
```bash
# In a new terminal, from project root
npm run dev
```

You should see:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

## Step 5: Open Your Browser
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **API Health**: http://localhost:8000

## 🎉 You're Ready!

### Test the MVP:
1. **Report Found Item**: Go to http://localhost:3000/found
2. **Report Lost Item**: Go to http://localhost:3000/lost  
3. **Office Dashboard**: Go to http://localhost:3000/office

### Sample Data Included:
- 5 found items (Blue Hydro Flask, iPhone, MacBook, etc.)
- 2 lost items 
- Multiple campus locations
- Office staff users

## Troubleshooting

### Backend Issues:
```bash
# If you get import errors
pip install -r requirements.txt

# If database issues
rm beartracks.db  # Delete old database
python init_db.py  # Recreate with sample data
```

### Frontend Issues:
```bash
# If you get dependency errors
rm -rf node_modules package-lock.json
npm install

# If API connection fails
# Make sure backend is running on port 8000
```

### Port Conflicts:
- Backend uses port 8000
- Frontend uses port 3000
- Change ports in the respective config files if needed

## Next Steps
- Add real authentication
- Implement image matching with AI
- Deploy to production
- Add push notifications

## Need Help?
Check the full README.md for detailed documentation and deployment guides.

---
**Happy coding! 🐻✨**