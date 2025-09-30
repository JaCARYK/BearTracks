#!/bin/bash

echo "🐻✨ BearTracks.Nice - Demo Startup"
echo "=================================="

# Check if backend database exists
if [ ! -f "backend/beartracks.db" ]; then
    echo "🗄️  Initializing database..."
    cd backend
    python3 init_db.py
    cd ..
fi

echo "🚀 Starting BearTracks.Nice for demo..."
echo ""
echo "📍 Frontend will be at: http://localhost:3000"
echo "📍 Backend API will be at: http://localhost:8000"
echo "📍 API docs will be at: http://localhost:8000/docs"
echo ""
echo "🎯 Demo Flow:"
echo "1. Show homepage with beautiful UI"
echo "2. Demo 'Report Lost Item' form"
echo "3. Demo 'Report Found Item' (office view)"
echo "4. Show Office Dashboard with sample data"
echo "5. Show API docs (optional technical demo)"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Start backend in background
cd backend
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
npm run dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping demo services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "👋 Demo stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait