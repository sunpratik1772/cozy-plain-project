export interface ChangelogSection {
  title: string;
  items: string[];
  code?: {
    lines: string[];
  };
}

export interface ChangelogBadge {
  variant: "features" | "improvements" | "fixes";
  label: string;
}

export interface ChangelogEntryData {
  date: string;
  badges: ChangelogBadge[];
  sections: ChangelogSection[];
}

export const changelogData: ChangelogEntryData[] = [
  {
    date: "Nov 9, 2025",
    badges: [
      { variant: "fixes", label: "Fixes" },
      { variant: "improvements", label: "Improvements" },
    ],
    sections: [
      {
        title: "Search Experience Updates",
        items: [
          "Introduced search_filters field in the results response (category, date, relevance).",
          "Added query_suggestions to auto-complete user searches.",
          "The x-search-score header is now available in search response callbacks.",
        ],
      },
      {
        title: "Documentation Upgrades",
        items: [
          "Documentation now supports version_history to track changes.",
          "You can update article_status directly via the dashboard.",
          "Added review_period_days for smoother content approval flows.",
        ],
      },
      {
        title: "API Enhancements",
        items: [
          "The article_id is now returned in all webhook payloads.",
          "You can now pass the x-preview-mode header to view draft articles.",
          "The content.pdf field is now included in GET /articles responses.",
        ],
      },
    ],
  },
  {
    date: "Nov 4, 2025",
    badges: [
      { variant: "features", label: "New Features" },
      { variant: "improvements", label: "Improvements" },
    ],
    sections: [
      {
        title: "Dashboard Upgrades",
        items: [
          "Dark mode toggle is now available under Settings > Preferences.",
          "Export buttons now include csv, xlsx, and json formats.",
          "The new quick_filters sidebar helps you find articles faster.",
        ],
      },
      {
        title: "Developer Tools",
        items: [
          "The x-api-key header has been standardized across API endpoints.",
          "help-cli now supports environment variables with HELPCENTER_ENV.",
          "Updated API error codes: E-404 is now ARTICLE_NOT_FOUND.",
        ],
      },
    ],
  },
  {
    date: "Oct 5, 2025",
    badges: [
      { variant: "fixes", label: "Fixes" },
      { variant: "features", label: "New Features" },
    ],
    sections: [
      {
        title: "New Content Request Features",
        items: [
          "Added support for public and private content request submissions.",
          "Content links now include ?utm_source parameters for tracking.",
          "Enhanced article pages with bookmark and share button support.",
        ],
      },
      {
        title: "API Enhancements",
        items: [
          "The article_id is now returned in all webhook payloads.",
          "You can now pass the x-preview-mode header to view draft content.",
          "The export.pdf field is now included in GET /exports responses.",
        ],
        code: {
          lines: [
            "POST /api/v1/content-requests",
            "{",
            '  "title": "Getting Started Guide",',
            '  "category": "tutorials",',
            '  "type": "public"',
            "}",
          ],
        },
      },
      {
        title: "Search Detection Improvements",
        items: [
          "Introduced relevance_score field in the search response (low, medium, high).",
          "Added user_preferences to session tracking for personalization.",
          "The x-search-rank header is now available in search callbacks.",
        ],
      },
      {
        title: "Content Category Upgrades",
        items: [
          "Categories now support nested_levels to organize subcategories.",
          "You can update category_order directly via the API.",
          "Added archive_after_days for automatic content archival flows.",
        ],
      },
    ],
  },
  {
    date: "Sep 19, 2025",
    badges: [
      { variant: "improvements", label: "Improvements" },
      { variant: "fixes", label: "Fixes" },
    ],
    sections: [
      {
        title: "Enhanced Export Controls",
        items: [
          "Added support for scheduled exports (daily, weekly, or monthly).",
          "Introduced export holds for content under review.",
          "Improved multi-format linking for faster switching between export types.",
        ],
      },
      {
        title: "Analytics Dashboard Improvements",
        items: [
          "New Article Views metric added.",
          "Enhanced filtering by user cohort and content category.",
          "Reports can now be exported as PDF in addition to CSV & Excel.",
        ],
      },
      {
        title: "Developer Updates",
        items: [
          "Added new Articles Search API endpoint.",
          "Improved rate limiting with clearer error messages.",
          "Webhook retry logic now supports exponential backoff.",
        ],
      },
    ],
  },
  {
    date: "Sep 4, 2025",
    badges: [
      { variant: "features", label: "New Features" },
      { variant: "improvements", label: "Improvements" },
    ],
    sections: [
      {
        title: "New Features",
        items: [
          "Multi-Language Support: You can now publish content in multiple languages (EN, ES, FR).",
          "Added automatic language detection based on user browser settings.",
          "Option to set a default content language in account settings.",
        ],
      },
      {
        title: "Improvements",
        items: [
          "Enhanced failed search retries: system will now attempt 3 retries within 7 seconds.",
          "Optimized analytics dashboard for faster load times.",
        ],
      },
      {
        title: "Fixes",
        items: [
          "Fixed an issue where draft articles incorrectly appeared in search results.",
          "Resolved a bug causing view reports to show duplicated entries.",
        ],
      },
    ],
  },
];
