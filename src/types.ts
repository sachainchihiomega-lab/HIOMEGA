export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST';

export type SymptomCategory = 
  | 'jantung'
  | 'hipertensi'
  | 'kolesterol'
  | 'sendi_tulang'
  | 'diabetes'
  | 'lambung'
  | 'stroke_otak'
  | 'paru_respirasi'
  | 'ibu_anak'
  | 'semua';

export type ColorTheme = 'emerald' | 'ocean' | 'gold' | 'herbal';
export type AppLanguage = 'id' | 'en';

export interface TrackingPixels {
  metaPixelIds: string[];
  metaHtmlSnippets: string[];
  googlePixelIds: string[];
  googleHtmlSnippets: string[];
  tiktokPixelIds: string[];
  tiktokHtmlSnippets: string[];
  gtmIds: string[];
  gtmHtmlSnippets: string[];
  gaIds: string[];
  gaHtmlSnippets: string[];
}

export interface SeoSettings {
  title: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogImageUrl: string;
  focusKeywords: string[];
  schemaMarkupJson: string;
}

export interface SiteImages {
  logoUrl: string;
  heroBannerUrl: string;
  productMainUrl: string;
  productBoxUrl: string;
  carouselImages: string[];
  footerImageUrl: string;
}

export interface SiteSettings {
  theme: ColorTheme;
  language: AppLanguage;
  backgroundMusicEnabled: boolean;
  backgroundMusicVolume: number;
  selectedMusicTrack: 'herbal_zen' | 'gentle_breeze' | 'deep_vitality';
  memberRegistrationEnabled: boolean;
  captchaEnabled: boolean;
  csWhatsapp: string;
  csName: string;
  officialAddress: string;
  seo: SeoSettings;
  images: SiteImages;
}

export interface ProductItem {
  id: string;
  name: string;
  subName: string;
  pillCount: number;
  weightGrams: number;
  retailPrice: number;
  affiliateBasePrice: number;
  promoPrice?: number;
  stock: number;
  description: string;
  keyBenefits: string[];
  badge?: string;
  image: string;
  isPopular?: boolean;
}

export interface Member {
  id: string;
  username: string;
  fullName: string;
  whatsapp: string;
  email: string;
  city?: string;
  totalOrders?: number;
  customSlug: string;
  customPricePerBottle: number; // member can set retail price (e.g. 100000 - 150000)
  status: 'active' | 'pending' | 'suspended';
  initialOrderPcs: number; // min 5 pcs (Rp 350.000)
  totalSoldPcs: number;
  totalCommissionRp: number;
  bankName: string;
  bankAccountNumber: string;
  bankAccountHolder: string;
  registeredAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  qty: number;
  pricePerUnit: number;
  totalPrice: number;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerWhatsapp: string;
  destinationProvince: string;
  destinationCity: string;
  addressDetails: string;
  courier: string;
  shippingCost: number;
  items: OrderItem[];
  subtotal: number;
  grandTotal: number;
  affiliateRef?: string;
  affiliateProfit?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface ContentAsset {
  id: string;
  title: string;
  category: 'flyer' | 'copywriting' | 'video' | 'edukasi';
  description: string;
  imageUrl?: string;
  copyText?: string;
  downloadUrl?: string;
  tags: string[];
}
