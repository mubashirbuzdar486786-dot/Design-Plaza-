export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type CategoryNiche =
  | 'All'
  | 'Architecture & Real Estate'
  | 'Restaurant & Dining'
  | 'Healthcare & Medical'
  | 'SaaS & Tech AI'
  | 'Real Estate'
  | 'Fitness & Gym'
  | 'Beauty & Salon'
  | 'Law & Legal'
  | 'Fashion & Retail'
  | 'Finance & Crypto'
  | 'Construction'
  | 'Dental Clinic'
  | 'Interior Design'
  | 'Automotive'
  | 'Hotel & Hospitality'
  | 'Ecommerce'
  | 'Education & University'
  | 'Photography & Creative'
  | 'Travel & Tourism'
  | 'Logistics & Freight'
  | 'Barber & Men Grooming'
  | 'Jewelry & Luxury'
  | 'Solar & Energy'
  | 'Coffee & Bakery'
  | 'NGO & Non-Profit';

export interface TemplateDemo {
  id: string;
  title: string;
  subtitle: string;
  niche: CategoryNiche;
  badge?: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  deliveryDays: number;
  animationLevel: 'Ultra 3D' | 'High Fluid' | 'Cinematic' | 'Interactive Canvas';
  techStack: string[];
  thumbnail: string;
  heroImage: string;
  galleryImages: string[];
  demoUrlName: string;
  description: string;
  keyFeatures: string[];
  includedPages: string[];
  has3dViewer?: boolean;
  featured?: boolean;
  accentColor: string;
}

export interface ExtraService {
  id: string;
  title: string;
  description: string;
  includes: string[];
  startingPrice: number;
  priceSuffix?: string;
  deliveryTime: string;
  category: string;
  iconName: string;
}

export interface BookingData {
  templateId: string;
  templateTitle: string;
  price: number;
  clientName: string;
  email: string;
  phone: string;
  businessName: string;
  customDomainNeeded: boolean;
  seoPackageNeeded: boolean;
  expressDelivery: boolean;
  selectedAddons?: ExtraService[];
  preferredDate?: string;
  notes?: string;
}

export interface CustomQuoteData {
  clientName: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  budgetRange: string;
  timeline: string;
  requiredPages: string[];
  referenceLinks: string;
  description: string;
}

export interface AiRecommendationRequest {
  businessName: string;
  industry: string;
  goals: string;
  targetAudience: string;
  budget: string;
  desiredVibe: string;
}

export interface AiRecommendationResponse {
  suggestedNiche: string;
  suggestedStyle: string;
  recommendedDemoId: string;
  recommendedTechStack: string[];
  keyFeatures: string[];
  reasoning: string;
}
