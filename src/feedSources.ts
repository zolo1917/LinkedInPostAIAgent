export interface FeedSource {
  name: string;
  rssUrl: string;
  scraperSelector: string;
  priority: number; // Higher is more important
}

export const feedSources: FeedSource[] = [
  {
    name: "Google AI Blog",
    rssUrl: "https://blog.google/technology/ai/rss/",
    scraperSelector: ".p-article-body-inner",
    priority: 9,
  },
  {
    name: "Microsoft AI Blog",
    rssUrl: "https://blogs.microsoft.com/ai/feed/",
    scraperSelector: ".entry-content", // A common selector for WordPress blogs
    priority: 8,
  },
  {
    name: "Ars Technica",
    rssUrl: "http://feeds.arstechnica.com/arstechnica/index/",
    scraperSelector: ".article-content",
    priority: 6,
  },
  {
    name: "Wired",
    rssUrl: "https://www.wired.com/feed/rss",
    scraperSelector: `div[data-testid="ArticleBodyWrapper"]`,
    priority: 5,
  },
  {
    name: "The Verge",
    rssUrl: "https://www.theverge.com/rss/index.xml",
    scraperSelector: `div[class*="article-body"]`, // Catches dynamic class names
    priority: 4,
  },
  {
    name: "Martin Fowler",
    rssUrl: "https://martinfowler.com/feed.atom",
    scraperSelector: "section.main-content",
    priority: 7, // High-quality software design content
  },
  // {
  //   name: "Scott Hanselman",
  //   rssUrl: "https://www.hanselman.com/blog/rss",
  //   scraperSelector: ".blog-body",
  //   priority: 6,
  // },
  {
    name: "Coding Horror (Jeff Atwood)",
    rssUrl: "https://blog.codinghorror.com/rss/",
    scraperSelector: ".blog-body",
    priority: 5,
  },
];
