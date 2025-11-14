#!/bin/bash

# Soundmarbles Railway Deployment Script
# This script helps you deploy to Railway via GitHub

echo "🚀 Soundmarbles Railway Deployment Helper"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Check current git status
echo "📋 Current git status:"
git status --short
echo ""

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ GitHub remote already configured:"
    git remote -v
    echo ""
    echo "To push to GitHub, run:"
    echo "  git push -u origin main"
else
    echo "⚠️  No GitHub remote configured yet."
    echo ""
    echo "📝 Next steps:"
    echo "1. Create a new repository on GitHub:"
    echo "   - Go to: https://github.com/new"
    echo "   - Name it: soundmarbles (or your preferred name)"
    echo "   - Don't initialize with README (we already have one)"
    echo ""
    echo "2. Add the remote and push:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/soundmarbles.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
fi

echo ""
echo "🔗 After pushing to GitHub:"
echo "1. Go to: https://railway.app"
echo "2. Sign up/login with GitHub"
echo "3. Click 'New Project' → 'Deploy from GitHub repo'"
echo "4. Select your 'soundmarbles' repository"
echo "5. Railway will auto-deploy!"
echo ""
echo "✅ Your app will be live at: https://your-app-name.up.railway.app"
echo ""

