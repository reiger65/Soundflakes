# Vercel Deployment Guide

## ⚠️ Important Limitations

**Vercel does NOT support WebSockets on their free plan.** This app requires WebSockets for real-time communication between master and slave devices.

### Options:

## Option 1: Vercel Pro Plan (💰 $20/month)

Vercel Pro plan supports WebSockets. However, you'll need to adapt the code:

1. **Create `vercel.json`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. **Modify `server.js`** to work with Vercel's serverless functions (complex - requires refactoring)

3. **Use Vercel's WebSocket support** (Pro plan only)

**Recommendation:** Not worth it - use Railway or Render instead (cheaper/easier)

---

## Option 2: Hybrid Approach (Vercel + Separate WebSocket Service)

Deploy static files to Vercel, use a separate service for WebSockets:

### Option 2a: Vercel (Static) + Railway/Render (WebSocket Server)

1. **Deploy static HTML to Vercel:**
   - Create `public/index.html` 
   - Deploy to Vercel (free)
   - Gets you: `https://your-app.vercel.app`

2. **Deploy WebSocket server to Railway/Render:**
   - Deploy `server.js` to Railway (free tier available)
   - Gets you: `wss://your-ws-server.railway.app`

3. **Update client code** to connect to separate WebSocket server

**Complexity:** Medium - requires code changes

---

## Option 3: Use Railway Instead (Recommended) ✅

**Railway is better suited for this app:**

- ✅ **Free tier available** (with limits)
- ✅ **Full WebSocket support**
- ✅ **Easier deployment** - just connect GitHub
- ✅ **No code changes needed**

### Railway Deployment Steps:

1. **Sign up:** [railway.app](https://railway.app)

2. **Create new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure:**
   - Railway auto-detects Node.js
   - Add environment variable: `PORT=3000` (optional, Railway sets this automatically)

4. **Deploy:**
   - Railway automatically builds and deploys
   - You get a URL like: `https://your-app.railway.app`

5. **Done!** Your app works with WebSockets

**Cost:** Free tier: $5 credit/month (usually enough for small apps)

---

## Option 4: Use Render (Also Recommended) ✅

Similar to Railway:

1. **Sign up:** [render.com](https://render.com)

2. **Create Web Service:**
   - New → Web Service
   - Connect GitHub repo
   - Build: `npm install`
   - Start: `node server.js`

3. **Deploy:**
   - Render gives you: `https://your-app.onrender.com`

**Cost:** Free tier available (with some limitations)

---

## Comparison

| Platform | WebSocket Support | Free Tier | Ease of Use | Best For |
|----------|------------------|-----------|-------------|----------|
| **Vercel** | ❌ Free / ✅ Pro ($20/mo) | ✅ | ⭐⭐⭐⭐⭐ | Static sites, serverless |
| **Railway** | ✅ | ✅ ($5 credit/mo) | ⭐⭐⭐⭐ | Node.js apps, WebSockets |
| **Render** | ✅ | ✅ | ⭐⭐⭐⭐ | Node.js apps, WebSockets |
| **Fly.io** | ✅ | ✅ | ⭐⭐⭐ | Docker, global deployment |

---

## Recommendation

**Use Railway or Render instead of Vercel** for this app because:
- ✅ WebSocket support (required for your app)
- ✅ Free tier available
- ✅ Easier deployment (no code changes needed)
- ✅ Better suited for real-time apps

Vercel is great for static sites and serverless functions, but not ideal for WebSocket-based real-time applications.

---

## Quick Railway Setup

If you want to deploy to Railway right now:

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Railway auto-detects and deploys
6. Done! 🎉

No `vercel.json` or code changes needed - it just works!













