#!/bin/bash

cd /Users/hanshoukes/Desktop/soundmarbles

echo "🧹 Cleaning git history to remove token..."

# Remove token from all commits in history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch clean_push.sh push_without_token.sh fix_and_push.sh complete_push.sh push_to_github.sh" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
echo "📤 Force pushing cleaned history..."
git push origin main --force

echo "✅ Done! History cleaned."

