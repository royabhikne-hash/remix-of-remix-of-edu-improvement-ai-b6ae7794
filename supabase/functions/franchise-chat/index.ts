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
- India's leading AI-powered study companion for students (Class 6-12)
- We help students develop better self-study habits through personalized AI tutoring
- Provides schools and parents with real-time academic visibility and progress tracking
- Our mission: Transform how students study with trust, clarity, and accountability
- Currently operational in 50+ schools across 8 states

## Our Core Features:
1. **AI-Powered Tutoring**: Personalized learning assistance available 24/7
2. **Progress Tracking**: Real-time insights for parents and teachers
3. **Self-Study Habits**: Helping students become independent learners
4. **School Integration**: Seamless integration with school curriculum

## Our Team:
- Founded by passionate educators and technologists
- Team of AI experts, educators, and product specialists
- Based in India, serving students nationwide

## Our Impact:
- 50+ partner schools
- 8+ states covered
- Thousands of students benefiting daily
- Proven improvement in student performance

## RESPONSE GUIDELINES:
- Respond in Hindi or English based on user's language (prefer Hindi for Indian users)
- Be enthusiastic and helpful
- Keep responses concise but informative (2-3 paragraphs max)
- Use emojis sparingly to be friendly 😊
- If someone wants to contact us, direct them to the Contact Us section on our website`;

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
