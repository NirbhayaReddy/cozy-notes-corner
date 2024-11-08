import OpenAI from 'openai';
import { toast } from "sonner";

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export const processWithAI = async (content: string, pdfFile?: File) => {
  try {
    if (pdfFile) {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user" as const,
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
            role: "system" as const,
            content: "You are a helpful assistant that answers questions based on the content provided."
          },
          {
            role: "user" as const,
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