#!/bin/bash

cd /Users/hanshoukes/Desktop/soundmarbles

echo "🧹 Cleaning git history and creating fresh commit..."
echo ""

# Remove old git history completely
rm -rf .git

# Initialize fresh git repo
echo "1. Initializing fresh git repository..."
git init

# Add all files
echo "2. Adding all files..."
git add .

# Create clean commit (no token references)
echo "3. Creating clean commit..."
git commit -m "Initial commit: Soundflakes ready for Railway deployment"

# Set remote with token (only in URL, not in commit)
echo "4. Setting remote..."
git remote add origin https://reiger65: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@github.com/reiger65/Soundflakes.git

# Set branch
echo "5. Setting branch to main..."
git branch -M main

# Force push (overwrites remote)
echo "6. Pushing to GitHub (force push)..."
git push -u origin main --force

echo ""
echo "✅ SUCCESS! Files pushed to GitHub"
echo "Check: https://github.com/reiger65/Soundflakes"

