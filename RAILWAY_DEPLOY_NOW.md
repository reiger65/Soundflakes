# Deploy Soundflakes to Railway - Quick Guide

Your code is now on GitHub! Let's deploy it to Railway.

## Step 1: Go to Railway

1. Open: **https://railway.app**
2. Sign up or log in with your **GitHub account** (one-click login)

## Step 2: Create New Project

1. Click **"New Project"** (big button)
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub (if prompted)
4. Find and select your **`Soundflakes`** repository
5. Click it to select

## Step 3: Railway Auto-Deploys

Railway will automatically:
- ✅ Detect Node.js
- ✅ Install dependencies (`npm install`)
- ✅ Start your server (`node server.js`)
- ✅ Give you a public URL

## Step 4: Get Your App URL

Once deployed, Railway will show:
- **Public URL:** `https://your-app-name.up.railway.app`

**Save this URL!**

## Step 5: Test Your App

- **Master:** `https://your-app-name.up.railway.app`
- **Slave:** `https://your-app-name.up.railway.app?slave=true`

## That's It! 🎉

Your app is now live on Railway!

## Troubleshooting

**If deployment fails:**
- Check Railway logs: Dashboard → Your project → Deployments → View logs
- Make sure `package.json` exists (it does!)
- Make sure `server.js` exists (it does!)

**If WebSocket doesn't work:**
- Railway uses HTTPS automatically
- Your code already handles WSS (secure WebSocket)
- Should work automatically!

---

**Next:** Go to https://railway.app and follow the steps above!

