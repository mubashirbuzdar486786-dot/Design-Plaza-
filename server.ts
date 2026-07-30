import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for demo bookings, custom quotes, and captured AI chat leads
  const bookings: any[] = [];
  const customQuotes: any[] = [];
  const chatLeads: any[] = [];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Design Plaza API", timestamp: new Date().toISOString() });
  });

  // AI Chat Assistant Endpoint using @google/genai
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const userPrompt = message || "Hello, I need help with website design";

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback intelligent response when API key is not present
        const lower = userPrompt.toLowerCase();

        let reply = "Welcome to Design Plaza! I am your AI Web Strategy Assistant. How can I help you today?";
        let actionType = "none";
        let actionData: any = null;
        let suggestedQuestions = [
          "Which pricing plan should I choose?",
          "Recommend a website template for my business",
          "What is the delivery time?",
          "Speak with a live representative"
        ];

        if (lower.includes("price") || lower.includes("plan") || lower.includes("cost") || lower.includes("pricing")) {
          reply = "Design Plaza offers 3 transparent pricing plans with 100% satisfaction guarantee:\n\n- **Basic Plan ($599)**: Best for small businesses (1-3 custom pages, 2 days delivery)\n- **Growth Plan ($1,499)** ⭐ *Most Popular*: Best for growing brands (5-8 custom pages, 3D interactive hero, lead booking, 3 days delivery)\n- **Premium Plan ($2,899)**: Best for high-scale enterprise (unlimited pages, custom WebGL 3D models, payment gateway, 5 days delivery)";
          actionType = "plan_recommendation";
          actionData = {
            plans: [
              { name: "Basic Plan", price: 599, popular: false, delivery: "2 Days" },
              { name: "Growth Plan", price: 1499, popular: true, delivery: "3 Days" },
              { name: "Premium Plan", price: 2899, popular: false, delivery: "5 Days" }
            ]
          };
          suggestedQuestions = ["How do I book a plan?", "What extra services are available?", "What is included in the Growth plan?"];
        } else if (lower.includes("recommend") || lower.includes("template") || lower.includes("niche") || lower.includes("category")) {
          reply = "We offer 18+ high-converting industry template niches with interactive 3D demos! Tell me about your business (e.g. Construction, Hotel, Fitness, Fashion, Legal, Medical, E-commerce) and I'll match you with the perfect design.";
          actionType = "template_recommendation";
          actionData = {
            niche: "Multi-Industry Marketplace",
            recommendedDemoId: "titan-construction",
            title: "Titan Heavy Construction & Engineering",
            price: 1450
          };
          suggestedQuestions = ["Show me Construction templates", "Show me Hotel & Hospitality demos", "Show me E-commerce stores"];
        } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("support") || lower.includes("call")) {
          reply = "You can reach our USA Design Plaza team 24/7:\n\n📧 **Email**: support@designplaza.agency / sales@designplaza.agency\n📞 **Phone**: +1 (800) 555-PLAZA (+1 800-555-7529)\n🏢 **Offices**: New York, NY & San Francisco, CA\n\nWould you like me to collect your details for an immediate callback?";
          actionType = "contact_info";
          actionData = {
            email: "support@designplaza.agency",
            phone: "+1 (800) 555-7529",
            offices: "New York, NY & San Francisco, CA"
          };
          suggestedQuestions = ["Request a callback", "Book a free strategy session", "View pricing plans"];
        } else if (lower.includes("book") || lower.includes("lead") || lower.includes("hire") || lower.includes("callback") || lower.includes("quote")) {
          reply = "Great! Let's get your project started. Please share your contact details below, and our USA Lead Web Architect will reach out to you within 2 hours with a custom proposal.";
          actionType = "lead_form";
          suggestedQuestions = ["What is the delivery timeline?", "Can I add custom 3D features?", "What payment methods are accepted?"];
        } else if (lower.includes("extra") || lower.includes("add-on") || lower.includes("service") || lower.includes("care") || lower.includes("maintenance")) {
          reply = "We offer comprehensive extra services and ongoing care plans:\n\n• **Website Maintenance**: $129/mo (Updates, backups, security monitoring)\n• **Monthly SEO Growth**: $249/mo (Google ranking, blogs, GA4 reports)\n• **Logo & Branding Kit**: $189 - $349\n• **AI Chatbot Integration**: $249\n• **E-Commerce Store & Payment Gateways**: $169 - $499";
          actionType = "extra_services_recommendation";
          suggestedQuestions = ["Tell me about Monthly Maintenance", "How does AI Chatbot integration work?", "What is the price of Logo Design?"];
        }

        return res.json({
          reply,
          suggestedQuestions,
          actionType,
          actionData
        });
      }

      const ai = new GoogleGenAI({ apiKey, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } });

      const SYSTEM_INSTRUCTION = `You are "PlazaAI", the official USA Senior Web Advisor and Client Success Specialist at Design Plaza Agency (New York & San Francisco).
You are professional, articulate, warm, executive, and highly knowledgeable about website design services, 3D interactive interfaces, pricing plans, website categories, delivery times, care plans, extra services, and booking.

AGENCY INFORMATION & SERVICES:
- **Design Plaza**: Top USA agency creating high-converting, 3D animated custom websites and digital web solutions.
- **Pricing Plans**:
  1. Basic Plan: $599 (1-3 custom pages, mobile responsive, basic SEO setup, fast load speed, 2 days delivery)
  2. Growth Plan: $1,499 [Most Popular] (5-8 custom pages, 3D interactive hero, lead booking forms, advanced SEO, 3 days delivery)
  3. Premium Plan: $2,899 (Unlimited custom pages, custom 3D WebGL models, payment gateway, 1-year care discount, 5 days delivery)
- **Care & Maintenance Plans**:
  - Monthly Website Maintenance: $129/mo (Updates, bug fixes, 24/7 security monitoring, backups, speed checks)
  - Monthly SEO Growth: $249/mo (Keyword optimization, technical SEO, monthly blog posts, GA reports)
- **Extra Services**:
  - Extra Custom Page: $129
  - Logo Design: $189 | Complete Branding Kit: $349
  - Content Writing: $189 | Blog Writing: $129/mo
  - AI Chatbot Integration: $249 | Live Chat Integration: $99
  - Google Business Profile: $99 | Social Media Setup: $129
  - Speed Optimization (95+ Lighthouse Target): $149 | Security & WAF: $129
  - Payment Gateway Integration (Stripe/PayPal): $169 | Booking System: $189 | E-Commerce Store Solution: $499
- **Website Categories**: 18+ niches including Ecommerce, Construction, Hotel & Hospitality, Automotive, Healthcare, Real Estate, Restaurant, Interior Design, Education, Dental Clinic, Fashion & Retail, Photography, Fitness & Gym, Beauty & Salon, Law & Legal, SaaS & Tech, Financial Services, Solar & Clean Energy.
- **Delivery Time**: 2 to 5 business days depending on chosen plan.
- **Booking Process**: Select template or custom request -> Pick plan & add-ons -> Submit booking -> 1-on-1 strategy call within 2 hours -> Delivery in 2-5 days with 100% satisfaction guarantee.
- **Contact Info**:
  - Email: support@designplaza.agency / sales@designplaza.agency
  - USA Toll-Free Phone: +1 (800) 555-PLAZA (+1 800-555-7529)
  - Offices: New York, NY & San Francisco, CA

RESPONSE FORMAT REQUIREMENTS:
Always respond with a valid JSON object matching this schema:
{
  "reply": "Clear, concise, professional response text formatted in clean Markdown.",
  "suggestedQuestions": ["Quick follow-up question 1", "Quick follow-up question 2", "Quick follow-up question 3"],
  "actionType": "none" | "template_recommendation" | "plan_recommendation" | "extra_services_recommendation" | "lead_form" | "contact_info",
  "actionData": object or null
}

actionType guidelines:
- Use "plan_recommendation" if user asks about prices, plans, or cost.
- Use "template_recommendation" if user asks for design recommendations, templates, or names a specific business niche.
- Use "extra_services_recommendation" if user asks about maintenance, SEO, logos, or add-ons.
- Use "lead_form" if user wants to book, get a callback, request proposal, or hire.
- Use "contact_info" if user asks how to contact support, email, phone, or live chat.
- Use "none" for general questions.

Respond ONLY with valid JSON.`;

      const promptMessages = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          promptMessages.push(`${item.sender === 'user' ? 'Client' : 'PlazaAI'}: ${item.text}`);
        }
      }
      promptMessages.push(`Client: ${userPrompt}`);

      const fullPrompt = promptMessages.join("\n\n");

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: fullPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (err: any) {
      console.error("AI Chat Assistant error:", err);
      return res.status(200).json({
        reply: "Thank you for reaching out to Design Plaza! I can help you choose the right website template, recommend pricing plans, calculate extra service costs, or connect you directly with our USA strategy team.",
        suggestedQuestions: [
          "Which pricing plan is right for me?",
          "Recommend a website template",
          "How fast is delivery?",
          "Connect with live support"
        ],
        actionType: "none",
        actionData: null
      });
    }
  });

  // AI Chat Lead Capture Endpoint
  app.post("/api/chat/leads", (req, res) => {
    const lead = {
      id: "DP-LEAD-" + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      source: "AI_Chat_Assistant",
      ...req.body
    };
    chatLeads.push(lead);
    res.json({
      success: true,
      lead,
      message: "Thank you! Your information has been securely received by Design Plaza USA Team. A lead web strategist will contact you within 2 hours."
    });
  });

  // AI Recommendation Endpoint using @google/genai
  app.post("/api/ai-recommend", async (req, res) => {
    try {
      const { businessName, industry, goals, targetAudience, budget, desiredVibe } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          recommendation: {
            suggestedNiche: industry || "Solar Energy / Clean Tech",
            suggestedStyle: desiredVibe || "Futuristic Luxury Glassmorphism",
            recommendedDemoId: "solar-brooklyn",
            recommendedTechStack: ["React 19", "Three.js 3D Roof", "GSAP / Framer Motion", "Tailwind CSS"],
            keyFeatures: [
              "Interactive 3D Roof & Energy Savings Calculator",
              "Smooth Parallax & Day/Night Transition",
              "Instant Lead Booking Workflow"
            ],
            reasoning: "Based on high conversion patterns for modern tech-forward brands, an immersive interactive 3D demo with real-time feedback loops delivers the highest engagement and trust."
          }
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the lead UX Architect and Creative Director at "Design Plaza", an elite marketplace for animated web designs.
A client submitted the following requirements:
- Business Name: ${businessName || "N/A"}
- Industry / Niche: ${industry}
- Key Business Goals: ${goals || "High conversion, brand prestige, instant booking"}
- Target Audience: ${targetAudience || "Modern consumers"}
- Budget Tier: ${budget || "Professional"}
- Desired Style / Vibe: ${desiredVibe || "Futuristic, Smooth, Luxury"}

Provide a JSON object response with:
1. "suggestedNiche": string
2. "suggestedStyle": string
3. "recommendedDemoId": string (one of: "solar-brooklyn", "luxe-dining", "horizon-health", "apex-saas", "velox-estate", "aurora-gym", "lumina-beauty", "nexus-law", "pulse-fashion", "veritas-finance")
4. "recommendedTechStack": array of strings
5. "keyFeatures": array of strings (3 to 5 key features)
6. "reasoning": string (2 sentences explaining why this animation style and layout suit their goals)

Respond ONLY with valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json({ recommendation: parsed });
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (err: any) {
      console.error("AI Recommendation error:", err);
      // Fallback
      return res.status(200).json({
        recommendation: {
          suggestedNiche: req.body.industry || "General Niche",
          suggestedStyle: "Ultra-Modern Glassmorphism",
          recommendedDemoId: "solar-brooklyn",
          recommendedTechStack: ["React 19", "Three.js", "Framer Motion", "Tailwind CSS"],
          keyFeatures: [
            "Interactive 3D Demo Preview",
            "Smooth Lenis-style Scroll",
            "Responsive Device Switcher Frame"
          ],
          reasoning: "We selected a high-impact interactive 3D layout to maximize visual appeal and client conversion."
        }
      });
    }
  });

  // Booking API Endpoint
  app.post("/api/bookings", (req, res) => {
    const booking = {
      id: "DP-BK-" + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      ...req.body
    };
    bookings.push(booking);
    res.json({ success: true, booking, message: "Booking confirmed successfully! Our lead engineer will contact you within 2 hours." });
  });

  // Get Bookings List
  app.get("/api/bookings", (req, res) => {
    res.json({ success: true, count: bookings.length, bookings });
  });

  // Custom Quote Request Endpoint
  app.post("/api/custom-quote", (req, res) => {
    const quote = {
      id: "DP-QT-" + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      ...req.body
    };
    customQuotes.push(quote);
    res.json({ success: true, quote, message: "Custom design quote request received! We will send a detailed proposal shortly." });
  });

  // Vite Middleware for Development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Design Plaza server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
