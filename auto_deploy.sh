#!/bin/bash

# Auto-deploy script: Watches for file changes and auto-commits/pushes to GitHub
# Run this script in the background: ./auto_deploy.sh &

cd /Users/hanshoukes/Desktop/soundmarbles

echo "🔄 Auto-deploy started - watching for file changes..."
echo "Press Ctrl+C to stop"
echo ""

# Check if fswatch is installed
if ! command -v fswatch &> /dev/null; then
    echo "Installing fswatch (file watcher)..."
    brew install fswatch
fi

# Watch for changes (exclude .git directory)
fswatch -o . --exclude='\.git' --exclude='node_modules' --exclude='backup' | while read f; do
    echo ""
    echo "📝 Files changed - auto-committing..."
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    git commit -m "Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')" 2>&1 | grep -v "nothing to commit" || echo "No changes to commit"
    
    # Push to GitHub
    echo "⬆️  Pushing to GitHub..."
    git push origin main 2>&1 | grep -E "(Success|error|rejected)" || echo "✅ Pushed successfully"
    
    echo "⏱️  Waiting for next change..."
done

