import { GoogleGenAI, Type, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const getGeminiPro = () => new GoogleGenAI({ apiKey });

async function withRetry<T>(fn: () => Promise<T>, retries = 5, delay = 3000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const isQuotaError = error?.status === 429 || 
                        error?.message?.includes('429') || 
                        error?.message?.includes('RESOURCE_EXHAUSTED') ||
                        error?.message?.includes('quota');
    
    if (retries > 0 && isQuotaError) {
      console.warn(`API Quota exceeded. Retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      // Increase delay exponentially but with a cap
      const nextDelay = Math.min(delay * 2, 30000); 
      return withRetry(fn, retries - 1, nextDelay);
    }
    throw error;
  }
}

export async function chatWithAI(message: string, persona: string = "General", customKeywords: string = "", history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  return withRetry(async () => {
    const ai = getGeminiPro();
    
    let personaInstruction = "";
    if (persona === "Value Investing") {
      personaInstruction = "Bạn là chuyên gia về Đầu tư Giá trị (Value Investing), theo trường phái của Warren Buffett và Benjamin Graham. Hãy tập trung vào giá trị nội tại, biên an toàn (margin of safety) và lợi thế cạnh tranh bền vững (moat).";
    } else if (persona === "Growth Stocks") {
      personaInstruction = "Bạn là chuyên gia về Cổ phiếu Tăng trưởng (Growth Stocks). Hãy tập trung vào tốc độ tăng trưởng doanh thu, lợi nhuận, tiềm năng thị trường và các yếu tố đổi mới sáng tạo.";
    } else if (persona === "Technical Analysis") {
      personaInstruction = "Bạn là chuyên gia về Phân tích Kỹ thuật (Technical Analysis). Hãy tập trung vào biểu đồ giá, khối lượng giao dịch, các chỉ báo kỹ thuật (RSI, MACD, MA) và các mô hình giá.";
    } else if (persona === "Dividend Investing") {
      personaInstruction = "Bạn là chuyên gia về Đầu tư Cổ tức (Dividend Investing). Hãy tập trung vào tỷ suất cổ tức (dividend yield), tỷ lệ chi trả cổ tức (payout ratio) và sự ổn định của dòng tiền để trả cổ tức.";
    } else {
      personaInstruction = "Bạn là một chuyên gia phân tích tài chính cao cấp.";
    }

    if (customKeywords) {
      personaInstruction += ` Ngoài ra, hãy đặc biệt chú trọng vào các khía cạnh sau: ${customKeywords}.`;
    }

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `${personaInstruction} Bạn đang hỗ trợ người dùng học cách phân tích báo cáo tài chính của các công ty trong S&P500 và VN30. Hãy trả lời bằng tiếng Việt, chuyên nghiệp, dễ hiểu và đưa ra các ví dụ thực tế.`,
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  });
}

export async function analyzeFinancialImage(base64Image: string, prompt: string) {
  return withRetry(async () => {
    const ai = getGeminiPro();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: "image/png" } },
          { text: prompt || "Hãy phân tích các con số tài chính trong hình ảnh này và đưa ra nhận xét chuyên môn." }
        ]
      }
    });
    return response.text;
  });
}

export async function getRealTimeCompanyData(companyName: string) {
  return withRetry(async () => {
    const ai = getGeminiPro();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [{ text: `Cung cấp thông tin tài chính mới nhất và tóm tắt tình hình kinh doanh của công ty ${companyName}. Tập trung vào doanh thu, lợi nhuận và các chỉ số chính.` }]
      },
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text;
  });
}

export async function getCompanyESGData(companyName: string) {
  return withRetry(async () => {
    const ai = getGeminiPro();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [{ text: `Tóm tắt các sáng kiến ESG (Môi trường, Xã hội, Quản trị) mới nhất của công ty ${companyName} trong năm 2024 và 2025.` }]
      },
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text;
  });
}
