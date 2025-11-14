#!/bin/bash

# Push Soundflakes to GitHub
# Run this script to push all files to GitHub

cd /Users/hanshoukes/Desktop/soundmarbles

echo "🚀 Pushing Soundflakes to GitHub..."
echo ""

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add remote (remove if exists, then add)
echo "🔗 Setting up GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/reiger65/Soundflakes.git

# Add all files
echo "📝 Staging all files..."
git add .

# Commit
echo "💾 Committing files..."
git commit -m "Initial commit: Soundflakes ready for Railway deployment" || echo "Files already committed"

# Set branch to main
echo "🌿 Setting branch to main..."
git branch -M main

# Show status
echo ""
echo "📋 Current status:"
git status --short | head -10
echo ""

# Push
echo "⬆️  Pushing to GitHub..."
echo "   (You may be prompted for GitHub credentials)"
git push -u origin main

echo ""
echo "✅ Done! Check https://github.com/reiger65/Soundflakes to verify files are uploaded."

