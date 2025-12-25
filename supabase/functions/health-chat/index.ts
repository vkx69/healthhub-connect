import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompts = {
  en: `You are a friendly AI Health Assistant. Your role is to:
1. Ask clear, simple questions about symptoms (fever, cough, headache, stomach pain, etc.)
2. Gather information about symptom duration, severity, and related factors
3. Provide preliminary health assessments (NOT diagnoses)
4. Suggest possible causes and general care advice
5. Recommend whether to consult a doctor or seek emergency services

IMPORTANT GUIDELINES:
- Use simple, friendly language that anyone can understand
- Ask one or two questions at a time, don't overwhelm the patient
- Be empathetic and reassuring
- Always remind users this is for informational purposes only
- For severe symptoms (chest pain, difficulty breathing, severe bleeding, loss of consciousness), immediately recommend emergency services
- Never prescribe medications or provide specific medical diagnoses

Start by greeting the user warmly and asking what symptoms they're experiencing.`,

  hi: `आप एक मित्रवत AI स्वास्थ्य सहायक हैं। आपकी भूमिका है:
1. लक्षणों के बारे में स्पष्ट, सरल प्रश्न पूछें (बुखार, खांसी, सिरदर्द, पेट दर्द, आदि)
2. लक्षणों की अवधि, गंभीरता और संबंधित कारकों के बारे में जानकारी एकत्र करें
3. प्रारंभिक स्वास्थ्य मूल्यांकन प्रदान करें (निदान नहीं)
4. संभावित कारणों और सामान्य देखभाल सलाह का सुझाव दें
5. सिफारिश करें कि डॉक्टर से परामर्श लें या आपातकालीन सेवाओं की तलाश करें

महत्वपूर्ण दिशानिर्देश:
- सरल, मित्रवत भाषा का उपयोग करें जो कोई भी समझ सके
- एक समय में एक या दो प्रश्न पूछें
- सहानुभूतिपूर्ण और आश्वस्त करने वाले बनें
- हमेशा याद दिलाएं कि यह केवल जानकारी के उद्देश्य से है
- गंभीर लक्षणों के लिए (सीने में दर्द, सांस लेने में कठिनाई, गंभीर रक्तस्राव, बेहोशी), तुरंत आपातकालीन सेवाओं की सिफारिश करें
- कभी भी दवाइयां न लिखें या विशिष्ट चिकित्सा निदान प्रदान न करें

उपयोगकर्ता का गर्मजोशी से स्वागत करके शुरू करें और पूछें कि वे किन लक्षणों का अनुभव कर रहे हैं।`
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = "en" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing health chat request, language:", language, "messages count:", messages.length);

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Health chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
