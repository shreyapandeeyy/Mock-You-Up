[//]: # (![github-submission-banner]&#40;https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f&#41;)

# Mock You Up 🚀

> Your Personalized Career Copilot

Mock You Up is an intelligent career assistant meticulously crafted to empower professionals and job seekers with a suite of tools designed to forge compelling resumes, conquer interviews, and navigate their career journeys with unwavering confidence. Whether you're embarking on a career change, stepping into the professional world for the first time, or aiming for that next significant promotion, Mock You Up dynamically adapts to your unique aspirations and communicates in a way that resonates with your specific needs.

---

## 📌 Problem Statement

**Problem Statement 1 – Weave AI magic with Groq**

---

## 🎯 Objective

- **Problem:** Over 75% of students and job seekers feel lost when making career decisions or preparing for job applications.
- **Solution:** Mock You Up offers intelligent, personalized career guidance powered by AI to simplify this journey.
- **Target Users:** Students, recent graduates, and professionals seeking better career opportunities.
- **Real-World Use Case:** Users can generate tailored resumes, cover letters, receive industry insights, and practice mock quizzes—all in one platform.
- **Value Provided:** Saves time, reduces stress, improves job readiness, and empowers users with the tools and insights they need to succeed.

---

## 🧠 Approach
### 🧭 Approach

- **Why this problem:** We noticed a huge gap in accessible, personalized career support, especially for students entering a competitive job market.
- **Key challenges addressed:** Real-time AI response speed, user personalization, and simplifying complex tasks like resume building and skill alignment.
- **Breakthroughs during hacking:**
  - Integrated Groq’s low-latency AI for instant feedback.
  - Developed modular AI agents for each core feature.
  - Pivoted from a static tool to a dynamic, user-adaptive system after early testing.

---

## 🛠️ Tech Stack

### Core Technologies Used:

- **Frontend:**
  - Next.js with TypeScript
  - Tailwind CSS for styling
  - Shadcn UI for beautifully-designed, accessible components

- **Backend:**
  - Groq API for ultra-fast AI inference

- **Database:**
  - Clerk (for user data and session history)
  - Prisma (for resume, cover letter and quiz data)
  - Local JSON/mock data for prototyping

- **APIs:**
  - Groq (LLM inference)

- **Hosting:**
  - Vercel 

---

### Sponsor Technologies Used:
- ✅ **Groq:** Used Groq’s ultra-fast LPU inference to power real-time resume building, cover letter generation, career recommendations, and mock quizzes. Its low latency enabled an interactive, seamless user experience with instant AI responses.

---

## ✨ Key Features

### ✅ Smart Resume Builder
Unleash the power of a meticulously crafted, personalized resume that speaks directly to your target industry. Mock You Up intelligently analyzes your provided information and elevates your content with quantifiable achievements, impactful action verbs, and critical industry-specific keywords that recruiters actively seek.

- **Intelligent Upserts:** Seamlessly update and save your resume iterations, ensuring your progress is never lost.
- **AI-Powered Enhancement:** Benefit from intelligent suggestions driven by Groq LLM (with the flexibility to integrate Google Gemini), providing insightful recommendations to strengthen your resume's impact.
- **Secure User Authentication:** Built with Clerk for robust and reliable user authentication, safeguarding your personal information.

### ✅ Real-time Industry Insights
Gain a competitive edge with up-to-the-minute, AI-driven insights directly relevant to your chosen domain. Stay informed about:

- **Essential Skills:** Discover the core competencies and abilities that are highly valued in your industry.
- **Latest Trends:** Keep abreast of the evolving landscape and emerging shifts shaping your field.
- **Cutting-Edge Tools & Technologies:** Identify and understand the key technologies and tools that are gaining traction.
- **Role-Specific Guidance:** Access tailored advice and recommendations specific to the roles you're targeting.

These dynamic insights are seamlessly integrated across the Mock You Up platform, ensuring that all suggestions and improvements are contextually relevant and highly personalized.

### ✅ Comprehensive Interview Prep
Sharpen your interview skills and boost your confidence with realistic, role-specific, and scenario-based quiz rounds designed to simulate real-world interview experiences.

- **Technical and Behavioral Readiness:** Prepare for both the technical intricacies and the behavioral nuances of your target roles.
- **Personalized Feedback and Scoring:** Receive detailed feedback on your performance, highlighting areas of strength and opportunities for improvement.

### ✅ Intelligent Cover Letter Creator
Generate compelling and personalized cover letters that perfectly complement your resume and align seamlessly with the specific requirements of each job description.

- **AI-Generated Tailored Content:** Leverage the power of AI to craft content that directly addresses the job requirements and highlights your most relevant experience.
- **Clear Formatting and Concise Language:** Ensure your cover letters are professionally formatted and articulate your qualifications with clarity and impact.
- **Fully Editable and Easily Downloadable Output:** Retain complete control over your cover letters with easy editing capabilities and convenient download options.

---

[//]: # (## 📝 Presentation Slides)

[//]: # ([Presentation]&#40;https://docs.google.com/presentation/d/1vOC3aXTavbU3RGZ_ZCfxL7bqDyr2DfLul_s0CfFoDYE/edit?usp=sharing&#41;)

[//]: # (Explore our detailed presentation to understand the vision, features, and technology behind Mock You Up.)


### Configuration: Setting up your `.env` file

Before running Mock You Up, ensure you create a `.env` file in the root of your project directory and populate it with the following essential environment variables:

```
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY= (Not Needed)

GROQ_API_KEY=
```

---

**Note:** Make sure to replace the placeholder values (e.g., `YOUR_POSTGRESQL_CONNECTION_STRING`) with your actual credentials and API keys.

---

# Getting Started: Installation Guide

Follow these straightforward steps to get Mock You Up up and running on your local machine:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/shreyapandeeyy/Mock-You-Up.git](https://github.com/shreyapandeeyy/Mock-You-Up.git)
    ```

2.  **Navigate to the Project Directory:**
    ```bash
    cd nuvita-ai
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

Once the development server is running, you can access Mock You Up in your web browser, typically at `http://localhost:3000`.

## 🛡️ Our Commitment to Security & Privacy

Your security and privacy are at the core of Mock You Up's design philosophy. We leverage the industry-leading authentication service, Clerk, to ensure the robust protection of your account and personal information. You can be confident that all user data is securely stored and will never be shared with any external third parties. Your professional journey is yours, and we are committed to keeping your data private.

---

## 🧬 Future Scope

List improvements, extensions, or follow-up features:

- 📈 **More Integrations**  
  Integrate with platforms like LinkedIn, GitHub, and job boards for one-click profile syncing and job application tracking.

- 🛡️ **Security Enhancements**  
  Implement OAuth-based login, role-based access, and data encryption to protect user data and ensure privacy compliance.

- 🌐 **Localization / Broader Accessibility**  
  Support multiple languages and regional career databases to serve a global audience more effectively.

- 🤖 **Voice & Chat Assistant**  
  Introduce a conversational AI to guide users through career decisions interactively.

- 📊 **User Analytics Dashboard**  
  Provide insights on skill gaps, improvement areas, and career readiness progress through visual analytics.

---
## 📎 Resources / Credits

- **APIs or Datasets Used:**
  - Groq API for ultra-fast AI inference, resume and letter generation, insights, and quiz content

- **Open Source Libraries or Tools Referenced:**
  - Clerk for authentication and user management
  - Shadcn UI for modern, accessible UI components
  - Prisma for database ORM and type-safe queries
  - Tailwind CSS for utility-first styling

- **Acknowledgements:**
  - Groq Hackathon team for organizing and providing the platform
  - BioMorph AI team members for collaboration and creativity
  - Open-source community for tools and inspiration

---
## 🏁 Final Words

### 🤝 Join Our Community: Contributing to Mock Yo uUp

We believe in the power of collaboration and enthusiastically welcome contributions from the developer community! If you are passionate about empowering career growth and have ideas or improvements to share, we encourage you to get involved. Here's how you can contribute:

1.  **Fork the Repository:** Begin by creating your own copy of the Mock You Up repository on GitHub.
2.  **Create a Feature Branch:** Branch off the `main` branch to isolate your changes and keep the main codebase clean. Choose a descriptive name for your branch (e.g., `feature/new-interview-module`).
3.  **Implement Your Enhancements:** Develop your features, fix bugs, or implement improvements. Ensure your code adheres to best practices and includes relevant tests.
4.  **Test Thoroughly:** Verify that your changes function as expected and do not introduce any regressions.
5.  **Submit a Pull Request:** Once you're confident in your contributions, submit a pull request to the `main` branch of the original Mock You Up repository. Provide a clear and concise description of your changes and their purpose.

We deeply appreciate your dedication to making Mock You Up an even more valuable resource for professionals worldwide!

---

## 📄 Licensing Information

Mock You Up is open-source software licensed under the **MIT License**. This permissive license grants you the freedom to use, modify, and distribute the software, even for commercial purposes, as long as you retain the original copyright and license notice. For complete details, please refer to the `LICENSE` file included in the project repository.