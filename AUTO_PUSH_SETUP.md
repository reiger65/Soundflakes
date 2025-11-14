# Auto-Push Setup

## One-Time Setup (Required)

To enable automatic pushing, you need to authenticate once:

```bash
cd /Users/hanshoukes/Desktop/soundmarbles
git push origin main
```

When prompted:
- **Username:** `reiger65`
- **Password:** Paste your GitHub Personal Access Token (not your password)

After this one-time setup, credentials will be stored and I can push automatically!

## How It Works

1. **Git Hook:** After every `git commit`, it automatically tries to push
2. **Auto-Push Script:** Run `./auto_push.sh` anytime to push manually
3. **I can push:** Once credentials are stored, I can push for you automatically

## Test It

After setting up credentials, try:
```bash
git add .
git commit -m "Test"
# Should automatically push!
```

---

**Note:** If push fails, credentials may have expired. Just run `git push origin main` again to refresh them.

