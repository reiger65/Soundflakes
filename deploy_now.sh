#!/bin/bash

# Quick deploy script for Railway
cd /Users/hanshoukes/Desktop/soundmarbles

echo "📦 Staging changes..."
git add index.html

echo "💾 Committing..."
git commit -m "Fix QR code URL for Railway deployment" || echo "No changes to commit"

echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Railway will auto-deploy in 1-2 minutes."
echo "Check: https://railway.app"

