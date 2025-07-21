# AI Frontend Kit

![AI Frontend Kit](https://img.shields.io/badge/AI%20Frontend%20Kit-v0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38b2ac)

A modern, responsive AI chat interface built with Next.js, TypeScript, and Tailwind CSS. This project provides a flexible foundation for building AI-powered applications with support for Google Gemini AI and other AI models.

## Features

- 🤖 **AI Integration**: Built-in support for Google Gemini AI with an extensible architecture for other AI providers
- 🎨 **Dark/Light Mode**: Fully implemented theme switching with system preference detection
- 📱 **Responsive Design**: Mobile-first approach ensuring great UX across all device sizes
- 🔄 **Real-time Thinking**: Display AI thinking process in real-time before the final answer
- 📝 **Markdown Support**: Rich text rendering with code highlighting using React Markdown
- 🧩 **Component Library**: Reusable UI components built with Radix UI primitives
- 🔒 **Type Safety**: Full TypeScript support throughout the codebase
- 🧹 **Code Quality**: Enforced with ESLint, Prettier, and Husky pre-commit hooks

## Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) for accessible primitives
  - [Lucide React](https://lucide.dev/) for icons
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) for class merging
  - [class-variance-authority](https://cva.style/docs) for component variants
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

### AI Integration

- **Google Gemini**: [@google/genai](https://www.npmjs.com/package/@google/genai) SDK

### Content Rendering

- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown) with [remark-gfm](https://github.com/remarkjs/remark-gfm)
- **Syntax Highlighting**: [Shiki](https://shiki.style/) for beautiful code blocks

### Development Tools

- **Linting**: [ESLint](https://eslint.org/) with Next.js config
- **Formatting**: [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) with [lint-staged](https://github.com/lint-staged/lint-staged)
- **Commit Standards**: [Commitlint](https://commitlint.js.org/) with conventional config
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Environment Setup

Create a `.env.local` file in the root directory with your API keys:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-frontend-kit.git
cd ai-frontend-kit

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development

```bash
# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   │   ├── chat/      # Chat-specific components
│   │   ├── theme/     # Theme-related components
│   │   └── ui/        # Reusable UI components
│   ├── config/        # Configuration files
│   ├── lib/           # Utility functions and types
│   └── styles/        # Global styles
├── .eslintrc.json     # ESLint configuration
├── .prettierrc        # Prettier configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com), but can be deployed on any platform that supports Next.js applications.

```bash
# Deploy to Vercel
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
