#!/bin/bash

echo "🚀 BearTracks.Nice Deployment Helper"
echo "===================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - BearTracks.Nice MVP"
    echo "✅ Git repository initialized"
else
    echo "📝 Committing latest changes..."
    git add .
    git commit -m "Deploy: BearTracks.Nice MVP ready for production"
    echo "✅ Changes committed"
fi

echo ""
echo "🔗 Next Steps:"
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/yourusername/beartracks-nice.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy Backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Create new project from GitHub"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import project from GitHub"
echo "   - Add NEXT_PUBLIC_API_URL environment variable"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Your MVP is ready for deployment!"