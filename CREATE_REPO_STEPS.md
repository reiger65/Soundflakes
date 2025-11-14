# Create GitHub Repository - Step by Step

## Step 1: Create the Repository on GitHub

1. **Open your browser** and go to: **https://github.com/new**

2. **Fill in the form:**
   - **Repository name:** `soundflakes`
   - **Description:** `Master-slave audio system for meditative soundscapes`
   - **Visibility:** Choose Public or Private (your choice)
   - **⚠️ IMPORTANT:** Do NOT check "Add a README file"
   - **⚠️ IMPORTANT:** Do NOT check "Add .gitignore"
   - **⚠️ IMPORTANT:** Do NOT check "Choose a license"

3. **Click the green "Create repository" button**

## Step 2: Copy Your Repository URL

After creating the repository, GitHub will show you a page with setup instructions.

**Copy the repository URL** - it will look like:
```
https://github.com/YOUR_USERNAME/soundmarbles.git
```

## Step 3: Run These Commands

Open Terminal and run these commands (replace `YOUR_USERNAME` with your actual GitHub username):

```bash
# Navigate to your project
cd /Users/hanshoukes/Desktop/soundmarbles

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Soundflakes app ready for Railway deployment"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/soundflakes.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Verify

After pushing, refresh your GitHub repository page. You should see all your files!

## Step 5: Deploy to Railway

Once your code is on GitHub:

1. Go to: **https://railway.app**
2. Sign up/login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your **`soundflakes`** repository
6. Railway will auto-deploy!

## Need Help?

If you get errors:
- **"Repository not found"** → Make sure you created the repository first
- **"Permission denied"** → You may need to authenticate with GitHub
- **"Remote already exists"** → Run: `git remote remove origin` then try again

---

**That's it!** Once you create the repository and push, Railway can deploy it automatically.

