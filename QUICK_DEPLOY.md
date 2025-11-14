# 🚀 Quick Deploy to Railway

## What's Already Done ✅

- ✅ Git repository initialized
- ✅ All files prepared
- ✅ `package.json` created
- ✅ `railway.json` configured
- ✅ WebSocket URL handling fixed for Railway

## Next Steps (5 minutes)

### 1. Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: `soundflakes`
3. **Don't** check "Initialize with README"
4. Click **"Create repository"**

### 2. Push to GitHub

Copy and paste these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd /Users/hanshoukes/Desktop/soundmarbles

# Add all files and commit
git add .
git commit -m "Ready for Railway deployment"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/soundflakes.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Deploy to Railway

1. Go to: **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (one-click)
4. Click **"New Project"**
5. Select **"Deploy from GitHub repo"**
6. Choose your **`soundflakes`** repository
7. **Done!** Railway will auto-deploy

### 4. Get Your URL

Railway will show your app URL:
```
https://your-app-name.up.railway.app
```

**Master:** `https://your-app-name.up.railway.app`  
**Slave:** `https://your-app-name.up.railway.app?slave=true`

## That's It! 🎉

Your app is now live on Railway!

## Need Help?

See `GITHUB_RAILWAY_SETUP.md` for detailed instructions.

