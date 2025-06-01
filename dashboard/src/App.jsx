import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import OrdersPage from "./pages/OrdersPage";
import EnquiriesPage from "./pages/EnquiriesPage";
import EnquiryDetailsPage from "./pages/EnquiryDetailsPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import CategoryListingPage from "./pages/CategoryListingPage";
import AddBrandPage from "./pages/AddBrandPage";
import BrandListingPage from "./pages/BrandListingPage";
// Imports End

const App = () => {
  // fetch Authentication User Data
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user");
      const data = await res.json();
      if (data.error || !res.ok) return null;
      return data;
    },

    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading && !authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser ? <Layout /> : <LoginPage />}>
          <Route index element={authUser ? <DashboardPage /> : <LoginPage />} />

          {/* Brand Routes */}
          <Route
            path="/brand/create"
            element={authUser ? <AddBrandPage /> : <Navigate to="/login" />}
          />
          <Route
            path="brand/edit/:id"
            element={authUser ? <AddBrandPage /> : <Navigate to="/login" />}
          />
          <Route
            path="brand/manage"
            element={authUser ? <BrandListingPage /> : <Navigate to="/login" />}
          />

          {/* Category Routes */}
          <Route
            path="/category/create"
            element={authUser ? <AddCategoryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="category/edit/:id"
            element={authUser ? <AddCategoryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="category/manage"
            element={
              authUser ? <CategoryListingPage /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/users"
            element={authUser ? <UsersPage /> : <LoginPage />}
          />
          <Route
            path="/orders"
            element={authUser ? <OrdersPage /> : <LoginPage />}
          />

          <Route
            path="/enquiries"
            element={authUser ? <EnquiriesPage /> : <LoginPage />}
          />

          <Route
            path="/enquiries/:id"
            element={
              authUser ? <EnquiryDetailsPage /> : <Navigate to="/login" />
            }
          />
        </Route>

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={!authUser ? <LoginPage /> : <Layout />} />
      </Routes>

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fffbfb",
            fontFamily: "Outfit, sans-serif",
            fontSize: "14px",
            padding: "8px 16px",
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
