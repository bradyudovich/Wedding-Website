# Quick Deployment Guide

> **TL;DR**: Push to `main` branch → wait 2-3 minutes → site is live at https://bradyudovich.github.io/Wedding-Website/

## First Time Setup (One-Time)

1. Go to GitHub repository **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. Click **Save**

Done! ✅

## Deploy New Changes

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions automatically builds and deploys your site.

## Monitor Deployment

- Go to **Actions** tab in GitHub
- Watch for green checkmark ✓
- Deployment takes ~2-3 minutes

## View Your Site

```
https://bradyudovich.github.io/Wedding-Website/
```

## Manual Deployment Trigger

1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button
4. Select `main` branch
5. Click **Run workflow**

## Common Issues

### Blank Page?
- Wait 2-3 minutes after deployment
- Clear browser cache (Ctrl+Shift+R)
- Check GitHub Actions completed successfully

### Workflow Failed?
- Click on the failed workflow in Actions tab
- Read the error message
- Common fix: Regenerate package-lock.json
  ```bash
  rm package-lock.json
  npm install
  git add package-lock.json
  git commit -m "Fix package-lock"
  git push
  ```

### Routes Don't Work (404)?
- Ensure `public/404.html` exists
- Check `vite.config.js` has `base: '/Wedding-Website/'`
- Verify `App.jsx` has `basename="/Wedding-Website"`

## Need More Help?

See detailed guides:
- **README.md** - Standard deployment instructions
- **DEPLOYMENT.md** - Comprehensive guide with troubleshooting

## Pre-Deploy Checklist

- [ ] Run `npm run build` locally (no errors?)
- [ ] Run `npm run preview` and test (everything works?)
- [ ] Test all routes: /, /travel, /faq
- [ ] Language toggle working?
- [ ] RSVP link correct?
- [ ] Ready to deploy!

---

**Questions?** Check the detailed [DEPLOYMENT.md](./DEPLOYMENT.md) guide.
