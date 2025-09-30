#!/bin/bash

echo "🐻✨ Starting BearTracks.Nice Development Environment"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
echo "🔍 Checking dependencies..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Dependencies check passed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
fi

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
fi

echo "🗄️  Initializing database..."
python init_db.py

cd ..

# Create frontend .env file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating frontend .env file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
fi

echo ""
echo "🚀 Starting services..."
echo "Backend API: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start backend in background
cd backend
source venv/bin/activate
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

cd ..

# Start frontend in background
npm run dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "👋 All services stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait