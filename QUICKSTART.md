# Quick Start Guide 🚀

Get your portfolio up and running in minutes!

## 📦 Step 1: Clone & Install

```bash
# Clone this repository
git clone <YOUR_GITHUB_REPO_URL>
cd portfolio

# Install dependencies
npm install

# Install backend dependencies
cd portfolio-backend
npm install
cd ..
```

## ⚙️ Step 2: Environment Setup

### Frontend (.env)
Create a `.env` file in the root:
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (portfolio-backend/.env)
Create a `.env` file in the backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
OPENAI_API_KEY=your_openai_api_key
WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

**Optional:** Copy from example files:
```bash
cp .env.example .env
cp portfolio-backend/.env.example portfolio-backend/.env
```

## 🗄️ Step 3: Database Setup

### Option A: Local MongoDB
```bash
# Make sure MongoDB is installed and running locally
# Default connection: mongodb://localhost:27017/portfolio
```

### Option B: MongoDB Atlas (Cloud)
1. Visit https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 🔑 Step 4: API Keys (Optional)

### OpenAI API Key (for chatbot)
1. Visit https://platform.openai.com/api-keys
2. Create new API key
3. Add to backend `.env`

### Web3Forms Access Key (for contact form)
1. Visit https://web3forms.com
2. Get free access key
3. Add to backend `.env`

## 🏃 Step 5: Run the Application

Open **two terminals**:

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend runs on http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd portfolio-backend
npm run dev
```
Backend runs on http://localhost:5000

## ✅ Verify Installation

- [ ] Frontend opens without errors at http://localhost:5173
- [ ] Backend API responds at http://localhost:5000/api
- [ ] No console errors in browser
- [ ] Contact form works
- [ ] Chatbot responds (if API key added)

## 🎨 Customize Your Portfolio

Update these files with your information:

- `src/components/Hero.jsx` - Introduction text
- `src/components/About.jsx` - About section
- `src/components/Projects.jsx` - Your projects
- `src/components/Experience.jsx` - Work experience
- `src/components/Skills.jsx` - Skills list
- `src/components/Education.jsx` - Education details
- `src/components/Contact.jsx` - Contact information

## 📱 Test Before Deploying

1. Test on different browsers (Chrome, Firefox, Safari)
2. Test responsive design (mobile, tablet, desktop)
3. Test all interactive elements
4. Verify contact form submission
5. Check chatbot responses

## 🚀 Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy options:

**Frontend (Vercel):**
```bash
npm install -g vercel
vercel
```

**Backend (Railway):**
- Push to GitHub
- Connect Railway to GitHub repo
- Deploy automatically

## 🐛 Common Issues

**Issue: Port already in use**
```bash
# Kill process on port 5173 or 5000
# Windows PowerShell:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Issue: Module not found**
```bash
npm install
```

**Issue: Build errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue: API connection failed**
- Check if backend is running
- Verify VITE_API_URL in frontend .env
- Check CORS configuration

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Three.js Examples](https://threejs.org/examples/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 💡 Tips

1. **Keep .env files private** - Never commit them to GitHub
2. **Use meaningful project names** - Update in all components
3. **Optimize images** - Compress before adding
4. **Test frequently** - After each major change
5. **Version control** - Commit regularly with clear messages

---

**Need help?** Check the full documentation:
- [README.md](./README.md) - Complete project overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment guide

**Happy coding!** 🎉
