# Railway Deployment Guide for Soundflakes

This guide will help you deploy your Soundflakes app to Railway in just a few minutes.

## Prerequisites

- A GitHub account
- A Railway account (free tier available)
- Your code pushed to a GitHub repository

## Step 1: Prepare Your Code

### 1.1 Ensure Required Files Exist

Make sure you have these files in your project root:
- ✅ `package.json` (already created)
- ✅ `server.js` (your WebSocket server)
- ✅ `index.html` (your main app file)
- ✅ `railway.json` (Railway configuration - already exists)

### 1.2 Verify package.json

Your `package.json` should look like this:
```json
{
  "name": "soundflakes",
  "version": "1.0.0",
  "description": "Soundflakes master-slave audio system",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "ws": "^8.18.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 1.3 Push to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Railway deployment"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Railway

### 2.1 Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Sign up with GitHub (recommended - one-click setup)

### 2.2 Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub (if prompted)
4. Select your `soundflakes` repository

### 2.3 Railway Auto-Detection

Railway will automatically:
- ✅ Detect Node.js
- ✅ Read `package.json`
- ✅ Install dependencies (`npm install`)
- ✅ Start the server using `node server.js` (from your start script)
- ✅ Assign a public URL

### 2.4 Get Your App URL

Once deployed, Railway will provide a URL like:
```
https://your-app-name.up.railway.app
```

**Save this URL** - you'll need it!

## Step 3: Configure Domain (Optional)

### 3.1 Generate Railway Domain

1. In Railway dashboard → Your project
2. Click on **"Settings"**
3. Under **"Domains"**, click **"Generate Domain"**
4. Railway will create a custom domain like: `your-app-name.up.railway.app`

### 3.2 Custom Domain (Optional)

If you have your own domain:
1. In Railway → Settings → Domains
2. Click **"Add Custom Domain"**
3. Enter your domain name
4. Follow Railway's DNS instructions

## Step 4: Test Your Deployment

### 4.1 Master Device

Open in browser:
```
https://your-app-name.up.railway.app
```

### 4.2 Slave Device

Open in browser:
```
https://your-app-name.up.railway.app?slave=true
```

Or scan the QR code from the master device!

## Step 5: Environment Variables (Optional)

Railway automatically sets `PORT` via `process.env.PORT`, which your server already uses.

If you need custom environment variables:
1. Railway dashboard → Your project → Variables
2. Add any variables you need
3. Railway will restart automatically

## Troubleshooting

### App Not Starting?

1. **Check Logs:**
   - Railway dashboard → Your project → Deployments
   - Click on the latest deployment
   - View logs to see errors

2. **Common Issues:**
   - Missing `package.json` → Make sure it exists
   - Wrong start command → Check `package.json` scripts
   - Port issues → Railway sets PORT automatically, your code handles this

### WebSocket Not Connecting?

1. **Check Protocol:**
   - Railway uses HTTPS, so WebSockets use WSS
   - Your code already handles this automatically!

2. **Check URL:**
   - Make sure you're using the Railway-provided URL
   - Don't use localhost URLs

3. **Check Browser Console:**
   - Open browser DevTools → Console
   - Look for WebSocket connection errors

### QR Code Not Working?

1. **Check URL:**
   - QR code should point to Railway URL
   - Not localhost or IP address

2. **HTTPS Required:**
   - Some browsers require HTTPS for WebSocket connections
   - Railway provides HTTPS automatically

## Railway Features

### Auto-Deploy

Railway automatically deploys when you push to GitHub:
1. Push code to GitHub
2. Railway detects the push
3. Builds and deploys automatically
4. Your app updates live!

### Monitoring

Railway provides:
- **Real-time logs** - See what's happening
- **Metrics** - CPU, memory usage
- **Deployment history** - Track all deployments

### Scaling

Railway can scale your app:
- **Free tier:** Good for testing and small usage
- **Hobby plan ($5/month):** More resources
- **Pro plan ($20/month):** Production-ready

## Pricing

- **Free tier:** $5 credit/month (usually enough for testing)
- **Hobby:** $5/month (if you need more)
- **Pro:** $20/month (for production)

## Next Steps

1. ✅ Deploy to Railway
2. ✅ Test master and slave connections
3. ✅ Share URL with your devices
4. ✅ Enjoy your live app! 🎵

## Support

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)

---

**That's it!** Your app should now be live on Railway. The WebSocket connections will work automatically because Railway provides HTTPS, and your code already handles WSS (secure WebSocket) connections.

