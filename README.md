# 🤖 Servimatt ChatAPP

Servimatt ChatAPP is an interactive AI chat application built using **React**, **Vite**, **Tailwind CSS**, and **OpenAI GPT-4o-mini**.  
It provides a smooth, ChatGPT-like experience with real-time streaming responses, typewriter animation, dynamic input resizing, and a clean modern UI.

---

## 🚀 Features

### 🧠 AI Features
- Powered by **OpenAI GPT-4o-mini**
- Live streaming responses
- Typewriter effect for natural, human-like typing
- Chat history preserved for contextual replies
- Markdown support for AI responses (lists, tables, headers, links, etc.)

### 💬 Chat UI Features
- ChatGPT-style message bubbles (User + Assistant)
- Auto scroll to latest message
- Fade-in animation for every message
- “AI is typing…” indicator
- Beautiful modern layout with Tailwind CSS
- Responsive across desktop & mobile

### 📝 Input Box Features
- Auto-growing textarea (like ChatGPT)
- `Enter` → send message  
- `Shift + Enter` → new line  
- Send button appears only when typing
- Smooth hover scaling animation
- SVG send button icon support

### 🧹 Utility Features
- “Clear Chat” button (top-right floating)
- Only visible when chat history contains responses
- Completely reset conversation with one click

---

## 🧰 Tech Stack

| Technology | Description |
|-----------|-------------|
| **React + Vite** | Fast frontend framework and build tool |
| **Tailwind CSS** | Utility-first styling system |
| **OpenAI JS SDK** | Chat completions + streaming |
| **react-markdown** | Rendering formatted AI output |
| **remark-gfm** | GitHub-style markdown |

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Shridat/Servimatt-ChatAPP.git
cd Servimatt-ChatAPP

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file in the project root
VITE_OPENAI_API_KEY=your_openai_api_key_here


⚠️ Never commit your .env file.

4️⃣ Start the development server
npm run dev

Video Demo : https://drive.google.com/file/d/1KV7cK8BnpY2_1PXo8h_N4pU3_99UlEhY/view?usp=sharing
