# 🎯 The Machine Refactor

> An AI assistant inspired by *Person of Interest* - Built with Next.js 14 + Prisma + Tailwind CSS

**Version**: 0.1.0 (MVP)
**Status**: ✅ Operational

---

## 📺 Overview

The Machine Refactor is a fan-made AI assistant application inspired by the CBS television series *Person of Interest*. It features a sci-fi interface and powerful AI capabilities powered by Google's Gemini API.

### ✨ Features

- **🤖 AI Chat** - Interactive conversations with The Machine
- **🎨 Sci-Fi UI** - Interface inspired by the show
- **💾 Chat History** - Conversations are saved automatically
- **🗳️ Feature Voting** - Vote for upcoming features
- **📊 Roadmap** - Transparent development timeline

### 🚀 Upcoming Features

- 🔍 **Intelligence Mode** (v0.2.0) - Web search and knowledge graph
- 🎬 **Simulation Mode** (v0.3.0) - Image and video generation
- 📷 **Surveillance Mode** (v0.4.0) - Camera and microphone access

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini API

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/the-machine-refactor.git
cd the-machine-refactor
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Get your Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey) and add it to `.env.local`:
```bash
GEMINI_API_KEY=your-api-key-here
```

4. **Initialize the database**
```bash
npm run db:push
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage

### Modes

The Machine has 4 operational modes:

1. **MISSION_CONTROL** - Chat interface with AI (✅ Available)
2. **SURVEILLANCE** - Camera and microphone monitoring (🔄 In Development)
3. **INTELLIGENCE** - Web search and knowledge (🔄 In Development)
4. **SIMULATION** - Image and video generation (🔄 In Development)

### Voting

Features in development can be voted on. Visit their respective pages to cast your vote and prioritize development!

---

## 📁 Project Structure

```
the-machine-refactor/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── chat/         # Chat endpoints
│   │   └── votes/        # Voting endpoints
│   ├── mission-control/  # Chat interface
│   ├── surveillance/     # Monitoring (placeholder)
│   ├── simulation/       # Generation (placeholder)
│   └── intelligence/     # Search (placeholder)
├── components/           # React components
├── lib/                 # Utilities
│   ├── ai-providers/    # AI integrations
│   ├── db.ts           # Prisma client
│   ├── constants.ts    # Constants
│   └── types.ts        # TypeScript types
├── prisma/             # Database schema
└── public/             # Static assets
```

---

## 🎨 UI Design

The interface uses a color scheme inspired by *Person of Interest*:

- **Yellow** (#FFD700) - Relevant information
- **Red** (#FF4500) - Threats and warnings
- **Blue** (#00FFFF) - Interface elements
- **White** (#FFFFFF) - Text and admin
- **Black** (#000000) - Background

---

## 🗺️ Roadmap

### ✅ v0.1.0 (Current)
- AI chat functionality
- Sci-fi UI interface
- Chat history persistence
- Feature voting system

### 🔄 v0.2.0 (Planned)
- Web search integration
- Knowledge graph visualization
- Enhanced AI responses

### 📅 v0.3.0 (Planned)
- Image generation
- Video generation
- Multi-model support

### 🔮 v0.4.0 (Planned)
- Camera access
- Microphone recording
- Real-time stream processing

### 🎯 v1.0.0 (Future)
- User authentication
- Personal settings
- API key management
- Performance optimizations

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. ⭐ **Star the repository** - Show your support
2. 🐛 **Report bugs** - Open an issue
3. 💡 **Suggest features** - Vote or propose new ideas
4. 🔀 **Fork and PR** - Submit pull requests

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🌟 Acknowledgments

- **CBS** - *Person of Interest* television series
- **Google** - Gemini AI API
- **Vercel** - Next.js framework
- **EchoTrouvaille** - Original *The Machine* project inspiration

---

## 📧 Contact

- **Issues**: [GitHub Issues](https://github.com/your-username/the-machine-refactor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/the-machine-refactor/discussions)

---

**Made with ❤️ by fans of *Person of Interest***

*The Machine is watching... always.*
