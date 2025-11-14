#!/bin/bash

# Complete push script for Soundflakes
cd /Users/hanshoukes/Desktop/soundmarbles

echo "🚀 Complete GitHub Push Setup"
echo "=============================="
echo ""

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git..."
    git init
fi

# Add all files
echo "📝 Adding all files..."
git add .

# Commit
echo "💾 Committing files..."
git commit -m "Initial commit: Soundflakes ready for Railway deployment" || echo "Already committed"

# Remove old remote if exists
git remote remove origin 2>/dev/null

# Add remote
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/reiger65/Soundflakes.git

# Set branch
echo "🌿 Setting branch to main..."
git branch -M main

# Show what will be pushed
echo ""
echo "📋 Files ready to push:"
git ls-files | head -10
echo "..."

# Push
echo ""
echo "⬆️  Pushing to GitHub..."
echo "   When prompted:"
echo "   Username: reiger65"
echo "   Password: Paste your token"
echo ""
git push -u origin main

echo ""
echo "✅ Done! Check https://github.com/reiger65/Soundflakes"

