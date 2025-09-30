# 🚀 BearTracks.Nice Deployment Guide

## Quick Deploy to Vercel + Railway

### Step 1: Deploy Backend to Railway

1. **Create Railway Account**: Go to [railway.app](https://railway.app) and sign up
2. **Connect GitHub**: Link your GitHub account
3. **Deploy Backend**:
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
4. **Create New Project** in Railway dashboard
5. **Deploy from GitHub** - select your repository
6. **Set Root Directory** to `backend`
7. **Add Environment Variables**:
   ```
   DATABASE_URL=sqlite:///./beartracks.db
   SECRET_KEY=your-super-secret-key-here
   DEBUG=false
   ```
8. **Deploy** - Railway will automatically build and deploy
9. **Copy the Railway URL** (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Connect GitHub**: Link your GitHub account  
3. **Import Project**: Click "New Project" and select your repository
4. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Root Directory: `.` (leave empty)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app
   ```
6. **Deploy** - Vercel will build and deploy automatically
7. **Your app is live!** 🎉

## Alternative: Deploy Backend to Render

### Option B: Use Render for Backend

1. **Create Render Account**: Go to [render.com](https://render.com)
2. **Create Web Service**:
   - Connect GitHub repository
   - Root Directory: `backend`
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. **Add Environment Variables**:
   ```
   DATABASE_URL=sqlite:///./beartracks.db
   SECRET_KEY=your-secret-key
   DEBUG=false
   ```
4. **Deploy** and copy the Render URL

## Environment Variables Reference

### Backend (.env)
```bash
DATABASE_URL=sqlite:///./beartracks.db
SECRET_KEY=your-super-secret-key-change-in-production
DEBUG=false
UPLOAD_DIR=uploads
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## Custom Domain Setup

### Vercel Custom Domain
1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `beartracks.youruniversity.edu`)
4. Follow DNS configuration instructions

### SSL Certificate
- Both Vercel and Railway provide automatic SSL certificates
- Your app will be available over HTTPS

## Database Considerations

### For Production (Recommended)
Replace SQLite with PostgreSQL:

1. **Create PostgreSQL Database**:
   - Railway: Add PostgreSQL service
   - Render: Add PostgreSQL add-on
   - Supabase: Create new project

2. **Update DATABASE_URL**:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

3. **Install PostgreSQL dependencies**:
   ```bash
   pip install psycopg2-binary
   ```

## Monitoring & Analytics

### Add Error Tracking
```bash
npm install @sentry/nextjs
pip install sentry-sdk[fastapi]
```

### Add Analytics
```bash
npm install @vercel/analytics
```

## Security Checklist

- ✅ Change default SECRET_KEY
- ✅ Set DEBUG=false in production
- ✅ Use HTTPS everywhere
- ✅ Enable CORS only for your domain
- ✅ Add rate limiting (future enhancement)
- ✅ Validate all inputs
- ✅ Use environment variables for secrets

## Scaling Considerations

### When you grow:
1. **Database**: Migrate to PostgreSQL with connection pooling
2. **File Storage**: Use AWS S3 or Cloudinary for photos
3. **Caching**: Add Redis for session management
4. **CDN**: Use Vercel's Edge Network or Cloudflare
5. **Monitoring**: Add Datadog or New Relic

## Troubleshooting

### Common Issues:

**Build Fails on Vercel:**
- Check Node.js version in package.json
- Ensure all dependencies are in package.json
- Check build logs for specific errors

**API Connection Issues:**
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings in backend
- Ensure backend is deployed and accessible

**Database Issues:**
- Check DATABASE_URL format
- Ensure database is initialized
- Check file permissions for SQLite

## Cost Estimates

### Free Tier Limits:
- **Vercel**: 100GB bandwidth, unlimited static sites
- **Railway**: $5/month after free trial, includes database
- **Render**: Free tier with limitations, $7/month for production

### Recommended Production Setup:
- Frontend: Vercel Pro ($20/month)
- Backend: Railway ($5-20/month)
- Database: Railway PostgreSQL (included)
- **Total**: ~$25-40/month

---

## 🎉 You're Live!

Once deployed, your BearTracks.Nice will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **API**: `https://your-backend.railway.app`
- **API Docs**: `https://your-backend.railway.app/docs`

Share the link with your campus community and start reuniting lost items! 🐻✨