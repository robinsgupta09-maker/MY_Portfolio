# 🛠️ Environment Variables Setup Guide

## 📋 Overview

Your portfolio uses environment variables to store sensitive configuration like API keys and admin credentials. These are automatically loaded from the `.env` file.

---

## 📁 File Locations

- **Development:** `.env` (created in project root)
- **Examples:** `.env.example` (reference template)
- **Backend:** `portfolio-backend/.env.example`

---

## 🔑 Available Variables

### Frontend (.env)

```env
# Admin Portal Credentials
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=Qwerty@123

# OpenAI API Key (for AI Chatbot)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_ADMIN_USERNAME` | Admin portal username | `admin` | ❌ No |
| `VITE_ADMIN_PASSWORD` | Admin portal password | `Qwerty@123` | ❌ No |
| `VITE_OPENAI_API_KEY` | OpenAI API key for chatbot | (empty) | ❌ No |

---

## 🚀 Quick Setup

### 1. First Time Setup
The `.env` file has been created with default values. No additional setup needed to start development!

### 2. Customize Admin Credentials
Edit `.env`:
```env
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password
```

Then restart dev server:
```bash
npm run dev
```

### 3. Enable AI Chatbot

#### Get OpenAI API Key:
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in with your account
3. Create a new API key
4. Copy the key

#### Add to `.env`:
```env
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Restart Server:
```bash
npm run dev
```

Now your chatbot will have real AI responses! 🤖

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Change default admin password before deployment
- ✅ Use strong, unique passwords (12+ characters with mixed case, numbers, symbols)
- ✅ Keep `.env` file in `.gitignore` (already configured)
- ✅ Never share your API keys
- ✅ Rotate API keys regularly in production
- ✅ Use environment-specific `.env` files for different deployments

### ❌ DON'T:
- ❌ Never commit `.env` to Git or GitHub
- ❌ Never hardcode sensitive values in source code
- ❌ Never share API keys in emails or messages
- ❌ Never use simple passwords like "password" or "123456"
- ❌ Never use the same password across multiple services
- ❌ Don't expose the `.env` file in production

---

## ⚠️ Common Issues

### Issue: Changes to `.env` not taking effect
**Solution:** Restart your dev server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Issue: "VITE is not defined" or API key errors
**Solution:** Make sure variable names start with `VITE_` (required by Vite)
```env
# ✅ Correct
VITE_OPENAI_API_KEY=sk-xxx

# ❌ Wrong
OPENAI_API_KEY=sk-xxx
```

### Issue: Chatbot still in demo mode despite API key
**Solution:** 
1. Check API key is valid and has sufficient credits
2. Verify key is in `.env` file
3. Restart dev server
4. Check browser console for errors

### Issue: Admin login not working with custom credentials
**Solution:**
1. Verify `.env` file has correct format
2. Restart dev server
3. Clear browser cache/localStorage
4. Try default credentials (`admin / Qwerty@123`)

---

## 🔄 Switching Between Environments

### Development
```env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=Qwerty@123
VITE_OPENAI_API_KEY=sk-dev-xxxxx
```

### Production (Before Deployment)
Update values in your hosting platform's environment settings:
- Vercel/Netlify: Settings → Environment Variables
- GitHub Pages: Use GitHub Secrets + Actions
- Self-hosted: Set environment variables on server

---

## 📝 Backend Environment Variables

For the optional backend (`portfolio-backend/.env`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WEB3FORMS_ACCESS_KEY=your_web3forms_key
```

---

## 🎯 Next Steps

1. ✅ Review the `.env` file created in your project root
2. ✅ Customize admin credentials if desired
3. ✅ (Optional) Add OpenAI API key to enable chatbot
4. ✅ Restart dev server: `npm run dev`
5. ✅ Test admin portal and chatbot

---

## 📚 Additional Resources

- [Vite Environment Variables Docs](https://vitejs.dev/guide/env-and-modes.html)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Environment Variables Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)

---

## ❓ Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for errors (F12)
3. Ensure all variable names start with `VITE_`
4. Verify `.env` file syntax (no extra spaces)
5. Restart dev server after any changes
