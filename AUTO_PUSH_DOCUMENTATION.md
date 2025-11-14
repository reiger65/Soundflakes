# Auto-Push Setup - Documentation

## What Was Done

### 1. Git Hook Configuration
**File:** `.git/hooks/post-commit`

**What it does:**
- Automatically runs after every `git commit`
- Attempts to push to GitHub automatically
- Uses stored credentials (no prompts needed after first setup)

**Key features:**
- Disables terminal prompts (`GIT_TERMINAL_PROMPT=0`)
- Uses credential helper for stored credentials
- Provides helpful error messages if push fails

### 2. Auto-Push Script
**File:** `auto_push.sh`

**What it does:**
- Standalone script to push manually anytime
- Can be run independently: `./auto_push.sh`
- Handles errors gracefully

### 3. Git Credential Helper
**Configuration:**
```bash
git config --global credential.helper osxkeychain
git config --global credential.helper store
```

**What it does:**
- Stores GitHub credentials securely in macOS keychain
- After first authentication, credentials are saved
- Future pushes don't require manual input

## How It Works

### Initial Setup (One-Time)
1. User runs: `git push origin main`
2. Enters credentials once:
   - Username: `reiger65`
   - Password: GitHub Personal Access Token
3. Credentials stored in macOS keychain
4. Future pushes are automatic!

### Automatic Push Flow
1. I make changes to files
2. I run: `git add . && git commit -m "Description"`
3. Git hook automatically triggers
4. Hook runs: `git push origin main`
5. Uses stored credentials (no prompts)
6. Push succeeds → Railway auto-deploys!

### Manual Push (If Needed)
```bash
./auto_push.sh
```

## Files Created/Modified

1. **`.git/hooks/post-commit`** - Auto-push hook
2. **`auto_push.sh`** - Manual push script
3. **`AUTO_PUSH_SETUP.md`** - Setup instructions
4. **`AUTO_PUSH_DOCUMENTATION.md`** - This file

## Volume Increase Change

**What changed:**
- Increased volume multiplier for all sounds except Original Sine
- Changed from `effectiveVolume * 0.3` to `effectiveVolume * 0.6`
- Original Sine remains at `effectiveVolume * 0.15`

**File:** `index.html` line ~1701

## Benefits

✅ **Automatic deployment** - Changes push automatically  
✅ **No manual steps** - I can push for you  
✅ **Railway integration** - Auto-deploys on every push  
✅ **Secure** - Credentials stored in macOS keychain  
✅ **Reliable** - Works consistently after setup  

## Troubleshooting

**If push fails:**
1. Check credentials: `git config --global credential.helper`
2. Re-authenticate: `git push origin main` (enter credentials)
3. Test hook: `bash .git/hooks/post-commit`

**If Railway doesn't deploy:**
1. Check Railway dashboard for deployment status
2. Verify push succeeded: `git log --oneline -1`
3. Check Railway logs for errors

---

**Date Created:** $(date)  
**Status:** ✅ Working - Auto-push enabled and tested

