# ⚡ Quick Setup Reference

## Copy-Paste Instructions

### For Windows PowerShell:

```powershell
# Go to Firebase Console
Start-Process "https://console.firebase.google.com/"

# After getting service account JSON, go to GitHub
Start-Process "https://github.com/robinsgupta09-maker/MY_Portfolio/settings/secrets/actions"
```

### For MacOS/Linux:

```bash
# Open in browser
open "https://console.firebase.google.com/"
open "https://github.com/robinsgupta09-maker/MY_Portfolio/settings/secrets/actions"
```

---

## 📋 Configuration Summary

```json
{
  "project": "portfolio-10ac6",
  "region": "us-central1",
  "github": {
    "repo": "robinsgupta09-maker/MY_Portfolio",
    "branch": "main",
    "secret": "FIREBASE_SERVICE_ACCOUNT"
  },
  "build": {
    "command": "npm run build",
    "output": "dist"
  }
}
```

---

## 🚀 Deployment Commands

```bash
# First time local test
npm install
npm run build
firebase deploy

# Regular flow (automatic via GitHub)
git add . && git commit -m "message" && git push origin main

# Force immediate deployment
firebase deploy --only hosting

# Check deployment status
firebase hosting:sites
```

---

## 📚 File Manifest

```
.github/
├── workflows/
│   ├── firebase-deploy.yml        # Auto deploy on push
│   └── build-test.yml              # Build verification
├── FIREBASE_SETUP_FINAL.md        # Full setup guide
├── GITHUB_AUTO_DEPLOY_SETUP.md    # Detailed guide  
├── firebase.json                   # Firebase config
├── .firebaserc                      # Firebase project ID
└── setup-firebase-github.js        # Setup helper
```

---

## ✅ Checklist

- [ ] Firebase service account downloaded
- [ ] GitHub secret `FIREBASE_SERVICE_ACCOUNT` added
- [ ] Test push to GitHub done
- [ ] Actions workflow completed successfully
- [ ] Live site verified at https://robinsgupta.xyz
- [ ] DNS records configured (optional)

---

## 🔗 Direct Links

```
Firebase Console:
https://console.firebase.google.com/project/portfolio-10ac6/hosting/sites

GitHub Secrets:
https://github.com/robinsgupta09-maker/MY_Portfolio/settings/secrets/actions

GitHub Actions:
https://github.com/robinsgupta09-maker/MY_Portfolio/actions

Live Site:
https://robinsgupta.xyz (after DNS setup)
```

---

**Ready to deploy? Add the Firebase secret and push your changes!** 🚀
