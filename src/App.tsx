import React, { useState, useEffect } from 'react';
import { 
  SiteSettings, 
  TrackingPixels, 
  ProductItem, 
  Member, 
  CustomerOrder, 
  SymptomCategory, 
  UserRole 
} from './types';
import { 
  getStoredSettings, 
  saveStoredSettings, 
  getStoredTracking, 
  saveStoredTracking, 
  getStoredProducts, 
  saveStoredProducts, 
  getStoredMembers, 
  saveStoredMembers, 
  getStoredOrders, 
  saveStoredOrders, 
  getCurrentUser, 
  saveCurrentUser, 
  clearCurrentUser, 
  injectTrackingPixels 
} from './utils/storage';
// Components
import { Header } from './components/common/Header';
import { HeroSection } from './components/landing/HeroSection';
import { DynamicSymptomSection } from './components/landing/DynamicSymptomSection';
import { WhyChooseSection } from './components/landing/WhyChooseSection';
import { VideoEducationSection } from './components/landing/VideoEducationSection';
import { ProductCatalogSection } from './components/landing/ProductCatalogSection';
import { TestimonialSection } from './components/landing/TestimonialSection';
import { Footer } from './components/common/Footer';
import { FloatingActionButtons } from './components/common/FloatingActionButtons';
import { VisualProofGallery } from './components/landing/VisualProofGallery';
import { ToastNotification, ToastData } from './components/common/ToastNotification';
import { LiveActivityFeed } from './components/common/LiveActivityFeed';
import { SHIPPING_PARCEL_IMAGE, PRODUCT_REAL_IMAGE } from './data/initialData';

// Modals
import { FlyerShowcaseModal } from './components/landing/FlyerShowcaseModal';
import { OrderModal } from './components/landing/OrderModal';
import { LoginModal } from './components/admin/LoginModal';
import { MemberRegistrationModal } from './components/affiliate/MemberRegistrationModal';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MemberDashboard } from './components/affiliate/MemberDashboard';

export default function App() {
  // App States
  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings);
  const [tracking, setTracking] = useState<TrackingPixels>(getStoredTracking);
  const [products, setProducts] = useState<ProductItem[]>(getStoredProducts);
  const [members, setMembers] = useState<Member[]>(getStoredMembers);
  const [orders, setOrders] = useState<CustomerOrder[]>(getStoredOrders);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  // Dynamic Symptom State
  const [currentSymptom, setCurrentSymptom] = useState<SymptomCategory>('semua');

  // Affiliate Ref State
  const [activeAffiliate, setActiveAffiliate] = useState<Member | null>(null);

  // Modals
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isSuperAdminOpen, setIsSuperAdminOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isMemberDashboardOpen, setIsMemberDashboardOpen] = useState<boolean>(false);
  
  // Order Modal
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<ProductItem | null>(null);

  // Flyer Zoom Modal
  const [flyerModalState, setFlyerModalState] = useState<{ isOpen: boolean; title: string; category: string }>({
    isOpen: false,
    title: '',
    category: 'semua'
  });

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (toastData: Omit<ToastData, 'id'>) => {
    const newToast: ToastData = {
      ...toastData,
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    };
    setToasts((prev) => [newToast, ...prev]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Smooth scroll helper
  const scrollToProducts = () => {
    const el = document.getElementById('produk');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedProductForOrder(products[0]);
    }
  };

  // Initialization & URL Param check
  useEffect(() => {
    // Inject pixels
    injectTrackingPixels(tracking);

    // Parse URL params
    const searchParams = new URLSearchParams(window.location.search);
    const refCode = searchParams.get('ref');
    const keluhanParam = searchParams.get('keluhan');
    const isCheckoutParam = searchParams.get('checkout') === 'true';

    if (refCode) {
      const found = members.find(
        (m) => m.username.toLowerCase() === refCode.toLowerCase() || m.customSlug.toLowerCase() === refCode.toLowerCase()
      );
      if (found) {
        setActiveAffiliate(found);
      }
    }

    if (keluhanParam && ['jantung', 'hipertensi', 'kolesterol', 'sendi_tulang', 'diabetes', 'lambung', 'stroke_otak', 'paru_respirasi', 'ibu_anak', 'semua'].includes(keluhanParam)) {
      setCurrentSymptom(keluhanParam as SymptomCategory);
      setTimeout(() => {
        const elem = document.getElementById('keluhan');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

    // Returning from consultation back to website to checkout
    if (isCheckoutParam) {
      setSelectedProductForOrder(products[0]);
    }
  }, []);

  const handleSelectSymptom = (sym: SymptomCategory) => {
    setCurrentSymptom(sym);
    sessionStorage.setItem('hi_omega_quiz_answered', 'true');
    // Scroll smoothly to dynamic symptom section
    setTimeout(() => {
      const elem = document.getElementById('keluhan');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleOpenDashboardByRole = () => {
    if (currentUser.role === 'SUPERADMIN') {
      setIsSuperAdminOpen(true);
    } else if (currentUser.role === 'ADMIN') {
      setIsAdminOpen(true);
    } else if (currentUser.role === 'MEMBER') {
      setIsMemberDashboardOpen(true);
    }
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser({ role: 'GUEST', username: '', fullName: 'Tamu' });
    setIsSuperAdminOpen(false);
    setIsAdminOpen(false);
    setIsMemberDashboardOpen(false);
  };

  // Logged-in member details
  const loggedInMemberData = currentUser.role === 'MEMBER' 
    ? members.find(m => m.username === currentUser.username || m.id === currentUser.memberId) || members[0]
    : null;

  return (
    <div className="min-h-screen flex flex-col font-sans transition-all duration-300 text-lg md:text-xl">
      {/* Header */}
      <Header
        currentSymptom={currentSymptom}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        activeAffiliate={activeAffiliate}
        settings={settings}
        currentRole={currentUser.role}
        onOpenDashboard={handleOpenDashboardByRole}
        onLogout={handleLogout}
        onScrollToProducts={scrollToProducts}
      />

      {/* Hero Section */}
      <HeroSection
        currentSymptom={currentSymptom}
        onScrollToProducts={scrollToProducts}
        settings={settings}
        activeAffiliate={activeAffiliate}
      />

      {/* Dynamic Symptom Section */}
      <DynamicSymptomSection
        onOpenFlyerModal={(title, category) => {
          setFlyerModalState({ isOpen: true, title, category });
        }}
        onScrollToProducts={scrollToProducts}
        settings={settings}
      />

      {/* Why Choose HI-OMEGA Comparison Table Section */}
      <WhyChooseSection onScrollToProducts={scrollToProducts} />

      {/* Video Education Section */}
      <VideoEducationSection
        settings={settings}
        activeAffiliate={activeAffiliate}
        onScrollToProducts={scrollToProducts}
      />

      {/* Product Catalog Section */}
      <ProductCatalogSection
        products={products}
        activeAffiliate={activeAffiliate}
        onOpenOrderModal={(p) => setSelectedProductForOrder(p)}
        settings={settings}
      />

      {/* Visual Proof & Authentic Gallery - High image presence, minimal text */}
      <VisualProofGallery onScrollToProducts={scrollToProducts} />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Footer */}
      <Footer
        settings={settings}
        activeAffiliate={activeAffiliate}
        onOpenLogin={() => setIsLoginOpen(true)}
        onScrollToProducts={scrollToProducts}
      />

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        settings={settings}
        activeAffiliate={activeAffiliate}
        onScrollToProducts={scrollToProducts}
      />

      {/* Social Proof Live Activity Feed (Bottom-Left) */}
      <LiveActivityFeed />

      {/* Highly Visible Toast Notification System (Top-Center) */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />

      {/* MODALS */}
      {/* 1. Flyer Zoom Modal */}
      <FlyerShowcaseModal
        isOpen={flyerModalState.isOpen}
        onClose={() => setFlyerModalState({ ...flyerModalState, isOpen: false })}
        title={flyerModalState.title}
        category={flyerModalState.category}
        settings={settings}
        onOrderNow={() => setSelectedProductForOrder(products[0])}
      />

      {/* 2. Order Checkout Modal */}
      <OrderModal
        isOpen={!!selectedProductForOrder}
        onClose={() => setSelectedProductForOrder(null)}
        product={selectedProductForOrder}
        settings={settings}
        activeAffiliate={activeAffiliate}
        currentSymptom={currentSymptom}
        onOrderSuccess={(order) => {
          setOrders((prev) => [order, ...prev]);
          const firstItem = order.items[0];
          const productLabel = firstItem ? `${firstItem.productName} (${firstItem.qty} Botol)` : 'Paket HI-OMEGA';
          addToast({
            type: 'order_success',
            title: '🎉 Pesanan Berhasil Diterima!',
            subtitle: `${order.customerName} - ${productLabel}`,
            order: order,
            image: SHIPPING_PARCEL_IMAGE,
            duration: 12000
          });
        }}
      />

      {/* 3. Login Gate */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        members={members}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'SUPERADMIN') setIsSuperAdminOpen(true);
          else if (user.role === 'ADMIN') setIsAdminOpen(true);
          else if (user.role === 'MEMBER') setIsMemberDashboardOpen(true);
        }}
        onSwitchToRegister={() => setIsRegisterOpen(true)}
      />

      {/* 4. Member Registration Modal */}
      <MemberRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={(newMem) => {
          setMembers((prev) => [newMem, ...prev]);
          addToast({
            type: 'member_success',
            title: '🎉 Pendaftaran Member Berhasil!',
            subtitle: `${newMem.fullName} (@${newMem.username}) - Paket Perdana 5 Botol Siap Diproses`,
            member: newMem,
            image: PRODUCT_REAL_IMAGE,
            duration: 12000
          });
        }}
        settings={settings}
      />

      {/* 6. SuperAdmin Dashboard */}
      {isSuperAdminOpen && (
        <SuperAdminDashboard
          settings={settings}
          onUpdateSettings={setSettings}
          tracking={tracking}
          onUpdateTracking={setTracking}
          products={products}
          onUpdateProducts={setProducts}
          members={members}
          onUpdateMembers={setMembers}
          orders={orders}
          onUpdateOrders={setOrders}
          onClose={() => setIsSuperAdminOpen(false)}
        />
      )}

      {/* 7. Admin Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          products={products}
          onUpdateProducts={setProducts}
          members={members}
          onUpdateMembers={setMembers}
          settings={settings}
          onUpdateSettings={setSettings}
          orders={orders}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* 8. Member Dashboard */}
      {isMemberDashboardOpen && loggedInMemberData && (
        <MemberDashboard
          member={loggedInMemberData}
          onUpdateMember={(updated) => {
            setMembers((prev) => prev.map(m => m.id === updated.id ? updated : m));
          }}
          products={products}
          settings={settings}
          onClose={() => setIsMemberDashboardOpen(false)}
        />
      )}
    </div>
  );
}
