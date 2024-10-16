import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrdersPage from "./pages/OrdersPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { useGetAllProducts } from "./hooks/useGetAllProducts";
// imports End

const App = () => {
  const { products, isLoading } = useGetAllProducts();

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
        <Header />
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
