import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "",
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    const prompt = buildPrompt(formData);
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function buildPrompt(formData: any): string {
  const fields = `- Relationship: ${formData['relationship'] || 'Not specified'}
- Occasiontype: ${formData['occasionType'] || 'Not specified'}
- Budgetrange: ${formData['budgetRange'] || 'Not specified'}
- Recipientinterests: ${formData['recipientInterests'] || 'Not specified'}
- Travelstyle: ${formData['travelStyle'] || 'Not specified'}
- Adventurevsrelaxation: ${formData['adventureVsRelaxation'] || 'Not specified'}
- Foodwine: ${formData['foodWine'] || 'Not specified'}
- Seasonality: ${formData['seasonality'] || 'Not specified'}`;
  const template = `You are an expert luxury gift curator and experiential gifting consultant. Based on the following details, create a curated luxury gift guide.

{fields}

Please provide:
1. Curated Gift Experience Options Ranked (top 5 with descriptions and price ranges)
2. Travel Itinerary Suggestions (if applicable)
3. Exclusive Access Recommendations (hard-to-get experiences)
4. Personalized Gift Narrative (why each gift is meaningful)
5. Packaging/Presentation Ideas
6. Alternative Options (2-3 backup choices)
7. Timing Tips (when to buy/book)

Format in clean markdown with ratings, price estimates, and specific vendor recommendations.`;
  return template.replace("{fields}", fields);
}
