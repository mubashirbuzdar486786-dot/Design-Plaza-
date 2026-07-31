import { ExtraService } from '../types';

export const EXTRA_SERVICES: ExtraService[] = [
  {
    id: 'addon-extra-pages',
    title: 'Extra Custom Pages (Permanent)',
    description: 'Add additional custom-designed, fully responsive pages with lifetime code ownership.',
    includes: ['Custom Page Design', 'Mobile Responsive', 'SEO Ready', 'Permanent Source Code'],
    startingPrice: 249,
    deliveryTime: 'Permanent',
    category: 'Design & Structure',
    iconName: 'FileText'
  },
  {
    id: 'addon-logo-design',
    title: 'Logo & Brand Identity (Permanent)',
    description: 'Get a modern, professional business logo with full commercial trademark rights.',
    includes: ['3 Logo Concepts', 'PNG', 'SVG Vector', 'Transparent Background', 'Commercial License'],
    startingPrice: 349,
    deliveryTime: 'Permanent',
    category: 'Branding & Graphics',
    iconName: 'Palette'
  },
  {
    id: 'addon-branding-kit',
    title: 'Full Business Branding Kit (Permanent)',
    description: 'Complete permanent brand identity kit for your company.',
    includes: ['Logo Master Kit', 'Brand Colors', 'Typography Suite', 'Business Cards', 'Brand Guidelines'],
    startingPrice: 599,
    deliveryTime: 'Permanent',
    category: 'Branding & Graphics',
    iconName: 'Sparkles'
  },
  {
    id: 'addon-website-maintenance',
    title: 'Monthly Website Care & Security Package',
    description: 'Complete automated backup, security shield, and system hardening setup with ongoing care.',
    includes: ['Automated Backups', 'Security Shield', 'Malware Firewall', 'Performance Tuning', 'Monthly Maintenance'],
    startingPrice: 899,
    priceSuffix: '/mo',
    deliveryTime: 'Monthly',
    category: 'Care & Security',
    iconName: 'ShieldCheck'
  },
  {
    id: 'addon-seo-service',
    title: 'Monthly SEO Foundation & Rank Package',
    description: 'Comprehensive high-ranking SEO architecture with monthly on-page & schema optimization.',
    includes: ['Keyword Architecture', 'Technical SEO Suite', 'Schema Markup', 'On-Page Optimization', 'Monthly Rank Reports'],
    startingPrice: 699,
    priceSuffix: '/mo',
    deliveryTime: 'Monthly',
    category: 'SEO & Growth',
    iconName: 'TrendingUp'
  },
  {
    id: 'addon-content-writing',
    title: 'Professional SEO Content Writing (Permanent)',
    description: 'High-converting, permanent SEO copy for your entire website.',
    includes: ['Homepage Copy', 'About Page Story', 'Service Copy', 'Landing Pages', 'Full Copy Rights'],
    startingPrice: 349,
    deliveryTime: 'Permanent',
    category: 'Content & Copy',
    iconName: 'PenTool'
  },
  {
    id: 'addon-blog-writing',
    title: 'Monthly Blog System & Article Package',
    description: 'Complete blog engine with monthly SEO optimized articles and ongoing management.',
    includes: ['Blog Engine Integration', 'Monthly SEO Articles', 'Featured Images', 'Internal Linking', 'Content Management'],
    startingPrice: 499,
    priceSuffix: '/mo',
    deliveryTime: 'Monthly',
    category: 'Content & Copy',
    iconName: 'BookOpen'
  },
  {
    id: 'addon-google-business',
    title: 'Google Business Profile Setup (Permanent)',
    description: 'Create and permanently optimize your Google Business Profile for local search dominance.',
    includes: ['Business Verification', 'Geo Categories', 'HD Media Upload', 'Google Maps Sync', 'Permanent Listing'],
    startingPrice: 199,
    deliveryTime: 'Permanent',
    category: 'Local Marketing',
    iconName: 'MapPin'
  },
  {
    id: 'addon-social-media',
    title: 'Social Media Profiles Setup (Permanent)',
    description: 'Professional social media profile design and permanent branding setup across major platforms.',
    includes: ['Facebook Page', 'Instagram Business', 'LinkedIn Company', 'X (Twitter) Profile'],
    startingPrice: 249,
    deliveryTime: 'Permanent',
    category: 'Social Marketing',
    iconName: 'Share2'
  },
  {
    id: 'addon-ai-chatbot',
    title: 'Permanent AI Chatbot Engine',
    description: 'Custom trained AI-powered assistant integrated directly into your website with no recurring fees.',
    includes: ['Smart FAQ Bot', 'Automated Lead Capture', 'Custom Knowledge Base', 'Direct Email Alerts'],
    startingPrice: 800,
    deliveryTime: 'Permanent',
    category: 'AI & Automation',
    iconName: 'Bot'
  },
  {
    id: 'addon-live-chat',
    title: 'Live Chat Integration (Permanent)',
    description: 'Permanent real-time visitor chat system with mobile notification sync and instant lead alerts.',
    includes: ['Real-time Visitor Chat', 'Mobile App Push Alerts', 'Instant Lead Capture', 'Lifetime License'],
    startingPrice: 249,
    deliveryTime: 'Permanent',
    category: 'Customer Support',
    iconName: 'MessageCircle'
  },
  {
    id: 'addon-email-marketing',
    title: 'Automated Email Marketing System (Permanent)',
    description: 'Permanent self-hosted email automation and newsletter dispatch system.',
    includes: ['Automated Sequences', 'Custom HTML Templates', 'Subscriber Lead Forms', 'Permanent Setup'],
    startingPrice: 349,
    deliveryTime: 'Permanent',
    category: 'Marketing Automation',
    iconName: 'Mail'
  },
  {
    id: 'addon-multilingual',
    title: 'Multilingual Engine (Permanent)',
    description: 'Multi-language translation engine integrated directly into your website code.',
    includes: ['Instant Language Switcher', 'SEO Friendly URLs', 'Translation System', 'Permanent Code'],
    startingPrice: 399,
    deliveryTime: 'Permanent',
    category: 'Global Reach',
    iconName: 'Languages'
  },
  {
    id: 'addon-google-analytics',
    title: 'GA4 Analytics & Conversion Setup',
    description: 'Google Analytics 4 tracking with automated conversion event triggers and monthly monitoring.',
    includes: ['GA4 Suite Setup', 'Custom Conversion Events', 'Funnel Tracking', 'Monthly Analytics Reports'],
    startingPrice: 189,
    priceSuffix: '/mo',
    deliveryTime: 'Monthly',
    category: 'Analytics & Data',
    iconName: 'BarChart3'
  },
  {
    id: 'addon-search-console',
    title: 'Google Search Console & Indexing',
    description: 'Google Search Console setup, priority XML sitemap indexing and monthly rank monitoring.',
    includes: ['XML Sitemap Submission', 'Google Priority Indexing', 'Search Performance Setup', 'Monthly Diagnostic Check'],
    startingPrice: 149,
    priceSuffix: '/mo',
    deliveryTime: 'Monthly',
    category: 'Analytics & Data',
    iconName: 'Search'
  },
  {
    id: 'addon-speed-optimization',
    title: 'Monthly Speed Optimization Engine',
    description: 'Turbocharge your website loading speed with 95+ Core Web Vitals score optimization and monthly tuning.',
    includes: ['Asset Compression', 'Browser Caching Suite', 'Code Minification', 'Monthly Performance Check'],
    startingPrice: 299,
    priceSuffix: '/mo',
    deliveryTime: 'Monthly',
    category: 'Performance',
    iconName: 'Zap'
  },
  {
    id: 'addon-security-optimization',
    title: 'Monthly Firewall & Security Hardening',
    description: 'Enterprise-grade firewall shield, SSL certificate, malware protection and monthly audits.',
    includes: ['SSL Certificate', 'Web Application Firewall', 'Security Headers', 'Monthly Malware Scan'],
    startingPrice: 299,
    priceSuffix: '/mo',
    deliveryTime: 'Monthly',
    category: 'Care & Security',
    iconName: 'Lock'
  },
  {
    id: 'addon-payment-gateway',
    title: 'Payment Gateway Integration (Permanent)',
    description: 'Accept online payments securely via Stripe, PayPal, and Apple Pay with no monthly app fees.',
    includes: ['Stripe Integration', 'PayPal Checkout', 'Apple Pay / Credit Card', 'Secure Checkout Engine'],
    startingPrice: 349,
    deliveryTime: 'Permanent',
    category: 'Ecommerce & Pay',
    iconName: 'CreditCard'
  },
  {
    id: 'addon-booking-system',
    title: 'Booking & Appointment System (Permanent)',
    description: 'Interactive online booking calendar and client appointment engine with direct lifetime ownership.',
    includes: ['Interactive Calendar Widget', 'Auto Email Confirmations', 'Timezone Sync', 'Staff Management'],
    startingPrice: 449,
    deliveryTime: 'Permanent',
    category: 'Integrations',
    iconName: 'Calendar'
  },
  {
    id: 'addon-ecommerce-store',
    title: 'Full E-commerce Store Engine (Permanent)',
    description: 'Complete high-converting online shopping cart and product management system.',
    includes: ['Product Catalog', 'Shopping Cart Drawer', 'Checkout Flow', 'Orders Dashboard', 'Full Code Ownership'],
    startingPrice: 899,
    deliveryTime: 'Permanent',
    category: 'Ecommerce & Pay',
    iconName: 'ShoppingCart'
  }
];
