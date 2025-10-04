import * as dotenv from "dotenv";
import * as cron from "node-cron";
import { getMostRelevantArticle } from "./contentService";
import { generateLinkedInPost } from "./aiService";

// Load environment variables from .env file
dotenv.config();

async function main() {
  try {
    // 1. Fetch the latest article and its content
    const article = await getMostRelevantArticle();

    // 2. Generate the LinkedIn post using the AI service
    const linkedInPost = await generateLinkedInPost(
      article.title,
      article.content
    );
    console.log(linkedInPost);
  } catch (error) {
    console.error(error);
  }
}
main();
// // Schedule the main function to run every 12 hours
// cron.schedule("0 */12 * * *", () => {
//   console.log("Running the job at", new Date());
//   main();
// });

// console.log("Cron job scheduled to run every 12 hours.");
