import OpenAI from 'openai';
import { toast } from "sonner";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  toast.error("OpenAI API key is missing. Please configure it in your environment variables.");
}

// Only create OpenAI instance if API key exists
const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
}) : null;

export const processWithAI = async (content: string, pdfFile?: File) => {
  try {
    if (!openai || !apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    if (pdfFile) {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: content },
              {
                type: "image_url",
                image_url: {
                  url: URL.createObjectURL(pdfFile),
                  detail: "high"
                }
              }
            ],
          },
        ],
        max_tokens: 4096,
      });

      return response.choices[0]?.message?.content;
    } else {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that answers questions based on the content provided."
          },
          {
            role: "user",
            content: content
          }
        ]
      });

      return completion.choices[0]?.message?.content;
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};