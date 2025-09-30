@echo off
echo 🐻✨ BearTracks.Nice - Windows Startup
echo =====================================

echo 📦 Installing frontend dependencies...
call npm install

echo 🐍 Setting up backend...
cd backend

echo Creating Python virtual environment...
python -m venv venv
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo 🗄️ Initializing database...
python init_db.py

echo.
echo 🚀 Starting backend server...
echo Backend will run on: http://localhost:8000
echo API docs will be at: http://localhost:8000/docs
echo.
start cmd /k "venv\Scripts\activate.bat && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

cd ..

echo 🌐 Starting frontend...
echo Frontend will run on: http://localhost:3000
echo.
timeout /t 3 /nobreak > nul
start cmd /k "npm run dev"

echo.
echo ✅ Both services are starting!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause > nul