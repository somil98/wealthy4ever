import { GoogleGenAI, Chat } from "@google/genai";
import { MarketInsight } from '../types';

// Initialize the Gemini Client
// In a real production app, ensure this is handled via a secure proxy if possible, 
// though GH Pages requires client-side keys.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_ADVISOR = `
You are a knowledgeable, empathetic, and professional financial assistant for Apex Wealth Partners. 
Your goal is to explain complex financial concepts in simple terms (wealth accumulation, tax strategies, retirement planning).
IMPORTANT: You must NOT provide specific buy/sell recommendations for specific stocks. 
Always include a brief disclaimer that you are an AI and this is not professional financial advice.
Keep responses concise and formatted with Markdown.
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_ADVISOR,
    },
  });
};

export const analyzeMarketSentiment = async (query: string): Promise<MarketInsight> => {
  const prompt = `
    Search for the latest news and financial reports regarding "${query}". 
    Summarize the current market sentiment in 2-3 sentences. 
    Determine if the sentiment is Bullish, Bearish, or Neutral.

    Output the result in the following format:
    Sentiment: [Bullish/Bearish/Neutral]
    Summary: [The summary text]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are not allowed when using the googleSearch tool.
      },
    });

    const text = response.text || "";
    
    // Parse the text response manually since JSON mode is not available with Search
    const sentimentMatch = text.match(/Sentiment:\s*(Bullish|Bearish|Neutral)/i);
    let sentiment: 'Bullish' | 'Bearish' | 'Neutral' = 'Neutral';
    if (sentimentMatch) {
      const s = sentimentMatch[1].toLowerCase();
      if (s === 'bullish') sentiment = 'Bullish';
      else if (s === 'bearish') sentiment = 'Bearish';
    }

    const summaryMatch = text.match(/Summary:\s*([\s\S]+)/i);
    // If "Summary:" tag is missing, try to use the rest of the text, removing the sentiment line
    let summary = summaryMatch ? summaryMatch[1].trim() : text;
    if (!summaryMatch && sentimentMatch) {
      summary = text.replace(sentimentMatch[0], '').trim();
    }
    
    // Extract sources if available from grounding metadata
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    return {
      symbol: query.toUpperCase(),
      summary: summary || "Unable to analyze at this time.",
      sentiment: sentiment,
      sources: sources
    };
  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      symbol: query,
      summary: "We encountered an issue analyzing the market data. Please try again later.",
      sentiment: "Neutral",
      sources: []
    };
  }
};