# 🧠 Concisio — AI Blog Summarizer with Urdu Translation

**Concisio** is an AI-powered blog summarizer built with **Next.js**, **LLaMA 3 (via Groq)**, **MongoDB**, and **Supabase**. It scrapes blog content from a URL, summarizes it using LLaMA 3, translates it to **Urdu**, and stores the results securely.

---

## ✨ Features

- 🔗 **Paste blog URL** — Easy-to-use form to input any blog link  
- 🤖 **AI Summary** — LLaMA 3 generates clear and concise summaries  
- 🌐 **Urdu Translation** — Auto-translated using Google Translate API  
- 💾 **Storage** — Blog saved to **MongoDB**, summaries to **Supabase**  
- ⚡ **Responsive UI** — Clean interface with loading/error states

---

## 🛠 Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, ShadCN UI  
- **Backend**: Groq API (LLaMA 3), MongoDB, Supabase  
- **Other**: Cheerio (web scraping), Google Translate API

---

## 🚀 Installation

```bash
git clone https://github.com/your-username/concisio.git
cd concisio
pnpm install
cp .env.local.example .env.local

**## 🔐 Environment Variables (.env.local)
**
# MongoDB
MONGODB_URI=your_mongodb_uri

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq API
GROQ_API_KEY=your_groq_api_key

# Google Translate
GOOGLE_TRANSLATE_API_KEY=your_google_translate_key

##📁 Project Structure
app/
├── api/
│   └── summarize/
│       └── route.ts           # API route to handle summarization logic
├── mainpage/                  # Additional route (optional)
├── summarize/                 # Optional route
├── favicon.ico
├── globals.css                # Global styles
├── layout.tsx                 # App layout
├── page.tsx                   # Entry page

components/
├── logos/                     # Logos
├── sections/                  # Footer and sections
├── ui/                        # Reusable UI elements
├── Dashboard.tsx             # Main UI component
├── FooterSection.tsx         # Footer
└── Navbar.tsx                 # Navbar

lib/
└── translateToUrdu.ts        # Google Translate helper
