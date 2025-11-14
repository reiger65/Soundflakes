#!/bin/bash

# Setup GitHub Repository for Soundmarbles
# Run this script after creating the GitHub repository

echo "🚀 Soundmarbles GitHub Setup"
echo "============================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Staging all files..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "✅ All files already committed"
else
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit: Soundmarbles app ready for Railway deployment"
fi

echo ""
echo "📋 Current status:"
git status --short
echo ""

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ GitHub remote already configured:"
    git remote -v
    echo ""
    echo "To push, run:"
    echo "  git push -u origin main"
else
    echo "⚠️  No GitHub remote configured yet."
    echo ""
    echo "📝 NEXT STEPS:"
    echo ""
    echo "1. Create GitHub repository:"
    echo "   → Go to: https://github.com/new"
    echo "   → Name: soundflakes"
    echo "   → Description: Master-slave audio system for meditative soundscapes"
    echo "   → Choose Public or Private"
    echo "   → DO NOT check 'Initialize with README'"
    echo "   → Click 'Create repository'"
    echo ""
    echo "2. After creating the repository, run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/soundflakes.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "   (Replace YOUR_USERNAME with your actual GitHub username)"
    echo ""
fi

echo ""
echo "✅ Setup complete! Follow the steps above to push to GitHub."

