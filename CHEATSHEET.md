# Deployment Cheat Sheet

Quick reference for deploying the Wedding Website.

## 🚀 Deploy Now (3 Steps)

```bash
# 1. Make sure you're on main branch
git checkout main

# 2. Push your changes
git push origin main

# 3. Wait 2-3 minutes, then visit:
# https://bradyudovich.github.io/Wedding-Website/
```

## ⚙️ First Time? Enable GitHub Pages

1. GitHub repo → Settings → Pages
2. Source: Select **"GitHub Actions"**
3. Save ✅

## 📋 Quick Commands

| Task | Command |
|------|---------|
| Local dev | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |
| Check status | Visit Actions tab on GitHub |

## 🔍 Check Deployment Status

```bash
# Monitor in GitHub
1. Go to repository
2. Click "Actions" tab
3. Look for green checkmark ✓
```

## ❌ Something Wrong?

| Problem | Quick Fix |
|---------|-----------|
| Blank page | Wait 2-3 min, clear cache (Ctrl+Shift+R) |
| Build fails | Run `npm run build` locally, fix errors |
| 404 on routes | Check `public/404.html` exists |

## 📚 More Help?

- Simple guide: [QUICKSTART.md](./QUICKSTART.md)
- Detailed guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Dev setup: [README.md](./README.md)

## 🎯 Common Workflows

### Deploy a Feature
```bash
git checkout -b my-feature
# ... make changes ...
git add .
git commit -m "Add feature"
git push origin my-feature
# Create PR → Merge to main → Auto-deploy!
```

### Emergency Redeploy
```bash
# Go to Actions tab → Deploy to GitHub Pages → Run workflow
```

### Test Before Deploy
```bash
npm run build      # Build production
npm run preview    # Test at localhost:4173
# If good, push to main
```

## 🌐 Your URLs

- **Production**: https://bradyudovich.github.io/Wedding-Website/
- **Local Dev**: http://localhost:5173
- **Local Preview**: http://localhost:4173/Wedding-Website/

## ⏱️ Typical Times

- Local build: ~1-2 seconds
- GitHub Actions: ~2-3 minutes
- DNS propagation (custom domain): 24-48 hours

---

**Pro Tip**: Bookmark this file for quick reference! 🔖
