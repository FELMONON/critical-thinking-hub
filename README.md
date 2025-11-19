# Critical Thinking Hub

An interactive tool for mastering the **Paul-Elder Critical Thinking Framework**. This application helps users explore the elements of thought, intellectual standards, and traits to improve their reasoning and problem-solving skills.

![Critical Thinking Hub](https://img.shields.io/badge/Critical%20Thinking-Paul--Elder-emerald)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## Features

- **Elements of Thought**: Interactive guide to the 8 elements of reasoning.
- **Intellectual Standards**: Explanations and checking questions for universal standards.
- **Intellectual Traits**: Comparison of positive traits vs. their opposites.
- **Three Kinds of Questions**: Visual guide to distinguishing question types.
- **Reasoning Checklist**: Interactive checklist for verifying the quality of thought.
- **Problem Solving Template**: Step-by-step guide for tackling complex problems.
- **Socratic AI Tutor**: AI assistant powered by Gemini to guide your thinking (requires API key).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FELMONON/critical-thinking-hub.git
   cd critical-thinking-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Gemini API key:
     ```env
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory.

## License

This project is open source and available under the [MIT License](LICENSE).
