import { lazy, Suspense, useContext, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

import HomePage from "./pages/HomePage";
import { AppContext } from "./context/AppContext";
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const PlaceOrderPage = lazy(() => import("./pages/PlaceOrderPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/Auth/SignupPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/Auth/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPasswordPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
// imports End

const App = () => {
  const { products, productIsLoading } = useContext(AppContext);

  // fetch Authentication User Data
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (productIsLoading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <PreLoader />
      </div>
    );
  }

  // Scroll to Top Component
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <div className="px-4 sm:px-[5vw] md:px-[3vw] lg:px-[3vw]">
      <BrowserRouter>
        <ScrollToTop />
        <Header products={products} />

        <Suspense
          fallback={
            <div className="min-h-[100vh] flex items-center justify-center">
              <PreLoader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/place-order" element={<PlaceOrderPage />} />
            <Route path="/my-orders" element={<OrdersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Auth */}
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignupPage /> : <Navigate to="/" />}
            />

            <Route
              path="/forgot-password"
              element={
                !authUser ? <ForgotPasswordPage /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/reset-password/:token"
              element={
                !authUser ? <ResetPasswordPage /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Suspense>

        <Toaster
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fffbfb",
              fontFamily: "outfit",
              fontSize: "14px",
            },
          }}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
