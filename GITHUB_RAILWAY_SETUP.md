# GitHub + Railway Deployment Guide

Follow these steps to deploy your Soundflakes app to Railway via GitHub.

## Step 1: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Repository name:** `soundflakes` (or your preferred name)
3. **Description:** "Master-slave audio system for meditative soundscapes"
4. **Visibility:** Public or Private (your choice)
5. **Important:** Do NOT check "Initialize with README" (we already have files)
6. **Click "Create repository"**

## Step 2: Push Code to GitHub

Run these commands in your terminal (from the soundmarbles directory):

```bash
# Make sure you're in the project directory
cd /Users/hanshoukes/Desktop/soundmarbles

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/soundflakes.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You'll be prompted for your GitHub username and password/token.

## Step 3: Deploy to Railway

### 3.1 Create Railway Account

1. **Go to Railway:** https://railway.app
2. **Click "Start a New Project"**
3. **Sign up with GitHub** (recommended - one-click authentication)

### 3.2 Deploy Your App

1. **Click "New Project"**
2. **Select "Deploy from GitHub repo"**
3. **Authorize Railway** to access your GitHub (if prompted)
4. **Select your `soundflakes` repository**
5. **Railway will automatically:**
   - Detect Node.js
   - Install dependencies
   - Start your server
   - Provide a public URL

### 3.3 Get Your App URL

Once deployed, Railway will show:
- **Public URL:** `https://your-app-name.up.railway.app`
- **Status:** Deployed ✅

## Step 4: Test Your App

### Master Device
Open: `https://your-app-name.up.railway.app`

### Slave Device
Open: `https://your-app-name.up.railway.app?slave=true`

Or scan the QR code from the master device!

## Step 5: Configure Custom Domain (Optional)

1. In Railway dashboard → Your project → **Settings**
2. Click **"Generate Domain"** or **"Add Custom Domain"**
3. Follow Railway's instructions

## Auto-Deploy on Push

Railway automatically deploys when you push to GitHub:

```bash
# Make changes to your code
# ... edit files ...

# Commit changes
git add .
git commit -m "Your update message"

# Push to GitHub
git push

# Railway automatically detects the push and redeploys!
```

## Troubleshooting

### "Repository not found"
- Make sure you've created the GitHub repository first
- Check that the repository name matches
- Verify your GitHub username is correct

### "Permission denied"
- Make sure you're authenticated with GitHub
- You may need to use a Personal Access Token instead of password
- GitHub Settings → Developer settings → Personal access tokens

### App not starting on Railway
- Check Railway logs: Dashboard → Your project → Deployments → View logs
- Make sure `package.json` exists and has correct start script
- Verify `server.js` exists

### WebSocket not connecting
- Railway uses HTTPS, so WebSockets automatically use WSS
- Your code already handles this correctly
- Make sure you're using the Railway URL, not localhost

## Quick Reference

**GitHub Repository:** https://github.com/YOUR_USERNAME/soundflakes  
**Railway Dashboard:** https://railway.app  
**Your App URL:** https://your-app-name.up.railway.app

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Docs: https://docs.github.com

---

**That's it!** Your app should now be live on Railway. 🎉

