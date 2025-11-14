#!/bin/bash

# Comprehensive backup script for Soundflakes

cd /Users/hanshoukes/Desktop/soundmarbles

BACKUP_DIR="backup/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Creating backup in $BACKUP_DIR..."

# Copy all important files
cp index.html "$BACKUP_DIR/" 2>/dev/null
cp server.js "$BACKUP_DIR/" 2>/dev/null
cp package.json "$BACKUP_DIR/" 2>/dev/null
cp railway.json "$BACKUP_DIR/" 2>/dev/null
cp .gitignore "$BACKUP_DIR/" 2>/dev/null
cp *.md "$BACKUP_DIR/" 2>/dev/null 2>&1
cp *.sh "$BACKUP_DIR/" 2>/dev/null 2>&1

# Copy VS Code settings if exists
if [ -d .vscode ]; then
    cp -r .vscode "$BACKUP_DIR/" 2>/dev/null
fi

# Create git backup
echo "💾 Creating git backup..."
git add -A
git commit -m "Backup: $(date +%Y-%m-%d\ %H:%M:%S)" --allow-empty 2>/dev/null
git tag -a "backup-$(date +%Y%m%d-%H%M%S)" -m "Backup: Working QR code fix deployed to Railway" 2>/dev/null

echo "✅ Backup complete!"
echo "   Files: $BACKUP_DIR"
echo "   Git tag: backup-$(date +%Y%m%d-%H%M%S)"

