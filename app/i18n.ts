import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "ELEVATE YOUR STYLE",
        luxury: "Luxury Streetwear",
        premium: "Premium hoodies crafted for modern streetwear lovers.",
        featured: "Featured Drops",
        community: "Staylik Community",
        instagram: "Instagram Showcase",
        reviews: "What People Say",
        review1: "Best hoodie quality I've ever bought.",
review2: "Fast shipping and premium feel.",
review3: "The oversized fit is literally perfect.",
        cart: "Your Cart",
        empty: "Your cart is empty.",
        subtotal: "Subtotal",
        shipping: "Shipping",
        total: "Total",
        checkout: "Checkout",
        addtocart: "Add To Cart",
        buy: "Buy",
      },
    },

    ar: {
      translation: {
        welcome: "ارتقِ بأناقتك",
        luxury: "ملابس ستريت وير فاخرة",
        premium: "هوديات فاخرة مصممة لعشاق الأناقة العصرية.",
        featured: "أحدث المنتجات",
        community: "مجتمع ستايليك",
        instagram: "معرض الانستغرام",
        reviews: "ماذا يقول الناس",
        review1: "أفضل جودة هودي اشتريتها.",
review2: "شحن سريع وخامة فخمة جدًا.",
review3: "الـ Oversized ممتاز بشكل رهيب.",
        cart: "سلة المشتريات",
        empty: "السلة فارغة.",
        subtotal: "المجموع",
        shipping: "الشحن",
        total: "الإجمالي",
        checkout: "الدفع",
        addtocart: "أضف للسلة",
        buy: "شراء",
      },
    },
  },

  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;