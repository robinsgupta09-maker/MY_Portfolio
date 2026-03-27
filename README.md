# 🚀 Robin Gupta - Premium 3D Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Robin%20Gupta-Premium%203D%20Portfolio-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-4.x-pink?style=for-the-badge&logo=framer)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-cyan?style=for-the-badge&logo=tailwindcss)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-green?style=for-the-badge&logo=github)

**A highly advanced, modern, and visually stunning 3D portfolio website**

[Live Demo](https://robinsgupta09-maker.github.io/My_portfolio) • [Admin Portal](https://robinsgupta09-maker.github.io/My_portfolio/admin) • [Report Issue](https://github.com/robinsgupta09-maker/MY_Portfolio/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Live Demo](#-live-demo)
- [Installation](#-installation--setup)
- [Folder Structure](#-folder-structure)
- [Admin Portal](#-admin-portal)
- [Future Improvements](#-future-improvements)
- [Author](#-author)
- [License](#-license)

---

## 👨‍💻 About

This is a **premium 3D interactive portfolio website** built with React, Framer Motion, and Tailwind CSS. It showcases my skills, projects, and experience in a visually engaging way that stands out from traditional portfolios.

**Problem Solved:** Traditional portfolios are static and boring. This portfolio provides an **immersive 3D experience** with mouse-follow effects, floating shapes, typing animations, and interactive elements that captivate visitors.

---

## ✨ Key Features

### 🎨 **Visual Excellence**
- ✨ **3D Hero Section** - Floating shapes with parallax motion
- 🎮 **Interactive Project Cards** - 3D tilt effects with mouse-follow spotlight
- 💫 **Global Mouse Spotlight** - Purple gradient follows cursor everywhere
- 🌌 **Galaxy Background** - 50+ animated particles creating space-like atmosphere

### 🎯 **Interactive Elements**
- ⌨️ **Typing Animation** - Cycles through "Frontend Developer", "AI Enthusiast", etc.
- 🖼️ **Fullscreen Project Modal** - Click any project to view details with image gallery
- 📊 **Animated Skills** - Progress bars fill on scroll with shimmer effects
- 🎓 **3D Education Timeline** - Glowing dots with hover lift effects
- 📩 **Modern Contact Form** - Floating labels with success animations

### 💖 **Special Features**
- 🔐 **Secret MUSKAN Feature** - Type "MUSKAN" for romantic surprise with confetti!
- 📈 **Scroll Progress Bar** - Gradient bar at top shows reading progress
- 🎭 **Dark/Light Mode** - Toggle between themes seamlessly
- 🤖 **AI Chatbot** - Integrated chatbot for visitor assistance
- 📱 **Fully Responsive** - Perfect on all screen sizes

### 🛡️ **Security & Performance**
- 🔒 **Environment Variables** - Secure credential management
- ⚡ **60 FPS Animations** - Optimized with Framer Motion
- 🎯 **Accessibility** - Keyboard navigation, ARIA labels
- 💾 **Local Storage** - Session persistence

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI framework
- **Framer Motion** - Advanced animations
- **Tailwind CSS** - Styling utility
- **Lucide Icons** - Icon library
- **Vite** - Build tool & dev server

### **Backend (Optional)**
- **Node.js** - Runtime environment
- **Express** - API server
- **MongoDB** - Database
- **OpenAI API** - Chatbot integration

### **Deployment**
- **GitHub Pages** - Static hosting
- **GitHub Actions** - CI/CD automation

### **Development Tools**
- Git & GitHub
- npm/yarn
- VS Code
- ESLint & Prettier

---

## 📸 Screenshots

<div align="center">

### Hero Section
![Home Page](./screenshots/home.png)
*3D hero section with floating shapes and typing animation*

### Admin Dashboard
![Dashboard](./screenshots/dashboard.png)
*Premium admin panel with CRUD operations*

### Mobile View
![Mobile Responsive](./screenshots/mobile.png)
*Fully responsive design for mobile devices*

</div>

---

## 🌐 Live Demo

### **Production URLs:**

🎨 **Main Portfolio:**  
👉 https://robinsgupta09-maker.github.io/My_portfolio

🔐 **Admin Portal:**  
👉 https://robinsgupta09-maker.github.io/My_portfolio/admin

**Admin Credentials:**
- Username: `admin`
- Password: `Qwerty@123`

⚠️ **Note:** Change default credentials before production use!

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Git

### **Step-by-Step Installation**

#### **1. Clone the Repository**
```bash
git clone https://github.com/robinsgupta09-maker/MY_Portfolio.git
cd MY_Portfolio
```

#### **2. Install Dependencies**
```bash
npm install
```

#### **3. Configure Environment Variables**

A `.env` file has been created with default values. For detailed setup instructions, see [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md).

Optional customization:
```env
# Admin Credentials (default: admin / Qwerty@123)
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=Qwerty@123

# OpenAI API Key (Optional - enables AI chatbot)
VITE_OPENAI_API_KEY=your_openai_api_key
```

> 📖 For complete setup instructions, security best practices, and troubleshooting, read [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md)

#### **4. Run Development Server**
```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

#### **5. Build for Production**
```bash
npm run build
npm run preview
```

---

## 📁 Folder Structure

```
portfolio-github/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── hero/
│   │   │   ├── Hero3D.jsx              # 3D hero component
│   │   │   └── TypingAnimation.jsx     # Typing text effect
│   │   ├── projects/
│   │   │   ├── PortfolioProjectCard.jsx # Enhanced project cards
│   │   │   └── ProjectModal.jsx        # Fullscreen modal
│   │   ├── effects/
│   │   │   ├── MouseSpotlight.jsx      # Global spotlight
│   │   │   └── ScrollProgress.jsx      # Scroll progress bar
│   │   ├── skills/
│   │   │   └── SkillBar.jsx            # Animated progress bars
│   │   ├── education/
│   │   │   └── TimelineItem.jsx        # 3D timeline
│   │   ├── contact/
│   │   │   └── ContactForm.jsx         # Modern contact form
│   │   ├── SecretFeature.jsx           # Secret MUSKAN feature
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/
│   │   └── admin/
│   │       ├── AdminPage.jsx
│   │       ├── AdminLogin.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Projects.jsx
│   │       └── ...
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx                         # Main app component
│   ├── index.css                       # Global styles
│   └── main.jsx                        # Entry point
├── .env                                # Environment variables (not in git)
├── .env.example                        # Environment template
├── .gitignore                          # Git ignore rules
├── package.json                        # Dependencies
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind config
├── screenshots/                        # Screenshots folder
└── README.md                           # This file
```

---

## 🔮 Future Improvements

### **Planned Enhancements**

- [ ] **Backend Integration** - Connect forms to actual API endpoints
- [ ] **Blog Section** - Add articles and tutorials
- [ ] **Testimonials** - Client reviews and feedback
- [ ] **Analytics Dashboard** - Track visitor behavior
- [ ] **SEO Optimization** - Meta tags, Open Graph, schema markup
- [ ] **PWA Support** - Install as progressive web app
- [ ] **Multi-language** - i18n support for global audience
- [ ] **More Projects** - Expand portfolio with case studies
- [ ] **Video Backgrounds** - Add video content
- [ ] **Advanced Animations** - Three.js for complex 3D objects

### **Performance Goals**
- Achieve 95+ Lighthouse score
- Implement lazy loading for images
- Add code splitting for faster initial load
- Optimize bundle size

---

## 👨‍💻 Author

### **Robin Gupta**

- **Role:** Front-End Developer | AI Enthusiast
- **Location:** Chandigarh, India
- **Email:** robinsgupta09@gmail.com

#### **Connect With Me:**
- 🌐 **Portfolio:** [Live Portfolio](https://robinsgupta09-maker.github.io/My_portfolio)
- 💼 **LinkedIn:** [LinkedIn Profile](https://linkedin.com/in/robinsgupta)
- 🐙 **GitHub:** [GitHub Profile](https://github.com/robinsgupta09-maker)
- 📧 **Email:** [Send Email](mailto:robinsgupta09@gmail.com)

#### **Skills:**
- Frontend: React, JavaScript, TypeScript, Tailwind CSS
- Backend: Node.js, Python, MongoDB, SQL
- Tools: Git, GitHub, VS Code, Figma
- Soft Skills: Problem Solving, Team Collaboration, Communication

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Feel free to fork, modify, and use for your own learning purposes.

---

## 🙏 Acknowledgments

- **Framer Motion** team for amazing animation library
- **Tailwind CSS** community
- **React** developers
- **OpenAI** for chatbot integration
- All contributors and supporters

---

## 📞 Support

If you have any questions or need help:

1. Check existing [Issues](https://github.com/robinsgupta09-maker/MY_Portfolio/issues)
2. Create a new issue
3. Contact via email: robinsgupta09@gmail.com

---

<div align="center">

### ⭐ If you like this project, please give it a star!

**Made with ❤️ and lots of ☕ by Robin Gupta**

![Stars](https://img.shields.io/github/stars/robinsgupta09-maker/MY_Portfolio?style=social)
![Forks](https://img.shields.io/github/forks/robinsgupta09-maker/MY_Portfolio?style=social)
![Watchers](https://img.shields.io/github/watchers/robinsgupta09-maker/MY_Portfolio?style=social)

</div>
