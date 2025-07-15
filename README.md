# 🧠 Concisio — AI Blog Summarizer with Urdu Translation

Concisio is an AI-powered web application that summarizes any blog post and translates it into Urdu. Built using **Next.js**, **LLaMA 3 via Groq**, **MongoDB**, and **Supabase**, it offers a sleek interface to paste blog links, generate summaries, and store the results securely.

---

## ✨ Features

- 🔗 **Paste Blog URL** – Input any public blog post URL  
- 🧠 **AI Summary** – Summarized using LLaMA 3 via Groq’s fast API  
- 🌐 **Urdu Translation** – Uses Google Translate API for Urdu output  
- 💾 **Storage** – Full content stored in **MongoDB**, summaries in **Supabase**  
- 📜 **History Page** – View, revisit, or delete your past summaries  
- ⚡ **Smooth UI** – Responsive design with error handling and loading states

---

## 🛠 Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | Next.js, TypeScript, Tailwind CSS, ShadCN UI |
| Backend      | LLaMA 3 (via Groq API), MongoDB, Supabase |
| Utilities    | Cheerio (scraping), Google Translate API |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/concisio.git
cd concisio
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Create `.env.local`

Copy the example file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with the following:

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
```

---

## 📁 Project Structure

```
app/
├── api/
│   └── summarize/
│       └── route.ts          # API route for scraping, summarizing, translating
├── history/                  # History page to view past summaries
│   └── [id]/page.tsx         # Detailed view of each summary
├── mainpage/                 # Optional route
├── summarize/                # Optional route
├── favicon.ico
├── globals.css               # Global styles
├── layout.tsx                # App shell layout
├── page.tsx                  # Main landing page

components/
├── logos/                    # Logo files
├── sections/                 # Reusable layout sections
├── ui/                       # Shared UI components (Button, Card, etc.)
├── Dashboard.tsx            # Main blog summarization UI
├── FooterSection.tsx        # Footer component
├── Navbar.tsx                # Navigation bar
└── GoBackButton.tsx         # Reusable back button component

lib/
└── translateToUrdu.ts       # Translation logic
```

---

## 📦 API Overview

**POST** `/api/summarize`

**Request Body:**

```json
{
  "url": "https://example.com/blog-post"
}
```

**Response:**

```json
{
  "success": true,
  "title": "Blog Title",
  "content": "Full scraped blog text",
  "summary": "AI-generated English summary",
  "urduSummary": "Translated Urdu summary"
}
```

---

## 🧪 Example Use Cases

* Translate and summarize technical articles for Urdu-speaking audiences
* Academic research and quick blog reviews
* Simplifying long blog posts into digestible content
* Revisit and manage your summary history

---

## 🙌 Credits

* [Groq](https://groq.com) for LLaMA 3 API
* [Supabase](https://supabase.com) for the database & auth
* [MongoDB](https://mongodb.com) for document storage
* [ShadCN UI](https://ui.shadcn.com) for beautiful components
* [Google Translate API](https://cloud.google.com/translate) for translation

---

## 📄 License

This project is part of an internship assignment and is for educational purposes.
