import { SiteSettings, TrackingPixels, ProductItem, Member, CustomerOrder, UserRole } from '../types';
import { INITIAL_SETTINGS, INITIAL_TRACKING, INITIAL_PRODUCTS, INITIAL_MEMBERS } from '../data/initialData';

const SETTINGS_KEY = 'hi_omega_settings_v1';
const TRACKING_KEY = 'hi_omega_tracking_v1';
const PRODUCTS_KEY = 'hi_omega_products_v1';
const MEMBERS_KEY = 'hi_omega_members_v1';
const ORDERS_KEY = 'hi_omega_orders_v1';
const USER_KEY = 'hi_omega_current_user_v1';

export function getStoredSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return INITIAL_SETTINGS;
    const parsed = JSON.parse(raw);
    // If old images were unsplash placeholders, upgrade to authentic photos
    if (parsed.images?.productMainUrl?.includes('unsplash.com')) {
      parsed.images.productMainUrl = INITIAL_SETTINGS.images.productMainUrl;
      parsed.images.productBoxUrl = INITIAL_SETTINGS.images.productBoxUrl;
      parsed.images.heroBannerUrl = INITIAL_SETTINGS.images.heroBannerUrl;
      parsed.images.carouselImages = INITIAL_SETTINGS.images.carouselImages;
    }
    return { ...INITIAL_SETTINGS, ...parsed };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveStoredSettings(settings: SiteSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getStoredTracking(): TrackingPixels {
  try {
    const raw = localStorage.getItem(TRACKING_KEY);
    if (!raw) return INITIAL_TRACKING;
    return { ...INITIAL_TRACKING, ...JSON.parse(raw) };
  } catch {
    return INITIAL_TRACKING;
  }
}

export function saveStoredTracking(tracking: TrackingPixels): void {
  localStorage.setItem(TRACKING_KEY, JSON.stringify(tracking));
  injectTrackingPixels(tracking);
}

export function getStoredProducts(): ProductItem[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) return INITIAL_PRODUCTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Map and replace any old unsplash placeholder with real images
      return parsed.map((item: ProductItem) => {
        const defaultMatch = INITIAL_PRODUCTS.find(p => p.id === item.id);
        if (defaultMatch && (item.image?.includes('unsplash.com') || !item.image)) {
          return { ...item, image: defaultMatch.image };
        }
        return item;
      });
    }
    return INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: ProductItem[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getStoredMembers(): Member[] {
  try {
    const raw = localStorage.getItem(MEMBERS_KEY);
    if (!raw) return INITIAL_MEMBERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MEMBERS;
  } catch {
    return INITIAL_MEMBERS;
  }
}

export function saveStoredMembers(members: Member[]): void {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

export function getStoredOrders(): CustomerOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredOrders(orders: CustomerOrder[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addCustomerOrder(order: CustomerOrder): void {
  const orders = getStoredOrders();
  orders.unshift(order);
  saveStoredOrders(orders);

  // Update member sales if affiliateRef exists
  if (order.affiliateRef) {
    const members = getStoredMembers();
    const targetIdx = members.findIndex(m => m.username === order.affiliateRef || m.customSlug === order.affiliateRef);
    if (targetIdx !== -1) {
      const totalPcs = order.items.reduce((acc, it) => acc + it.qty, 0);
      members[targetIdx].totalSoldPcs += totalPcs;
      members[targetIdx].totalCommissionRp += (order.affiliateProfit || 0);
      saveStoredMembers(members);
    }
  }

  // Deduct product stock
  const products = getStoredProducts();
  order.items.forEach(it => {
    const pIdx = products.findIndex(p => p.id === it.productId);
    if (pIdx !== -1) {
      products[pIdx].stock = Math.max(0, products[pIdx].stock - it.qty);
    }
  });
  saveStoredProducts(products);
}

export interface CurrentUserSession {
  role: UserRole;
  username: string;
  fullName: string;
  memberId?: string;
  memberSlug?: string;
  whatsapp?: string;
}

export function getCurrentUser(): CurrentUserSession {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return { role: 'GUEST', username: '', fullName: 'Tamu Pengunjung' };
    return JSON.parse(raw);
  } catch {
    return { role: 'GUEST', username: '', fullName: 'Tamu Pengunjung' };
  }
}

export function saveCurrentUser(user: CurrentUserSession): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(USER_KEY);
}

/**
 * Safely injects tracking scripts / pixels into the document head
 */
export function injectTrackingPixels(tracking: TrackingPixels): void {
  if (typeof document === 'undefined') return;

  // Remove existing custom injection containers
  const existing = document.getElementById('hi-omega-tracking-container');
  if (existing) {
    existing.remove();
  }

  const container = document.createElement('div');
  container.id = 'hi-omega-tracking-container';
  container.style.display = 'none';

  // Helper to extract script and execute safely
  const appendSnippet = (snippet: string) => {
    if (!snippet || !snippet.trim()) return;
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = snippet;
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        container.appendChild(newScript);
      });
    } catch (e) {
      console.warn('Error injecting pixel snippet:', e);
    }
  };

  tracking.metaHtmlSnippets.forEach(appendSnippet);
  tracking.googleHtmlSnippets.forEach(appendSnippet);
  tracking.tiktokHtmlSnippets.forEach(appendSnippet);
  tracking.gtmHtmlSnippets.forEach(appendSnippet);
  tracking.gaHtmlSnippets.forEach(appendSnippet);

  document.head.appendChild(container);
}
