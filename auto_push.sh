#!/bin/bash

# Auto-push script - handles git push automatically
cd /Users/hanshoukes/Desktop/soundmarbles

echo "📤 Auto-pushing to GitHub..."

# Disable terminal prompts
export GIT_TERMINAL_PROMPT=0

# Try to push
git push origin main 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🚂 Railway will auto-deploy..."
else
    echo "⚠️  Push failed - may need credentials"
    echo ""
    echo "To fix: Run this once to store credentials:"
    echo "  git push origin main"
    echo "  (Enter username: reiger65)"
    echo "  (Enter password: Your GitHub Personal Access Token)"
    echo ""
    echo "After that, auto-push will work!"
fi

