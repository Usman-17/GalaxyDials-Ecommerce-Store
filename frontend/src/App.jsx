import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useGetAllProducts } from "./hooks/useGetAllProducts";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrdersPage from "./pages/OrdersPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import { useQuery } from "@tanstack/react-query";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
// imports End

const App = () => {
  const { products, isLoading } = useGetAllProducts();

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

  if (isLoading) {
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
        <Routes>
          <Route
            path="/"
            element={<HomePage products={products} isLoading={isLoading} />}
          />
          <Route
            path="/collection"
            element={
              <CollectionPage products={products} isLoading={isLoading} />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductPage products={products} isLoading={isLoading} />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/place-order" element={<PlaceOrderPage />} />
          <Route path="/my-orders" element={<OrdersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

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
        </Routes>
        <Footer />

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
      </BrowserRouter>
    </div>
  );
};

export default App;
