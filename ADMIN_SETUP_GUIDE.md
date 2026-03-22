# 🎯 Admin Dashboard Setup Guide

## ✅ What's Included

Your portfolio now has an **Admin Portal** with the following features:

- **Dashboard** - Overview of analytics and stats
- **Analytics** - Visitor tracking and popular projects
- **Messages** - View contact form submissions
- **Training** - Manage AI chatbot training data
- **Unanswered Questions** - Review chatbot questions it couldn't answer
- **Settings** - Configure admin preferences

---

## 🔗 How to Access Admin Portal

### Option 1: Click Footer Link (Easiest)

1. Open your portfolio: http://localhost:5173
2. Scroll to the bottom (Footer section)
3. Click **"Admin Portal"** link at the bottom
4. Admin dashboard will open in a new tab

### Option 2: Direct URL

Open in browser: `http://localhost:5173/admin-dashboard/`

---

## 🚀 Running Both Projects Together

Since the admin dashboard is a separate React app, you need to run it separately:

### Terminal 1 - Main Portfolio (Already Running)
```bash
cd c:\Users\robin\.copiolot\portfolio-github
npm run dev
```
Runs on: http://localhost:5173

### Terminal 2 - Admin Dashboard
```bash
cd c:\Users\robin\.copiolot\portfolio-github\admin-dashboard
npm install  # First time only
npm run dev
```
Runs on: http://localhost:5174

---

## ⚙️ Environment Variables

The admin dashboard needs API configuration. Create `.env` file:

**File:** `admin-dashboard/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** The backend server must be running for full functionality.

---

## 📁 File Structure

```
portfolio-github/
├── src/                    # Main portfolio components
├── admin-dashboard/        # Admin portal (separate React app)
│   ├── src/
│   │   ├── pages/         # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Training.jsx
│   │   │   └── Unanswered.jsx
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   └── utils/
│   │       └── api.js
│   └── public/
└── ...
```

---

## 🔐 Authentication

Currently, the admin portal uses simple authentication. For production use, consider adding:

- JWT-based authentication
- Protected routes
- Session management
- Role-based access control

---

## 🎨 Customization

### Change Admin Link Position

Edit: `src/components/Footer.jsx`
- Move the admin link anywhere in the footer
- Change styling classes
- Add icons

### Add Admin Route to Main App

If you want admin pages as part of main app (not separate):

1. Install react-router-dom:
```bash
npm install react-router-dom
```

2. Update `App.jsx` with routes
3. Move admin pages to `src/pages/`

---

## 📊 Features Overview

### Dashboard Page
- Quick stats overview
- Recent activity
- Quick actions

### Analytics Page
- Visitor count
- Popular projects
- User engagement metrics

### Messages Page
- View all contact form submissions
- Mark as read/unread
- Export messages

### Training Page
- Add training data for chatbot
- Edit existing responses
- Import/export training data

### Unanswered Questions
- Review questions chatbot couldn't answer
- Add answers to improve chatbot
- Track common gaps

### Settings Page
- General configuration
- Theme settings
- Notification preferences

---

## 🐛 Troubleshooting

### Admin Portal Not Loading

**Issue:** Blank page or 404 error

**Solution:**
1. Make sure admin-dashboard folder exists
2. Check Vite base path configuration
3. Run `npm install` in admin-dashboard folder
4. Restart dev server

### API Calls Failing

**Issue:** "Network Error" or CORS issues

**Solution:**
1. Ensure backend server is running (port 5000)
2. Check VITE_API_URL in .env
3. Verify CORS settings in backend

### Styles Not Loading

**Issue:** Admin page looks unstyled

**Solution:**
1. Run `npm install` in admin-dashboard
2. Check that Tailwind CSS is configured
3. Clear browser cache

---

## 🔗 Integration with Backend

For full admin functionality, you need the backend server:

**Backend Location:** `c:\Users\robin\.copiolot\portfolio-github\portfolio-backend`

**Start Backend:**
```bash
cd c:\Users\robin\.copiolot\portfolio-github\portfolio-backend
npm install
npm run dev
```

Backend provides APIs for:
- Analytics data
- Message storage
- Training data management
- Chatbot improvements

---

## 📱 Mobile Access

The admin dashboard is responsive but optimized for desktop. For mobile admin:

- Consider simplifying the UI
- Add mobile-specific navigation
- Test on various screen sizes

---

## 🚀 Production Deployment

When deploying to production:

1. **Build admin dashboard:**
```bash
cd admin-dashboard
npm run build
```

2. **Copy dist to main project:**
   - Copy `admin-dashboard/dist` contents
   - Place in `public/admin-dashboard/`

3. **Deploy together** - Both will be hosted together

---

## 💡 Pro Tips

1. **Separate Projects:** Keep admin as separate app for better separation of concerns
2. **Authentication:** Add proper auth before deploying
3. **API Integration:** Connect to backend for real data
4. **Monitoring:** Add error tracking and logging
5. **Backups:** Regularly backup training data and messages

---

## 📞 Quick Reference

### URLs
- **Main Portfolio:** http://localhost:5173
- **Admin Portal:** http://localhost:5173/admin-dashboard/
- **Standalone Admin:** http://localhost:5174 (if running separately)

### Commands
```bash
# Install admin dependencies (first time)
cd admin-dashboard
npm install

# Run admin dev server
npm run dev

# Build for production
npm run build
```

---

## ✅ Next Steps

1. ✅ Admin link added to footer
2. ✅ Admin dashboard files copied
3. ⏳ Run admin dev server (optional)
4. ⏳ Configure backend API (for full features)
5. ⏳ Test all admin features

---

**Need help?** Check the main README.md or CUSTOM_DOMAIN_SETUP.md for more details!
