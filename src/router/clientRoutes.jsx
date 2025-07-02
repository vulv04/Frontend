import HomePage from "../pages/client/HomePage";
import AboutPage from "../pages/client/AboutPage";
import ProfilePage from "../pages/client/ProfilePage";
import ContactPage from "../pages/client/ContactPage";
import FAQPage from "../pages/client/FAQPage";
import TermsPage from "../pages/client/TermsPage";
import PrivacyPage from "../pages/client/PrivacyPage";
import ProductListPage from "../pages/client/ProductListPage";
import ProductDetailPage from "../pages/client/ProductDetailPage";
import CategoryPage from "../pages/client/CategoryPage";
import CartPage from "../pages/client/CartPage";
import CheckoutPage from "../pages/client/CheckoutPage";
import CheckoutSuccessPage from "../pages/client/CheckoutSuccessPage";
import BlogListPage from "../pages/client/BlogListPage";
import BlogDetailPage from "../pages/client/BlogDetailPage";
import OrderPage from "../pages/client/OrderPage";
import WishListProductPage from "../pages/client/WishListProductPage";
import NewsPage from "../pages/client/NewsPage";
import ShopPage from "../pages/client/ShopPage";

export const clientRoutes = [
  // common
  { index: true, element: <HomePage /> },
  { path: "shop", element: <ShopPage /> },
  { path: "about", element: <AboutPage /> },
  { path: "contact", element: <ContactPage /> },
  { path: "faq", element: <FAQPage /> },
  { path: "terms", element: <TermsPage /> },
  { path: "privacy", element: <PrivacyPage /> },
  { path: "news", element: <NewsPage /> },

  // products & categories
  { path: "products", element: <ProductListPage /> },
  { path: "products/:id", element: <ProductDetailPage /> },
  { path: "categories", element: <CategoryPage /> },


  // cart & checkout
  { path: "cart", element: <CartPage /> },
  { path: "checkout", element: <CheckoutPage /> },
  { path: "checkout-success", element: <CheckoutSuccessPage /> },

  // blog
  { path: "blogs", element: <BlogListPage /> },
  { path: "blogs/:slug", element: <BlogDetailPage /> },
  { path: "news", element: <NewsPage /> },

  // user
  { path: "/me/profile/:id", element: <ProfilePage /> },
  { path: "me/orders", element: <OrderPage /> },
  { path: "me/wishlist", element: <WishListProductPage /> },
];
