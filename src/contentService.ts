import axios from "axios";
import * as cheerio from "cheerio";
import RssParser from "rss-parser";
import { feedSources, FeedSource } from "./feedSources";

interface Article {
  title: string;
  url: string;
  content: string;
  sourceName: string;
}

/**
 * Fetches all articles from all configured RSS feeds and finds the most relevant one.
 * @returns The URL, title, and source configuration of the most relevant article.
 */
async function getMostRelevantArticleInfo(): Promise<{
  title: string;
  url: string;
  source: FeedSource;
}> {
  console.log("Fetching articles from all RSS feeds...");
  const parser = new RssParser();
  let allItems: (RssParser.Item & { source: FeedSource })[] = [];

  // Fetch all feeds concurrently for better performance
  await Promise.all(
    feedSources.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.rssUrl);
        if (feed.items) {
          // Attach the source info to each item for later use
          const itemsWithSource = feed.items.map((item) => ({
            ...item,
            source,
          }));
          allItems.push(...itemsWithSource);
        }
      } catch (error) {
        console.warn(
          `Failed to fetch or parse feed from ${source.name}:`,
          error
        );
      }
    })
  );

  if (allItems.length === 0) {
    throw new Error("Could not fetch any articles from any feed.");
  }

  // --- Relevance Scoring Logic ---
  // Keywords are checked in lowercase against the article title.
  const relevanceKeywords: { [key: string]: number } = {
    // --- High-Impact Keywords (Models & Concepts) ---
    breakthrough: 20,
    agi: 20, // Artificial General Intelligence
    sora: 18,
    gpt: 18,
    gemini: 15,
    claude: 15,
    llama: 15,
    // --- Medium-Impact Keywords (Companies & Events) ---
    openai: 12,
    deepmind: 12,
    anthropic: 12,
    "new model": 12,
    release: 10,
    announces: 10,
    unveils: 10,
    launch: 10,
    // --- Software Engineering & Tech Trends ---
    "software architecture": 9,
    security: 8,
    devops: 7,
    refactoring: 7,
    microservices: 7,
    // --- Lower-Impact Keywords (General News) ---
    research: 6,
    partnership: 5,
    update: 4,
  };

  const calculateRelevance = (
    item: RssParser.Item & { source: FeedSource }
  ): number => {
    let score = item.source.priority; // Start with the source's base priority
    const title = item.title?.toLowerCase() || "";
    const description = item.content?.toLowerCase() || "";
    const now = new Date();
    const articleDate = item.isoDate ? new Date(item.isoDate) : now;
    const ageInHours = (now.getTime() - articleDate.getTime()) / 1000 / 60 / 60;

    // Time-decay factor: Full score for the first 24 hours, then decays
    const timeDecayFactor = Math.max(0, 1 - (ageInHours - 24) / (7 * 24)); // Decay over a week
    score *= timeDecayFactor;

    for (const keyword in relevanceKeywords) {
      if (title.includes(keyword)) {
        score += relevanceKeywords[keyword];
      }
      if (description.includes(keyword)) {
        score += relevanceKeywords[keyword] * 0.5; // Lower weight for description
      }
    }
    return score;
  };

  // Score and sort all combined articles
  const scoredItems = allItems.map((item) => ({
    ...item,
    relevanceScore: calculateRelevance(item),
  }));

  scoredItems.sort((a, b) => {
    // First, sort by relevance score in descending order
    if (a.relevanceScore !== b.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    // As a tie-breaker, sort by date in descending order (newer is better)
    const dateA = a.isoDate ? new Date(a.isoDate) : new Date(0);
    const dateB = b.isoDate ? new Date(b.isoDate) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  const mostRelevantArticle = scoredItems[0];

  if (
    !mostRelevantArticle ||
    !mostRelevantArticle.link ||
    !mostRelevantArticle.title
  ) {
    throw new Error("Could not determine the most relevant article.");
  }

  console.log(
    `Found most relevant article (Score: ${mostRelevantArticle.relevanceScore}) from "${mostRelevantArticle.source.name}": "${mostRelevantArticle.title}"`
  );

  return {
    title: mostRelevantArticle.title,
    url: mostRelevantArticle.link,
    source: mostRelevantArticle.source,
  };
}

/**
 * Scrapes the main content from a given article URL.
 * @param url The URL of the article to scrape.
 * @param selector The CSS selector for the main content container.
 * @param maxLength Optional. The maximum character length for the returned content.
 * @returns The scraped text content of the article.
 */
async function scrapeArticleContent(
  url: string,
  selector: string,
  maxLength?: number
): Promise<string> {
  console.log(`Scraping content from: ${url}`);
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const articleText = $(selector).text();
  const cleanedText = articleText.replace(/\s\s+/g, " ").trim();

  if (maxLength && cleanedText.length > maxLength) {
    // Truncate the string to the maximum length
    let truncatedText = cleanedText.substring(0, maxLength);
    // Avoid cutting a word in half by finding the last space.
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");
    if (lastSpaceIndex > -1) {
      truncatedText = truncatedText.substring(0, lastSpaceIndex);
    }
    return `${truncatedText}...`;
  }

  return cleanedText;
}

export async function getMostRelevantArticle(): Promise<Article> {
  const MAX_CONTENT_LENGTH = 2000; // Limit content to reduce tokens for the AI.
  const { title, url, source } = await getMostRelevantArticleInfo();
  const content = await scrapeArticleContent(
    url,
    source.scraperSelector,
    MAX_CONTENT_LENGTH
  );
  return { title, url, content, sourceName: source.name };
}
