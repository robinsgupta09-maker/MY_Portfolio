# Deployment Guide

This guide will help you deploy your portfolio to production.

## 📋 Pre-Deployment Checklist

- [ ] Update all personal information in the components
- [ ] Replace placeholder content with your actual projects
- [ ] Update social media links
- [ ] Test contact form functionality
- [ ] Optimize images and assets
- [ ] Remove console.log statements
- [ ] Test on multiple devices and browsers
- [ ] Set up environment variables

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

Vercel offers seamless deployment for React applications with automatic builds.

**Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd portfolio
vercel
```

4. **Set Environment Variables**
   - Go to your project dashboard on Vercel
   - Navigate to Settings → Environment Variables
   - Add `VITE_API_URL` pointing to your backend URL

5. **Production Deployment**
```bash
vercel --prod
```

### Option 2: Netlify

1. **Build the project**
```bash
npm run build
```

2. **Drag and drop** the `dist` folder to Netlify Drop, or use Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy
```

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
Add these scripts:
```json
"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Deploy**
```bash
npm run deploy
```

## 🚀 Backend Deployment

### Option 1: Railway

Railway provides easy MongoDB and Node.js hosting.

**Steps:**

1. Create account at https://railway.app
2. Connect your GitHub repository
3. Deploy the `portfolio-backend` folder
4. Add environment variables in Railway dashboard
5. Deploy MongoDB plugin or use MongoDB Atlas

### Option 2: Render

1. **Create new Web Service** on https://render.com
2. **Connect repository**
3. **Configure:**
   - Root Directory: `portfolio-backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`

4. **Add environment variables**

### Option 3: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and create app**
```bash
heroku login
cd portfolio-backend
heroku create your-app-name
```

3. **Deploy**
```bash
git push heroku main
```

4. **Set environment variables**
```bash
heroku config:set OPENAI_API_KEY=your_key
heroku config:set MONGODB_URI=your_uri
heroku config:set WEB3FORMS_ACCESS_KEY=your_key
```

## 💾 MongoDB Setup

### MongoDB Atlas (Cloud Database)

1. **Create account** at https://www.mongodb.com/cloud/atlas
2. **Create cluster** (free tier available)
3. **Configure access:**
   - Create database user
   - Whitelist IP addresses (0.0.0.0/0 for all)
4. **Get connection string**
5. **Update in `.env`**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## 🔧 Post-Deployment Configuration

### Update API URL

After deploying the backend, update the frontend API URL:

1. In frontend `.env`:
```
VITE_API_URL=https://your-backend-url.com/api
```

2. Rebuild and redeploy frontend

### Contact Form

Make sure Web3Forms is configured:
1. Get access key from https://web3forms.com
2. Add to backend `.env`
3. Test form submission

### AI Chatbot

Configure OpenAI API:
1. Get API key from https://platform.openai.com
2. Add to backend `.env`
3. Test chatbot functionality

## 📊 Monitoring & Analytics

### Enable Admin Analytics

1. Deploy backend with analytics routes
2. Access admin dashboard at `/admin`
3. Monitor visitor interactions and popular projects

### Google Analytics (Optional)

Add Google Analytics tracking to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
```

## 🔒 Security Best Practices

- Keep API keys secret (never commit `.env` files)
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Enable CORS only for allowed domains
- Regular dependency updates

## 🐛 Troubleshooting

### Frontend Issues

**Build fails:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API calls failing:**
- Check CORS configuration in backend
- Verify API URL is correct
- Check browser console for errors

### Backend Issues

**MongoDB connection errors:**
- Verify connection string
- Check network access in MongoDB Atlas
- Ensure IP whitelist includes your server

**OpenAI API errors:**
- Check API key validity
- Verify billing is set up
- Check API usage limits

## 📈 Performance Optimization

1. **Enable compression** in backend (already configured)
2. **Use CDN** for static assets
3. **Implement caching** strategies
4. **Optimize images** before upload
5. **Minimize bundle size** with tree shaking

## 🎯 Custom Domain Setup

### Vercel
1. Go to project settings
2. Navigate to Domains
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS

## ✅ Testing After Deployment

- [ ] Homepage loads correctly
- [ ] All navigation works
- [ ] Projects display properly
- [ ] Contact form submits successfully
- [ ] Chatbot responds
- [ ] Mobile responsive design works
- [ ] Social links work
- [ ] Analytics tracking active
- [ ] No console errors

## 📞 Support

If you encounter issues:
1. Check application logs
2. Review error messages in browser console
3. Verify environment variables
4. Check MongoDB connection status
5. Review API endpoint responses

---

**Congratulations!** Your portfolio is now live and ready to impress recruiters! 🎉
