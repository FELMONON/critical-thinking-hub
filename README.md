# Critical Thinking Hub

<div align="center">

![Critical Thinking Hub](https://img.shields.io/badge/Critical%20Thinking-Paul--Elder-emerald)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

**An interactive, mobile-first educational tool for mastering the Paul-Elder Critical Thinking Framework**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Development](#development) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Mobile Responsiveness](#mobile-responsiveness)
- [Analytics](#analytics)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About

**Critical Thinking Hub** is a comprehensive web application designed to help students, professionals, and lifelong learners develop and enhance their critical thinking skills through the renowned **Paul-Elder Critical Thinking Framework**.

The Paul-Elder framework, developed by Dr. Richard Paul and Dr. Linda Elder at the Foundation for Critical Thinking, provides a systematic approach to analyzing reasoning and improving intellectual work. This application transforms the framework's theoretical concepts into interactive, practical tools that users can apply to real-world problems.

### Why Critical Thinking Hub?

- **Interactive Learning**: Move beyond passive reading with hands-on exploration of critical thinking concepts
- **Structured Guidance**: Follow a proven framework used by educators and professionals worldwide
- **AI-Powered Assistance**: Get personalized guidance through the Socratic AI Tutor feature
- **Mobile-First Design**: Access critical thinking tools anytime, anywhere on any device
- **Practical Application**: Apply concepts immediately with templates and checklists

---

## ✨ Features

### 🧩 Elements of Thought
Explore the **8 fundamental elements** present in all reasoning:
- **Purpose**: The goal or objective of thinking
- **Question**: The problem or issue being addressed
- **Information**: The data, facts, observations, and experiences used
- **Inference**: Conclusions drawn from information
- **Assumptions**: Beliefs taken for granted
- **Concepts**: Theories, principles, and ideas used to interpret
- **Implications**: Consequences that follow from reasoning
- **Point of View**: The perspective from which thinking occurs

Each element includes detailed descriptions and practical examples to help you identify and analyze them in your own thinking.

### 📏 Intellectual Standards
Master the **9 universal intellectual standards** used to assess the quality of reasoning:
- **Clarity**: Could you elaborate? Could you give an example?
- **Accuracy**: Is that really true? How can we verify?
- **Precision**: Could you be more specific?
- **Relevance**: How does that relate to the issue?
- **Depth**: What are the complexities?
- **Breadth**: Do we need to consider another perspective?
- **Logic**: Does this follow? Does it make sense?
- **Significance**: Is this the most important issue?
- **Fairness**: Am I biased? Am I using my critical thinking skills to serve my interests?

Each standard includes checking questions to apply during analysis.

### 🎭 Intellectual Traits
Compare and develop **8 intellectual virtues** vs. their opposite vices:
- **Humility** vs. Arrogance
- **Courage** vs. Cowardice
- **Empathy** vs. Self-centeredness
- **Integrity** vs. Hypocrisy
- **Perseverance** vs. Laziness
- **Confidence in Reason** vs. Distrust of Reason
- **Autonomy** vs. Conformity
- **Fair-mindedness** vs. Bias

Interactive cards flip to reveal contrasting traits and their implications.

### 🎓 Stages of Development
Track your progress through **6 stages** of critical thinking development:
- **Unreflective Thinker**: Unaware of thinking problems
- **Challenged Thinker**: Becoming aware of problems
- **Beginning Thinker**: Trying to improve but inconsistently
- **Practicing Thinker**: Recognizing the need for regular practice
- **Advanced Thinker**: Actively analyzing thinking in all domains
- **Master Thinker**: Skilled and insightful in all areas

Visual timeline with descriptions and characteristics of each stage.

### ❓ Three Kinds of Questions
Learn to distinguish between:
- **Questions of Fact**: One correct answer, settled by evidence
- **Questions of Preference**: Subjective matters of individual taste
- **Questions of Judgment**: Reasoned answers requiring critical thinking

Examples and guidance for handling each type appropriately.

### 🚧 Barriers to Critical Thinking
Identify and overcome **8 common obstacles**:
- **Egocentrism**: Self-centered thinking
- **Sociocentrism**: Group-centered thinking
- **Unwarranted Assumptions**: Beliefs taken for granted
- **Wishful Thinking**: Believing what we want to be true
- **Relativistic Thinking**: Rejecting the possibility of rational judgment
- **Short-term Thinking**: Failure to consider long-term consequences
- **Simplistic Thinking**: Oversimplification of complex issues
- **Resistance to Feedback**: Unwillingness to consider criticism

Each barrier includes descriptions and strategies for overcoming it.

### ✅ Reasoning Checklist
Interactive checklist with **26 essential questions** covering:
- All 8 Elements of Thought
- All 9 Intellectual Standards
- Practical verification of reasoning quality

Perfect for self-assessment and peer review of arguments and decisions.

### 🤖 Socratic AI Tutor
An intelligent assistant powered by **Google's Gemini AI** that:
- Asks probing Socratic questions to deepen your thinking
- Guides you through the critical thinking process
- Provides personalized feedback on your reasoning
- Helps identify blind spots and assumptions
- Maintains conversation history for continuous learning

**Note**: Requires a Gemini API key (free tier available).

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18**: Modern component-based UI library with hooks and concurrent features
- **Vite 5**: Next-generation frontend build tool for lightning-fast development

### Styling & UI
- **Tailwind CSS 3**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, consistent icon library with 1000+ icons
- **Custom Animations**: Smooth transitions and micro-interactions using Tailwind utilities

### AI Integration
- **Google Gemini API**: Advanced generative AI for the Socratic Tutor feature
- **Streaming Responses**: Real-time AI responses for natural conversation flow

### Analytics
- **Vercel Analytics**: Privacy-friendly web analytics for tracking visitor engagement and page views

### Build & Development
- **ESLint**: Code quality and consistency enforcement
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefix handling

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)
- **Git** for cloning the repository

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/FELMONON/critical-thinking-hub.git
   cd critical-thinking-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages including:
   - React and React DOM
   - Vite and plugins
   - Tailwind CSS and dependencies
   - Lucide React icons
   - Vercel Analytics

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

   Add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

   **Getting a Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy and paste into your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

---

## 🚀 Usage

### Navigation

The application features an intuitive sidebar navigation with organized sections:

**Framework Components:**
- Elements of Thought
- Intellectual Standards
- Intellectual Traits
- Stages of Development

**Application Tools:**
- Three Kinds of Questions
- Barriers to Critical Thinking
- Reasoning Checklist

**AI Assistant:**
- Socratic AI Tutor

### Using the Socratic AI Tutor

1. Navigate to the "Socratic AI Tutor" section
2. Ensure your Gemini API key is configured in `.env`
3. Type your question, problem, or argument in the chat input
4. The AI will respond with thought-provoking questions rather than direct answers
5. Engage in a dialogue to deepen your understanding
6. Conversation history is maintained during your session

**Example Interactions:**
- "I'm trying to decide whether to change careers"
- "Help me analyze this argument: All politicians are corrupt"
- "I need to think through a complex ethical dilemma"

### Mobile Usage

The application is fully optimized for mobile devices:
- **Responsive Design**: Adapts seamlessly to all screen sizes
- **Touch-Optimized**: Large touch targets (minimum 44x44px)
- **Mobile Menu**: Slide-out navigation with smooth animations
- **Optimized Typography**: Readable text sizes on small screens
- **Smooth Scrolling**: Custom scrollbar styling and overflow handling

---

## 📁 Project Structure

```
critical-thinking-hub/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── CriticalThinkingHub.jsx  # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles and Tailwind imports
├── .env                   # Environment variables (not committed)
├── .gitignore            # Git ignore rules
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite build configuration
├── postcss.config.js     # PostCSS configuration
├── eslint.config.js      # ESLint configuration
└── README.md             # This file
```

### Key Files

#### `src/CriticalThinkingHub.jsx`
The main application component containing:
- All view components (ElementsOfThoughtView, StandardsView, etc.)
- Navigation logic and mobile menu handling
- State management for active views
- Socratic AI Tutor integration
- Custom scrollbar styles

#### `src/main.jsx`
Application entry point that:
- Initializes React with StrictMode
- Renders the main CriticalThinkingHub component
- Integrates Vercel Analytics

#### `src/index.css`
Global styles including:
- Tailwind CSS imports and directives
- Custom color schemes
- Animation keyframes
- Global reset styles

---

## 📱 Mobile Responsiveness

The Critical Thinking Hub is built with a **mobile-first** approach, ensuring an excellent user experience across all devices.

### Responsive Breakpoints

Tailwind CSS breakpoints used throughout:
- `sm:` 640px and up (mobile landscape, small tablets)
- `md:` 768px and up (tablets)
- `lg:` 1024px and up (laptops, desktops)
- `xl:` 1280px and up (large desktops)

### Mobile Optimizations

#### Navigation
- **Slide-out menu** with smooth animations on mobile
- **Fixed positioning** with backdrop overlay
- **Custom scrollbars** for better aesthetics
- **Touch-friendly** close button

#### Typography
- **Progressive text sizing**: `text-xs sm:text-sm md:text-base`
- **Minimum 11px** font size for readability
- **Line clamping** for long descriptions on small screens

#### Spacing
- **Responsive padding**: `p-4 sm:p-6 md:p-8`
- **Adaptive grids**: `grid-cols-2 md:grid-cols-4`
- **Smart gutters**: `gap-3 sm:gap-4 md:gap-6`

#### Touch Targets
- **Minimum 44x44px** for all interactive elements
- **Active states**: `active:scale-95` for touch feedback
- **Larger buttons** on mobile: `p-3 sm:p-4`

#### Layout
- **Flexible containers**: `max-w-4xl mx-auto`
- **Proper overflow**: `overflow-y-auto overflow-x-hidden`
- **Footer positioning**: Flexbox-based sticky footer

#### Performance
- **Smooth scrolling**: `overscroll-contain` behavior
- **Optimized animations**: GPU-accelerated transforms
- **Reduced motion**: Respects user preferences

---

## 📊 Analytics

The application uses **Vercel Analytics** to track:
- Page views and unique visitors
- User engagement metrics
- Popular sections and features
- Session duration and bounce rates

### Privacy-First Analytics

Vercel Analytics is:
- **GDPR compliant**: No cookies, no personal data collection
- **Privacy-friendly**: Aggregated, anonymous data only
- **Lightweight**: <1KB script size, no performance impact
- **Automatic**: No configuration needed

Analytics data is visible in the Vercel dashboard after deployment.

---

## 💻 Development

### Available Scripts

#### `npm run dev`
Starts the development server with hot module replacement (HMR).
- URL: `http://localhost:5173`
- Auto-reloads on file changes
- Fast refresh for React components

#### `npm run build`
Creates an optimized production build.
- Minifies JavaScript and CSS
- Optimizes assets and images
- Outputs to `dist/` directory
- Includes source maps

#### `npm run preview`
Previews the production build locally.
- Serves the `dist/` directory
- Tests production behavior
- URL: `http://localhost:4173`

#### `npm run lint`
Runs ESLint to check code quality.
- Identifies potential bugs
- Enforces code style
- Checks React best practices

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit files in `src/`
   - Follow existing code style
   - Test on multiple screen sizes

3. **Test thoroughly**
   ```bash
   npm run dev  # Test in development
   npm run build && npm run preview  # Test production build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

5. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- **Components**: Use functional components with hooks
- **Naming**: PascalCase for components, camelCase for variables
- **Props**: Destructure props in function parameters
- **State**: Use `useState` for local state
- **Effects**: Use `useEffect` for side effects
- **Styling**: Tailwind utility classes, avoid inline styles
- **Icons**: Use Lucide React icons consistently

### Debugging Tips

**Hot reload not working?**
- Check for syntax errors in console
- Restart dev server: `Ctrl+C` then `npm run dev`

**Styles not applying?**
- Verify Tailwind class names are correct
- Check `tailwind.config.js` for custom configurations
- Clear browser cache

**API errors with Gemini?**
- Verify API key is correct in `.env`
- Check API key has necessary permissions
- Ensure `VITE_` prefix is included

---

## 🚀 Deployment

### Deploying to Vercel (Recommended)

Vercel provides seamless deployment for Vite applications:

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Git** (easiest method)
   - Push your code to GitHub
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Vite configuration
   - Add environment variables in Vercel dashboard
   - Click "Deploy"

3. **Deploy via CLI**
   ```bash
   vercel
   ```
   Follow the prompts to configure and deploy.

4. **Add Environment Variables**
   - Go to Vercel dashboard → Your Project → Settings → Environment Variables
   - Add `VITE_GEMINI_API_KEY` with your API key
   - Redeploy for changes to take effect

### Deploying to Other Platforms

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify or use Netlify CLI
```

#### GitHub Pages
```bash
npm install gh-pages --save-dev
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

#### Traditional Hosting
```bash
npm run build
# Upload contents of dist/ folder to your web server
```

### Environment Variables in Production

Ensure all environment variables are set:
- `VITE_GEMINI_API_KEY`: Your Gemini API key

**Note**: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

---

## 🔧 Troubleshooting

### Common Issues

#### Build Errors

**Issue**: `Module not found` errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue**: `Cannot find module 'vite'`
```bash
# Solution: Install dev dependencies
npm install vite @vitejs/plugin-react --save-dev
```

#### Runtime Errors

**Issue**: Blank page in production
- Check browser console for errors
- Verify all environment variables are set
- Ensure `base` path in `vite.config.js` is correct

**Issue**: AI Tutor not responding
- Verify API key is correct and active
- Check network tab for API errors
- Ensure API key has sufficient quota

#### Mobile Issues

**Issue**: Menu not closing on mobile
- Clear browser cache
- Check touch event handlers
- Verify JavaScript is enabled

**Issue**: Text too small on mobile
- Check viewport meta tag in `index.html`
- Verify responsive text classes are applied
- Test on actual device, not just browser devtools

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/FELMONON/critical-thinking-hub/issues)
- **Discussions**: [GitHub Discussions](https://github.com/FELMONON/critical-thinking-hub/discussions)
- **Documentation**: [Vite Docs](https://vitejs.dev), [React Docs](https://react.dev), [Tailwind Docs](https://tailwindcss.com)

---

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, your help makes this project better.

### How to Contribute

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/critical-thinking-hub.git
   cd critical-thinking-hub
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add amazing feature"
   ```

   **Commit Message Guidelines:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes
   - Submit for review

### Contribution Ideas

- **Features**: Add new critical thinking tools or frameworks
- **UI/UX**: Improve design, animations, or user flow
- **Accessibility**: Enhance screen reader support, keyboard navigation
- **Internationalization**: Add multi-language support
- **Documentation**: Improve README, add tutorials, create videos
- **Testing**: Add unit tests, integration tests, E2E tests
- **Performance**: Optimize bundle size, lazy loading, caching

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help create a welcoming community

---

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2025 FELMONON

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No liability
- ❌ No warranty

---

## 🙏 Acknowledgments

### Framework & Methodology
- **Dr. Richard Paul** and **Dr. Linda Elder** - Creators of the Paul-Elder Critical Thinking Framework
- **Foundation for Critical Thinking** - For extensive research and resources

### Technology & Tools
- **React Team** - For the amazing React library
- **Vite Team** - For the lightning-fast build tool
- **Tailwind Labs** - For Tailwind CSS
- **Lucide** - For beautiful open-source icons
- **Google** - For the Gemini AI API
- **Vercel** - For hosting and analytics platform

### Community
- All contributors who help improve this project
- Users who provide feedback and suggestions
- Open-source community for inspiration and support

---

## 📞 Contact

**Project Maintainer**: FELMONON

- **GitHub**: [@FELMONON](https://github.com/FELMONON)
- **Repository**: [critical-thinking-hub](https://github.com/FELMONON/critical-thinking-hub)
- **Issues**: [Report a bug or request a feature](https://github.com/FELMONON/critical-thinking-hub/issues)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star on GitHub! It helps others discover the project and motivates continued development.

[![Star History Chart](https://api.star-history.com/svg?repos=FELMONON/critical-thinking-hub&type=Date)](https://star-history.com/#FELMONON/critical-thinking-hub&Date)

---

<div align="center">

**Built with ❤️ for critical thinkers everywhere**

[⬆ Back to Top](#critical-thinking-hub)

</div>
