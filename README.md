# 🧠 Concisio — AI Blog Summarizer with Urdu Translation

Concisio is an AI-powered blog summarizer built with **Next.js**, **LLaMA 3 via Groq**, **MongoDB**, and **Supabase**. It scrapes blog content from a URL, summarizes it using LLaMA 3, translates it to **Urdu**, and stores the results securely.

## ✨ Features

-  **Paste blog URL** — Easy-to-use form to input any blog URL  
-  **AI Summary** — LLaMA 3 generates a clear and concise summary  
-  **Urdu Translation** — Summary auto-translated using Google Translate API  
-  **Storage** — Stores full blog content in **MongoDB** and summaries in **Supabase**  
-  **Fast UX** — Responsive UI with loading states and error handling

## 🛠 Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, ShadCN UI  
- **Backend**: Groq API (LLaMA 3), MongoDB, Supabase  
- **Other**: Cheerio (web scraping), Google Translate API

## 📦 Installation

```bash
git clone https://github.com/your-username/concisio.git
cd concisio
pnpm install
cp .env.local.example .env.local
---

## 📦 Required `.env.local` Variables

```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Groq API
GROQ_API_KEY=your_groq_api_key

# Google Translate
GOOGLE_TRANSLATE_API_KEY=your_translate_key

## 📁 Project Structure
app/
├── api/
│ └── summarize/
│ └── route.ts # API route to handle summarization logic
├── mainpage/ # Additional route (not used in main flow)
├── summarize/ # Optional page route
├── favicon.ico
├── globals.css # Global CSS styles
├── layout.tsx # Root layout component
├── page.tsx # Home page entry

components/
├── logos/ # Logo assets or components
├── sections/ # Footer or other layout sections
├── ui/ # Reusable UI components
├── Dashboard.tsx # Main summarizer UI
├── FooterSection.tsx # Footer component
└── Navbar.tsx # Navigation bar component

lib/
└── translateToUrdu.ts # Google Translate helper for Urdu summaries

#🙌 Credits

- Groq for blazing-fast LLaMA inference
- Supabase
- MongoDB
- ShadCN UI
- Google Translate API
