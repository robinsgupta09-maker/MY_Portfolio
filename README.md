# Portfolio Website - Robins Gupta

A modern, premium portfolio website built with React, Three.js, and Tailwind CSS featuring stunning 3D backgrounds, smooth animations, and AI-powered chatbot integration.

## 🌟 Features

- **3D Neon Background** - Interactive Three.js background with floating particles
- **Smooth Animations** - Framer Motion powered transitions and effects
- **AI Chatbot** - Integrated AI assistant for portfolio interactions
- **Responsive Design** - Mobile-first design using Tailwind CSS
- **Dark Theme** - Modern dark mode with glassmorphism effects
- **Contact Form** - Web3Forms integration for direct email delivery
- **Analytics Dashboard** - Track visitor engagement and interactions
- **Admin Panel** - Manage training data and unanswered questions

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite (Build Tool)
- Three.js & React Three Fiber
- Framer Motion
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js & Express
- MongoDB
- OpenAI API
- RESTful API Architecture

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)

### Setup Instructions

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env` file in the root directory with the following variables:

```env
# Frontend (.env)
VITE_API_URL=http://localhost:5000/api

# Backend (.env in portfolio-backend)
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

4. **Run the application**

Frontend:
```bash
npm run dev
```

Backend (in portfolio-backend folder):
```bash
cd portfolio-backend
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Skills.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   ├── Chatbot.jsx
│   │   └── ...
│   ├── services/       # API services
│   ├── hooks/          # Custom React hooks
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── portfolio-backend/
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── server.js       # Express server
└── package.json
```

## 🎨 Customization

### Update Personal Information
- Edit content in respective component files (Hero.jsx, About.jsx, etc.)
- Update projects data in Projects.jsx
- Modify skills list in Skills.jsx

### Styling
- Tailwind configuration: `tailwind.config.js`
- Global styles: `src/index.css`
- Color scheme and theme can be customized in Tailwind config

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in platform settings

### Backend (Railway/Render/Heroku)
1. Deploy the `portfolio-backend` folder
2. Set environment variables
3. Update MongoDB connection string

## 📧 Contact Form Setup

1. Sign up at [Web3Forms](https://web3forms.com)
2. Get your access key
3. Add it to `.env`: `WEB3FORMS_ACCESS_KEY=your_key`

## 🤖 AI Chatbot Configuration

The chatbot uses OpenAI's API. Add your API key to enable:
```env
OPENAI_API_KEY=your_openai_api_key
```

## 📊 Analytics

Track visitor interactions, popular projects, and common questions through the admin dashboard. Access requires authentication.

## 🐛 Troubleshooting

**Common Issues:**

1. **Build fails with PostCSS error**
   - Ensure all dependencies are installed: `npm install`
   - Check `postcss.config.js` configuration

2. **Chatbot not working**
   - Verify OPENAI_API_KEY is set correctly
   - Check backend server is running

3. **Contact form not submitting**
   - Verify WEB3FORMS_ACCESS_KEY is correct
   - Check network requests in browser console

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Robins Gupta**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]
- Email: your.email@example.com

---

If you like this project, please give it a ⭐!
