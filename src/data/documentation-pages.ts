export interface DocPageContent {
  title: string;
  description: string;
  breadcrumb: string[];
  sections: DocPageSection[];
}

export interface DocPageSection {
  id: string;
  title: string;
  level: "h2" | "h3";
  content: string;
  listItems?: string[];
  orderedList?: boolean;
}

export const documentationPages: Record<string, DocPageContent> = {
  overview: {
    title: "Overview",
    description: "Get a high-level understanding of the Compass platform and its core capabilities.",
    breadcrumb: ["Getting Started", "Overview"],
    sections: [
      {
        id: "what-is-compass",
        title: "What is Compass?",
        level: "h2",
        content: "Compass is a modern payment infrastructure platform designed to simplify how businesses handle transactions, subscriptions, and financial operations. Built with developers in mind, it provides powerful APIs and intuitive dashboards."
      },
      {
        id: "core-features",
        title: "Core Features",
        level: "h2",
        content: "Explore the fundamental capabilities that make Compass the preferred choice for modern businesses:",
        listItems: [
          "Unified payment processing across multiple providers",
          "Subscription management with flexible billing cycles",
          "Real-time analytics and reporting",
          "Developer-friendly APIs with comprehensive SDKs",
          "Enterprise-grade security and compliance"
        ]
      },
      {
        id: "architecture",
        title: "Platform Architecture",
        level: "h2",
        content: "Compass is built on a microservices architecture that ensures reliability, scalability, and performance. Each component is designed to handle millions of transactions while maintaining sub-second response times."
      },
      {
        id: "getting-help",
        title: "Getting Help",
        level: "h2",
        content: "If you need assistance, our support team is available 24/7. You can also explore our community forums, developer documentation, and video tutorials for self-service help."
      }
    ]
  },
  workspace: {
    title: "Set Up Your Workspace",
    description: "Learn how to configure your workspace for optimal collaboration and productivity.",
    breadcrumb: ["Getting Started", "Set Up Your Workspace"],
    sections: [
      {
        id: "workspace-basics",
        title: "Workspace Basics",
        level: "h2",
        content: "A workspace is your team's home in Compass. It contains all your projects, team members, API keys, and settings. Each workspace operates independently with its own billing and access controls."
      },
      {
        id: "creating-workspace",
        title: "Creating a Workspace",
        level: "h2",
        content: "Follow these steps to create your first workspace:",
        listItems: [
          "Click 'Create Workspace' from the dashboard",
          "Enter a descriptive name for your workspace",
          "Select your primary region for data residency",
          "Choose your billing plan (you can upgrade later)",
          "Invite team members with appropriate roles"
        ],
        orderedList: true
      },
      {
        id: "workspace-settings",
        title: "Workspace Settings",
        level: "h2",
        content: "Customize your workspace to match your team's workflow. Configure branding, default currencies, notification preferences, and integration settings from the workspace admin panel."
      },
      {
        id: "team-management",
        title: "Team Management",
        level: "h3",
        content: "Add team members and assign roles based on their responsibilities. Available roles include Owner, Admin, Developer, and Viewer. Each role has specific permissions that control access to features and data."
      }
    ]
  },
  sandbox: {
    title: "Sandbox vs. Production",
    description: "Understand the differences between sandbox and production environments.",
    breadcrumb: ["Getting Started", "Sandbox vs. Production"],
    sections: [
      {
        id: "understanding-environments",
        title: "Understanding Environments",
        level: "h2",
        content: "Compass provides two separate environments for development and live operations. Each environment has its own API keys, data, and configurations to ensure safe testing without affecting real customers."
      },
      {
        id: "sandbox-environment",
        title: "Sandbox Environment",
        level: "h2",
        content: "The sandbox is your testing playground. Use it to:",
        listItems: [
          "Test payment flows without real money",
          "Simulate various card scenarios (success, decline, errors)",
          "Develop and debug integrations safely",
          "Train team members on the platform",
          "Validate webhooks and event handling"
        ]
      },
      {
        id: "production-environment",
        title: "Production Environment",
        level: "h2",
        content: "Production handles real transactions with real customers. Before going live, ensure you've completed all compliance requirements and thoroughly tested your integration in sandbox."
      },
      {
        id: "switching-environments",
        title: "Switching Between Environments",
        level: "h3",
        content: "Toggle between sandbox and production using the environment switcher in the dashboard header. Your API keys and data are completely separate between environments for security."
      }
    ]
  },
  "account-setup": {
    title: "Account Setup",
    description: "Learn how to set up your account and configure your workspace for optimal use.",
    breadcrumb: ["Getting Started", "Account Setup"],
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        level: "h2",
        content: "Welcome to the Compass Help Center. This guide will walk you through the essential steps to set up your account and get started with the platform. Whether you're new to Compass or migrating from another tool, this documentation covers everything you need."
      },
      {
        id: "creating-your-account",
        title: "Creating Your Account",
        level: "h2",
        content: "Setting up your Compass account takes just a few minutes. Follow the steps below to create your account and join or create a workspace for your team."
      },
      {
        id: "sign-up-process",
        title: "Sign-up Process",
        level: "h3",
        content: "Complete these steps to create your account:",
        listItems: [
          "Navigate to the Compass sign-up page and click 'Create Account'",
          "Enter your email address and create a strong password",
          "Choose whether to create a new workspace or join an existing one",
          "Complete the captcha verification to confirm you're human",
          "Click 'Continue' to proceed to email verification"
        ],
        orderedList: true
      },
      {
        id: "account-verification",
        title: "Account Verification",
        level: "h3",
        content: "After signing up, you'll receive a verification email. Click the link in the email to verify your account. Verification links expire after 24 hours. If your link has expired, you can request a new one from the sign-in page."
      },
      {
        id: "security-setup",
        title: "Security Setup",
        level: "h2",
        content: "Protecting your account and data is crucial. Compass offers multiple layers of security including two-factor authentication, session management, and activity logging."
      },
      {
        id: "two-factor-auth",
        title: "Two-Factor Authentication",
        level: "h3",
        content: "Enable 2FA for enhanced security:",
        listItems: [
          "Navigate to Settings → Security → Two-Factor Authentication",
          "Choose your preferred method: authenticator app or SMS",
          "Scan the QR code with your authenticator app",
          "Enter the verification code to confirm setup",
          "Save your backup codes in a secure location"
        ],
        orderedList: true
      }
    ]
  },
  features: {
    title: "Key Features",
    description: "Discover the powerful features that make Compass stand out.",
    breadcrumb: ["Getting Started", "Key Features"],
    sections: [
      {
        id: "feature-overview",
        title: "Feature Overview",
        level: "h2",
        content: "Compass provides a comprehensive suite of tools designed to handle every aspect of your payment infrastructure. From simple one-time payments to complex subscription models, we've got you covered."
      },
      {
        id: "payment-processing",
        title: "Payment Processing",
        level: "h2",
        content: "Accept payments from customers worldwide with support for multiple payment methods:",
        listItems: [
          "Credit and debit cards (Visa, Mastercard, Amex, Discover)",
          "Digital wallets (Apple Pay, Google Pay, PayPal)",
          "Bank transfers and ACH payments",
          "Local payment methods by region",
          "Cryptocurrency (Beta)"
        ]
      },
      {
        id: "subscription-billing",
        title: "Subscription Billing",
        level: "h2",
        content: "Manage recurring revenue with our flexible subscription engine. Create plans with custom billing cycles, handle upgrades and downgrades, prorate charges, and automate dunning for failed payments."
      },
      {
        id: "analytics-dashboard",
        title: "Analytics Dashboard",
        level: "h2",
        content: "Gain insights into your business with real-time analytics. Track revenue, monitor churn, analyze customer behavior, and export reports for stakeholders."
      },
      {
        id: "developer-tools",
        title: "Developer Tools",
        level: "h3",
        content: "Build integrations quickly with our developer-friendly tools:",
        listItems: [
          "RESTful APIs with comprehensive documentation",
          "Official SDKs for major programming languages",
          "Webhooks for real-time event notifications",
          "CLI tools for local development and testing",
          "Postman collections for API exploration"
        ]
      }
    ]
  },
  coupons: {
    title: "Coupons & Discounts",
    description: "Create and manage promotional coupons to drive customer acquisition and retention.",
    breadcrumb: ["Products & Subscriptions", "Coupons & Discounts"],
    sections: [
      {
        id: "coupon-basics",
        title: "Coupon Basics",
        level: "h2",
        content: "Coupons are powerful marketing tools that help you attract new customers and reward loyal ones. Compass supports percentage-based and fixed-amount discounts with flexible redemption rules."
      },
      {
        id: "creating-coupons",
        title: "Creating Coupons",
        level: "h2",
        content: "Create a new coupon with these steps:",
        listItems: [
          "Navigate to Products → Coupons → Create Coupon",
          "Enter a unique coupon code (or auto-generate one)",
          "Choose discount type: percentage or fixed amount",
          "Set the discount value and applicable products",
          "Configure usage limits and expiration date"
        ],
        orderedList: true
      },
      {
        id: "coupon-restrictions",
        title: "Coupon Restrictions",
        level: "h2",
        content: "Control how coupons are used with restriction settings:",
        listItems: [
          "Limit total redemptions across all customers",
          "Restrict to one use per customer",
          "Apply minimum purchase requirements",
          "Limit to specific products or plans",
          "Set date ranges for validity"
        ]
      },
      {
        id: "tracking-performance",
        title: "Tracking Performance",
        level: "h3",
        content: "Monitor coupon effectiveness in the analytics dashboard. Track redemption rates, revenue impact, and customer acquisition costs to optimize your promotional strategy."
      }
    ]
  },
  pricing: {
    title: "Pricing Models",
    description: "Explore different pricing strategies and how to implement them in Compass.",
    breadcrumb: ["Products & Subscriptions", "Pricing Models"],
    sections: [
      {
        id: "pricing-strategies",
        title: "Pricing Strategies",
        level: "h2",
        content: "Choose the pricing model that best fits your business. Compass supports various pricing strategies to maximize revenue and customer satisfaction."
      },
      {
        id: "flat-rate",
        title: "Flat-Rate Pricing",
        level: "h2",
        content: "Charge a fixed amount for your product or service. Simple and predictable for both you and your customers. Ideal for standardized offerings with consistent value delivery."
      },
      {
        id: "tiered-pricing",
        title: "Tiered Pricing",
        level: "h2",
        content: "Offer multiple plans at different price points. Each tier includes a specific set of features, allowing customers to choose based on their needs and budget."
      },
      {
        id: "usage-based",
        title: "Usage-Based Pricing",
        level: "h2",
        content: "Charge based on consumption metrics like API calls, storage, or active users. This model aligns costs with value and scales naturally with customer growth."
      },
      {
        id: "hybrid-models",
        title: "Hybrid Models",
        level: "h3",
        content: "Combine base subscription fees with usage-based charges. This provides predictable recurring revenue while capturing additional value from heavy users."
      }
    ]
  },
  products: {
    title: "Creating a Product",
    description: "Learn how to create and configure products in your Compass catalog.",
    breadcrumb: ["Products & Subscriptions", "Creating a Product"],
    sections: [
      {
        id: "product-setup",
        title: "Product Setup",
        level: "h2",
        content: "Products are the foundation of your Compass catalog. Each product represents something you sell, whether it's a subscription, one-time purchase, or usage-based service."
      },
      {
        id: "create-product",
        title: "Create a Product",
        level: "h2",
        content: "Follow these steps to create a new product:",
        listItems: [
          "Navigate to Products → Create Product",
          "Enter a name and description",
          "Add product images and metadata",
          "Configure pricing and billing options",
          "Set up tax settings if applicable",
          "Publish the product when ready"
        ],
        orderedList: true
      },
      {
        id: "product-variants",
        title: "Product Variants",
        level: "h2",
        content: "Create variants for products with different options like size, color, or duration. Each variant can have its own price, SKU, and inventory settings."
      },
      {
        id: "product-metadata",
        title: "Product Metadata",
        level: "h3",
        content: "Add custom metadata to products for internal tracking or integration purposes. Metadata is stored as key-value pairs and can be retrieved via the API."
      }
    ]
  },
  subscriptions: {
    title: "Subscriptions",
    description: "Manage recurring billing and subscription lifecycles effectively.",
    breadcrumb: ["Products & Subscriptions", "Subscriptions"],
    sections: [
      {
        id: "subscription-overview",
        title: "Subscription Overview",
        level: "h2",
        content: "Subscriptions enable recurring revenue by automatically charging customers at regular intervals. Compass handles the complexity of billing cycles, proration, and payment retries."
      },
      {
        id: "creating-subscriptions",
        title: "Creating Subscriptions",
        level: "h2",
        content: "Set up a subscription for a customer:",
        listItems: [
          "Select a customer or create a new one",
          "Choose the product and pricing plan",
          "Set the billing cycle start date",
          "Add any applicable coupons or discounts",
          "Configure trial period if applicable",
          "Confirm and activate the subscription"
        ],
        orderedList: true
      },
      {
        id: "subscription-lifecycle",
        title: "Subscription Lifecycle",
        level: "h2",
        content: "Understand the subscription states: active, past due, canceled, and paused. Each state triggers different behaviors and webhook events for your integration."
      },
      {
        id: "plan-changes",
        title: "Upgrades & Downgrades",
        level: "h3",
        content: "Handle plan changes smoothly with automatic proration. When a customer upgrades, they're charged the difference immediately. Downgrades take effect at the next billing cycle."
      }
    ]
  },
  "failed-payments": {
    title: "Failed Payments",
    description: "Handle payment failures and recover revenue with smart dunning strategies.",
    breadcrumb: ["Products & Subscriptions", "Failed Payments"],
    sections: [
      {
        id: "understanding-failures",
        title: "Understanding Payment Failures",
        level: "h2",
        content: "Payment failures happen for various reasons: expired cards, insufficient funds, or bank declines. Understanding why payments fail helps you implement effective recovery strategies."
      },
      {
        id: "common-failure-reasons",
        title: "Common Failure Reasons",
        level: "h2",
        content: "The most frequent causes of payment failures include:",
        listItems: [
          "Expired or invalid card information",
          "Insufficient funds in the account",
          "Card reported lost or stolen",
          "Bank fraud prevention blocks",
          "Exceeded credit limit",
          "Technical issues with payment network"
        ]
      },
      {
        id: "dunning-management",
        title: "Dunning Management",
        level: "h2",
        content: "Compass automatically retries failed payments based on your dunning schedule. Configure retry intervals, email notifications, and grace periods to maximize recovery rates."
      },
      {
        id: "customer-communication",
        title: "Customer Communication",
        level: "h3",
        content: "Keep customers informed with automated emails when payments fail. Customize email templates and include direct links for customers to update their payment methods."
      },
      {
        id: "recovery-strategies",
        title: "Recovery Strategies",
        level: "h3",
        content: "Implement proven strategies to recover failed payments:",
        listItems: [
          "Send timely email reminders with payment links",
          "Offer alternative payment methods",
          "Provide grace periods before cancellation",
          "Use smart retry timing based on failure reason",
          "Consider offering temporary discounts to retain customers"
        ]
      }
    ]
  },
  encryption: {
    title: "Security & Encryption",
    description: "Learn about our security measures and how we protect your data.",
    breadcrumb: ["Security", "Security & Encryption"],
    sections: [
      {
        id: "security-overview",
        title: "Security Overview",
        level: "h2",
        content: "Security is at the core of everything we do. Compass employs multiple layers of protection to ensure your data and your customers' information remain safe at all times."
      },
      {
        id: "data-encryption",
        title: "Data Encryption",
        level: "h2",
        content: "All data is encrypted both in transit and at rest:",
        listItems: [
          "TLS 1.3 for all API communications",
          "AES-256 encryption for stored data",
          "Hardware security modules (HSM) for key management",
          "Regular key rotation policies",
          "End-to-end encryption for sensitive fields"
        ]
      },
      {
        id: "compliance",
        title: "Compliance & Certifications",
        level: "h2",
        content: "Compass maintains industry-leading certifications and compliance standards:",
        listItems: [
          "PCI DSS Level 1 certified",
          "SOC 2 Type II compliant",
          "GDPR compliant",
          "CCPA compliant",
          "ISO 27001 certified"
        ]
      },
      {
        id: "access-controls",
        title: "Access Controls",
        level: "h2",
        content: "Implement granular access controls with role-based permissions. Restrict team member access to specific features, data, and environments based on job responsibilities."
      },
      {
        id: "audit-logging",
        title: "Audit Logging",
        level: "h3",
        content: "Every action in Compass is logged for accountability. View detailed audit trails showing who did what and when, helping you maintain compliance and investigate issues."
      }
    ]
  }
};

// Helper function to generate table of contents from page sections
export function generateTableOfContents(pageId: string) {
  const page = documentationPages[pageId];
  if (!page) return [];
  
  return page.sections.map(section => ({
    id: section.id,
    title: section.title,
    level: section.level
  }));
}
