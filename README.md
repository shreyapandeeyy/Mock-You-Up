# Mock You Up

**A unified platform solving fragmented job-search workflows through contextual AI.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Groq](https://img.shields.io/badge/Groq-LPU_Inference-orange?style=flat-square)](https://groq.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)

[Quick Start](#setup) • [Architecture](#system-architecture) • [Deployment](#deployment)

---

## The Problem

Job seekers juggle multiple subscriptions for resume builders, cover letter templates, interview prep platforms, and career research tools. Each operates in isolation, forcing users to re-enter the same information and receive generic, context-free advice. The "wait and refresh" workflow of traditional AI tools breaks concentration during resume editing.

## What This Solves

**Mock You Up** unifies resume building, cover letter generation, interview practice, and industry insights into a single platform where user context flows between features. Enter your industry and experience once during onboarding—the system adapts resume suggestions, interview questions, and salary data automatically without re-prompting.

### Key Differentiation

**Instant AI feedback during editing:** Integrated Groq's LPU inference instead of traditional GPT APIs to deliver sub-second responses while users type resumes. This eliminates the "generate, wait, review, regenerate" cycle that frustrates users in existing tools.

**Contextual feature adaptation:** The system doesn't treat each feature as isolated. When you select "Software Engineering" as your industry, interview questions become technical, salary insights show engineering-specific data, and resume suggestions emphasize quantifiable achievements relevant to tech hiring managers.

**Single onboarding, persistent intelligence:** User profile (industry, skills, experience) is captured once and referenced across all AI prompts, ensuring consistent, personalized outputs without repetitive form-filling.

---

## Core Features

### Resume Builder with Real-Time AI Enhancement

Users create resumes using a markdown editor with live preview. As they write, the system provides instant AI suggestions for improving bullet points—transforming "worked on database optimization" into "Optimized PostgreSQL queries, reducing average response time by 40% and handling 2x traffic growth." The AI understands industry context from onboarding, so suggestions for a marketing role differ fundamentally from those for engineering.

**Technical approach:** Groq's LPU inference provides sub-second response times necessary for real-time suggestions. Traditional GPT APIs with 3-5 second latencies would break the editing flow.

**Auto-save with intelligent upserts** ensures draft progress persists without manual saving. The database schema uses unique user-resume relationships, preventing duplicate entries while allowing updates.

### Cover Letter Generator with Job Description Analysis

Instead of generic templates, users input a job description and company name. The system analyzes requirements, cross-references with user experience from their profile, and generates tailored content highlighting relevant achievements. Output is markdown-formatted for easy editing before export.

Generation takes under 5 seconds from submission to editable draft. Multiple versions can be saved per user, enabling A/B testing of different approaches for the same role.

### Interview Practice with Adaptive Questioning

Generates 10 multiple-choice questions per session, tailored to user's industry and skill set. Questions include detailed explanations for correct and incorrect answers. Results are stored with scores and improvement tips for tracking progress over sessions.

**Adaptive difficulty:** While currently role-specific, the framework supports adjusting question complexity based on previous performance scores.

### Industry Insights with Automated Updates

Dashboard displays salary ranges, growth rates, trending skills, and market outlook for user's selected industry. Data refreshes weekly via background job (Inngest + Gemini) to keep insights current without user intervention.

Users can also trigger on-demand insight generation via Groq for immediate market data when researching a career pivot.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js 15)                 │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │Dashboard │ Resume   │ Cover    │Interview │Onboarding│  │
│  │          │ Builder  │ Letter   │  Prep    │          │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
┌───────────▼──────┐ ┌──────▼──────┐ ┌─────▼────────┐
│  Clerk Auth      │ │   Prisma    │ │  Groq API    │
│  User Sessions   │ │   ORM       │ │  Llama 3.3   │
└──────────────────┘ └──────┬──────┘ └──────────────┘
                            │
                    ┌───────▼────────┐
                    │   PostgreSQL   │
                    │  (Neon/Vercel) │
                    └────────────────┘
                            ▲
                            │
                    ┌───────┴────────┐
                    │    Inngest     │
                    │  Cron Jobs +   │
                    │  Gemini API    │
                    └────────────────┘
```

**Data Flow:**

1. Clerk manages user authentication and sessions
2. Groq API (Llama 3.3 70B) handles all user-facing AI features with sub-second latency
3. Prisma + PostgreSQL stores user profiles, resumes, cover letters, and assessment results
4. Inngest + Gemini runs weekly background jobs to refresh industry insights

---

## Technical Architecture

### Frontend Stack

**Next.js 15** with App Router and React 19 enables Server Components for initial page loads while maintaining client interactivity where needed. Resume editing uses client components for responsiveness; data fetching happens server-side to reduce bundle size.

**Tailwind CSS + Shadcn UI** provides consistent styling without runtime CSS-in-JS overhead. Component library is copy-paste (not npm installed), allowing customization without dependency bloat. **Lucide** icons are tree-shakeable, importing only used symbols.

### Data Layer

**PostgreSQL via Neon** provides serverless scaling without connection pooling issues that plague traditional managed databases. Database doesn't pause or delete data (critical after previous Supabase issues). Connection string uses sslmode=require for secure communication.

**Prisma ORM** generates type-safe client from schema, catching database-code mismatches at compile time. Migrations folder tracks schema evolution. Uses `@@unique` constraints to prevent duplicate user resumes while allowing upserts for autosave.

**Clerk** manages authentication with webhook support for syncing user data. Custom domain configuration (myu.shreyapandey.me) requires updating allowed domains in dashboard. Provides pre-built React components for sign-in/sign-up flows with full customization support.

### AI Infrastructure

**Groq API (Llama 3.3 70B)** handles all real-time features. Choice driven by LPU inference delivering responses in under 1 second—necessary for resume suggestions that feel instant. Traditional GPT-4 latencies (3-5s) break editing flow. Groq's rate limits (30 req/min on free tier) are sufficient for single-user typing cadence.

**Google Gemini 1.5 Flash** runs only in background jobs via Inngest. Weekly industry data refreshes don't need sub-second performance, so Gemini's lower cost and larger context window fit better. Separation prevents Groq quota exhaustion from scheduled tasks.

**Inngest** orchestrates background workflows with automatic retries. Cron job `0 0 * * 0` (Sunday midnight UTC) triggers industry updates for all users. Handles failures gracefully—if Gemini API times out, job reschedules without corrupting database state.

### Deployment

**Vercel** deployment uses `vercel.json` to run `prisma generate` before build (ensures Prisma Client matches schema). Environment variables loaded from Vercel dashboard, not committed to repo. Custom domain requires DNS CNAME pointing to Vercel + Clerk domain allowlist update.

### Key Dependencies

```json
{
  "@clerk/nextjs": "^6.9.10",        // Auth with custom domain support
  "@prisma/client": "^6.2.1",        // Generated DB client
  "groq-sdk": "^0.19.0",             // Groq LPU inference
  "@google/generative-ai": "^0.21.0", // Gemini for background jobs
  "inngest": "^3.29.3",              // Workflow orchestration
  "next": "^15.4.0",                 // App Router + Server Components
  "react": "^19.0.0",                // Concurrent features
  "react-hook-form": "^7.54.2",      // Form state management
  "zod": "^3.24.1",                  // Schema validation
  "recharts": "^2.15.0",             // Performance charts
  "jspdf": "^2.5.2"                  // Client-side PDF export
}
```

---

## Setup

**Prerequisites:** Node.js 18+, PostgreSQL database (Neon recommended), API keys from Clerk and Groq

1. Clone and install:
   ```bash
   git clone https://github.com/shreyapandeeyy/Mock-You-Up.git
   cd Mock-You-Up
   npm install
   ```

2. Create `.env` file (template in `.env.production.template`):
   ```env
   DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
   
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
   CLERK_SECRET_KEY=sk_test_xxx
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   
   GROQ_API_KEY=gsk_xxx
   GEMINI_API_KEY=AIzaSyxxx  # Optional, only needed for background industry updates
   ```

3. Initialize database:
   ```bash
   npx prisma db push      # Creates tables from schema
   npx prisma generate     # Generates type-safe Prisma Client
   ```

4. Run development server:
   ```bash
   npm run dev
   # Or specify port: npm run dev -- -p 7000
   ```

### Database Provider Setup

**Neon (recommended):** Sign up at neon.tech, create project, copy connection string to DATABASE_URL. Neon never pauses or deletes databases on free tier.

**Vercel Postgres:** In Vercel dashboard, go to Storage → Create Database → Postgres. Connection string appears in `.env.local` tab.

### Clerk Configuration

1. Create account at clerk.com, create new application
2. In dashboard: Configure → Paths, set sign-in URL to `/sign-in` and after-sign-in to `/onboarding`
3. Copy publishable key and secret key to `.env`
4. For custom domain: Settings → Domains, add your domain (e.g., `myu.shreyapandey.me`) to allowed list
5. (Optional) Customize sign-in/sign-up pages in Clerk dashboard

### Groq API Setup

1. Sign up at [console.groq.com](https://console.groq.com)
2. Generate API key and add to `.env` as `GROQ_API_KEY`
3. Free tier includes generous usage limits

---

## Project Structure

```
Mock-You-Up/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (sign-in/up)
│   ├── (main)/                   # Protected routes
│   │   ├── dashboard/
│   │   ├── resume/
│   │   ├── interview/
│   │   ├── ai-cover-letter/
│   │   └── onboarding/
│   ├── api/                      # API routes
│   ├── layout.js                 # Root layout
│   └── page.js                   # Landing page
├── actions/                      # Server Actions
│   ├── dashboard.js              # Industry insights
│   ├── resume.js                 # Resume CRUD
│   ├── cover-letter.js           # Cover letter generation
│   ├── interview.js              # Quiz generation
│   └── user.js                   # User profile
├── components/                   # React components
│   ├── ui/                       # Shadcn UI components
│   └── ...                       # Custom components
├── lib/                          # Utilities
│   ├── prisma.js                 # Database client
│   ├── checkUser.js              # Auth helpers
│   └── inngest/                  # Background jobs
├── prisma/
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
└── middleware.js                 # Clerk middleware
```

---

## Database Schema
```prisma
model User {
  id              String           @id @default(uuid())
  clerkUserId     String           @unique
  email           String           @unique
  name            String?
  industry        String?
  bio             String?
  experience      Int?
  skills          String[]
  assessments     Assessment[]
  resume          Resume?
  coverLetter     CoverLetter[]
}

model Resume {
  id          String    @id @default(cuid())
  userId      String    @unique
  content     String    @db.Text
  atsScore    Float?
  feedback    String?
}

model CoverLetter {
  id              String    @id @default(cuid())
  userId          String
  content         String
  jobDescription  String?
  companyName     String
  jobTitle        String
  status          String    @default("draft")
}

model Assessment {
  id            String    @id @default(cuid())
  userId        String
  quizScore     Float
  questions     Json[]
  category      String
  improvementTip String?
}

model IndustryInsight {
  id               String    @id @default(cuid())
  industry         String    @unique
  salaryRanges     Json[]
  growthRate       Float
  demandLevel      String
  topSkills        String[]
  marketOutlook    String
  keyTrends        String[]
}
```

---

## Deployment

### Vercel Deployment

1. Push repository to GitHub
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. Import to Vercel (vercel.com → Import Project → select repository). Vercel auto-detects Next.js configuration.

3. Add environment variables in Vercel dashboard (Settings → Environment Variables):
   ```env
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   GROQ_API_KEY=gsk_...
   GEMINI_API_KEY=AIzaSy...  # Optional
   ```

4. Deploy. Build takes ~2 minutes.

**Note on Clerk production keys:** Switch from `pk_test_` to `pk_live_` keys when deploying. Test keys won't work in production.


---

## Development Commands

```bash
npm run dev               # Start dev server (default port 3000)
npm run dev -- -p 7000    # Start on custom port
npm run build             # Production build
npm run start             # Serve production build
npm run lint              # Run ESLint

npx prisma generate       # Generate Prisma Client
npx prisma db push        # Push schema changes to database
npx prisma studio         # Open database GUI
npx prisma migrate dev    # Create migration
```

---

## Design Decisions

**Real-time AI inference:** Chose Groq's LPU over traditional GPT APIs based on latency requirements. Resume editing needed sub-second feedback to avoid breaking user flow—waiting 3-5 seconds after each keystroke was unacceptable. Groq's 18x speed improvement made real-time suggestions viable.

**Context persistence:** Rather than treating features as isolated tools, system captures user industry/experience once during onboarding. All subsequent AI generations (resume bullets, cover letter content, interview questions, salary insights) reference this context automatically. Prevents repetitive form-filling and improves personalization accuracy.

**Database uniqueness constraints:** Resume table uses `userId @unique` to enforce one-resume-per-user while supporting upserts for autosave. Prevents duplicate entries that would confuse users and complicate data fetching. CoverLetter allows multiple entries per user since same person applies to different roles.

**Markdown over rich text editors:** Used markdown for content editing instead of WYSIWYG editors. Markdown is parse-able by AI models, enables version control, and results in cleaner database storage. Preview pane provides visual feedback without editor complexity.

---

## Contributing

Fork repository, create feature branch (`git checkout -b feature/name`), make changes, test locally, commit (`git commit -m "Description"`), push to your fork, open Pull Request.

Follow existing code patterns (Server Actions for mutations, Zod schemas for validation, Prisma for database). Ensure `npm run lint` passes. Update documentation if adding features.

---

## Roadmap Considerations

Potential future directions (not committed):

- LinkedIn/GitHub integration for profile import
- Voice interview practice with speech analysis
- Application tracking across multiple job boards
- Mobile native apps for iOS/Android
- Collaborative resume review with mentors
- Multi-language support for international users

Focus remains on core workflows: resume building, cover letters, interview prep, industry insights. New features evaluated based on whether they reduce friction in job search process.

---

## Credits

**APIs:** Groq (Llama 3.3 70B inference), Google Gemini (background jobs), Clerk (authentication), Neon (PostgreSQL)

**Frameworks:** Next.js, React, Prisma ORM, Tailwind CSS, Shadcn UI, Inngest

Built for learning and solving real job-search workflow problems encountered during career transitions.

---

## License

MIT License - see [LICENSE](LICENSE) file. Free to use, modify, and distribute with attribution.

---

**Issues:** [GitHub Issues](https://github.com/shreyapandeeyy/Mock-You-Up/issues)  
**Discussions:** [GitHub Discussions](https://github.com/shreyapandeeyy/Mock-You-Up/discussions)
