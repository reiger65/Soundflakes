# Railway Deployment - Quick Setup Guide

Railway is the **easiest** option for deploying this app. It auto-detects everything and works out of the box!

## 🚀 Step-by-Step Setup (5 minutes)

### 1. Push to GitHub (if not already)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Railway

1. **Go to:** [railway.app](https://railway.app)
2. **Sign up** with GitHub (one-click)
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository** (`soundmarbles`)
6. **Railway automatically:**
   - Detects Node.js
   - Installs dependencies (`npm install`)
   - Starts server (`node server.js`)
   - Gives you a URL like: `https://your-app.railway.app`

### 3. That's it! 🎉

Your app is live! Railway handles everything automatically.

## 📱 Access from iPhone

Once deployed, you'll get a URL like: `https://your-app.railway.app`

- **Master:** `https://your-app.railway.app`
- **Slave:** `https://your-app.railway.app?slave=true`

Open in Safari on your iPhone - it works!

## ⚙️ Optional: Set Custom Domain

1. In Railway dashboard → Your project → Settings
2. Click "Generate Domain" or add custom domain
3. Update your URLs

## 💰 Pricing

- **Free tier:** $5 credit/month (usually enough for small apps)
- **Hobby plan:** $5/month (if you need more)
- **Pro plan:** $20/month (for production)

## 🔧 Environment Variables (if needed)

Railway auto-detects `PORT` from environment, but you can set it manually:

1. Railway dashboard → Your project → Variables
2. Add: `PORT=3000` (optional, Railway sets this automatically)

## 📊 Monitoring

Railway shows:
- Logs in real-time
- Resource usage
- Deployments history

## 🐛 Troubleshooting

**App not starting?**
- Check logs in Railway dashboard
- Make sure `package.json` has `"start": "node server.js"`

**WebSocket not connecting?**
- Railway supports WebSockets automatically
- Make sure you're using `wss://` (secure WebSocket) for HTTPS URLs
- The code already handles this automatically!

**Port issues?**
- Railway sets `PORT` automatically via `process.env.PORT`
- The code already uses: `const PORT = process.env.PORT || 3000;`

## ✅ Why Railway is Easiest

- ✅ **Zero configuration** - works with existing code
- ✅ **Auto-detects** Node.js and dependencies
- ✅ **WebSocket support** built-in
- ✅ **Free tier** available
- ✅ **GitHub integration** - auto-deploys on push
- ✅ **HTTPS included** - secure by default

## 🎯 Next Steps

1. Push code to GitHub
2. Connect to Railway
3. Deploy (automatic!)
4. Share URL with your iPhone
5. Enjoy! 🎵

That's it - Railway handles everything else!

















