import { GoogleGenerativeAI } from "@google/generative-ai";

// We will initialize this lazily to ensure .env has been loaded.
let genAI: GoogleGenerativeAI | undefined;

/**
 * Initializes and returns the GoogleGenerativeAI client instance.
 * This function uses a singleton pattern to ensure the client is created only once.
 * @returns The initialized GoogleGenerativeAI client.
 */
function getGenAIClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not set. Please check your .env file and ensure dotenv is configured correctly at the start of your application."
      );
    }
    console.log("Initializing Google AI Client...");
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Generates a LinkedIn post summary from article text using the Gemini API.
 * @param articleTitle The title of the article.
 * @param articleContent The full text content of the article.
 * @returns A formatted LinkedIn post as a string.
 */
export async function generateLinkedInPost(
  articleTitle: string,
  articleContent: string
): Promise<string> {
  console.log("Generating LinkedIn post with AI...");
  const model = getGenAIClient().getGenerativeModel({
    model: "gemini-2.5-pro",
  });

  const prompt = `
    Based on the following article, please generate a LinkedIn post.
    The post should be engaging for a professional audience interested in Artificial Intelligence.

    Here are the requirements:
    1. Start with a strong hook to grab attention.
    2. Summarize the key specific takeaways from the article in 2-3 bullet points or a short paragraph.
    3. Keep the tone professional, yet exciting and forward-looking.
    4. Isolate the tool or tools that is being talked about.
    5. Conclude with a thought-provoking question to encourage comments.
    6. Include 3-5 relevant hashtags, such as #AI, #ArtificialIntelligence, #MachineLearning, #TechNews.

    Article Title: "${articleTitle}"
    Article Content:
    ---
    ${articleContent.substring(0, 8000)}
    ---
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
