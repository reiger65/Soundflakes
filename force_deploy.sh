#!/bin/bash

cd /Users/hanshoukes/Desktop/soundmarbles

echo "🔍 Checking git status..."
git status

echo ""
echo "📦 Staging all changes..."
git add -A

echo ""
echo "💾 Committing..."
git commit -m "Deploy: Intro improvements $(date +%Y-%m-%d\ %H:%M:%S)" || echo "Nothing to commit"

echo ""
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Check Railway dashboard for deployment."

