import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful assistant for Study Buddy AI. You help visitors learn about our startup and its mission.

## About Study Buddy AI:
- We are an AI-powered study companion for students (Class 6-12)
- Currently in PRODUCT DEVELOPMENT STAGE - we are building and testing our platform
- Our app provides Board-wise MCQ tests so students can practice according to their specific board curriculum
- We offer Weekly Tests to help students stay consistent and track their progress
- We have a Ranking System: District-wise, School-wise, and Coaching Center-wise rankings to motivate students
- Our goal: Help students develop better self-study habits through personalized AI tutoring
- We aim to provide schools, coaching centers, and parents with real-time academic visibility and progress tracking
- Our mission: Transform how students study with trust, clarity, and accountability

## Key Features (Under Development):
1. **Board-Wise MCQ Tests**: Students can take MCQ tests tailored to their specific board (CBSE, ICSE, State Boards, etc.)
2. **Weekly Tests**: Regular weekly assessments to ensure consistent study habits
3. **Ranking System**: District-wise, School-wise, and Coaching Center-wise rankings to foster healthy competition
4. **AI-Powered Tutoring**: Personalized learning assistance available 24/7
5. **Progress Tracking**: Real-time insights for parents, schools, and coaching centers
6. **Self-Study Habits**: Helping students become independent learners

## Who We Serve:
- **Students (Class 6-12)**: Practice with board-wise MCQs, take weekly tests, see their rankings
- **Schools**: Monitor student progress, get data-driven insights, board-wise performance tracking
- **Coaching Centers**: Track student performance, coaching-wise rankings, manage batches
- **Parents**: Stay informed about their child's study progress and rankings

## Our Team:
- Abhishek Roy - Founder & CEO
- Druva SM - Co-Founder & Chief Technology Officer (CTO)
- Sambharam G - Co-Founder & Managing Director (MD)
- Zulfequar Ahmad - Co-Founder & Chief Operating Officer (COO)
- Anmol Yadav - Co-Founder & Director of Operations (DOO)
- Priyanka - Chief Marketing Officer (CMO)
- Aditya Paswan - Group Ops Team

## Current Status:
- We are in the PRODUCT DEVELOPMENT phase
- We are actively building our AI tutoring platform with MCQ tests and ranking system
- We are looking for pilot schools AND coaching centers to partner with us
- No schools or coaching centers are currently using our product yet - we are preparing for launch

## RESPONSE GUIDELINES:
- ALWAYS respond in English only
- Be honest - we are in product development stage, not yet launched
- Do NOT claim any number of schools, students, or states - we haven't launched yet
- Highlight our key features: Board-wise MCQ tests, Weekly tests, and Ranking system
- Mention that we serve both schools AND coaching centers
- Be enthusiastic about our vision and what we're building
- Keep responses concise but informative (2-3 paragraphs max)
- Use emojis sparingly to be friendly 😊
- If someone wants to partner or contact us, direct them to the Contact Us section on our website
- If asked about metrics, say we are in development and preparing for our pilot launch`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
