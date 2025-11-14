# Auto-Deploy Setup: Cursor → GitHub

This guide sets up automatic deployment from Cursor to GitHub.

## Option 1: Git Hook (Recommended - Automatic)

A git hook will automatically push to GitHub after every commit.

### Setup:

```bash
cd /Users/hanshoukes/Desktop/soundmarbles
chmod +x .git/hooks/post-commit
```

### How it works:
- Every time you commit (`git commit`), it automatically pushes to GitHub
- No extra steps needed!

## Option 2: File Watcher (Auto-commit + Push)

Watches for file changes and automatically commits + pushes.

### Setup:

```bash
cd /Users/hanshoukes/Desktop/soundmarbles

# Install fswatch (if not installed)
brew install fswatch

# Make script executable
chmod +x auto_deploy.sh

# Start watching (runs in background)
./auto_deploy.sh &
```

### How it works:
- Watches for any file changes
- Automatically commits when you save files
- Automatically pushes to GitHub
- Runs in background

### To stop:
```bash
pkill -f auto_deploy.sh
```

## Option 3: Cursor/VS Code Settings

I've created `.vscode/settings.json` which configures:
- Auto-save after 1 second
- Auto-push after commit
- Smart commit enabled

### How it works:
- Save files → Auto-commits
- Commit → Auto-pushes to GitHub

## Option 4: Manual but Easy

Just use these commands when you want to deploy:

```bash
cd /Users/hanshoukes/Desktop/soundmarbles
git add .
git commit -m "Update"
git push
```

## Recommended Setup

**For automatic deployment:**
1. Use Option 1 (Git Hook) - simplest, works automatically
2. Or use Option 3 (Cursor settings) - integrates with editor

**For Railway auto-deploy:**
- Once files are on GitHub, Railway will auto-deploy on every push!

## Test It

1. Make a small change to any file
2. Save it
3. Commit: `git commit -am "Test"`
4. Check GitHub - should see the change!

---

**Note:** Make sure your GitHub credentials are saved:
```bash
git config --global credential.helper osxkeychain
```

This saves your token so you don't have to enter it every time.

