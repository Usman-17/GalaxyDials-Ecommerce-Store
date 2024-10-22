import "./App.scss";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";

import Dashboard from "./pages/Dashboard";
const UsersPage = lazy(() => import("./pages/UsersPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProductListPage = lazy(() => import("./pages/ProductListPage"));
const AddProductPage = lazy(() => import("./pages/AddProductPage"));
// imports End

const App = () => {
  // fetch Authentication User Data
  const { data: authUser, isLoading } = useQuery({
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      {authUser && (
        <>
          <SideBar />
          <Header />
        </>
      )}

      <Suspense
        fallback={
          <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            index
            element={authUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={authUser ? <UsersPage /> : <Navigate to="/login" />}
          />

          <Route
            path="product/add"
            element={authUser ? <AddProductPage /> : <Navigate to="/login" />}
          />
          <Route
            path="product/edit/:id"
            element={authUser ? <AddProductPage /> : <Navigate to="/login" />}
          />
          <Route
            path="product/manage"
            element={authUser ? <ProductListPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>

      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fffbfb",
            fontFamily: "poppins",
            fontSize: "12px",
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
