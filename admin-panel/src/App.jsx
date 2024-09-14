import "./App.scss";

import { Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";

import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
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
      </Routes>

      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fffbfb",
            fontFamily: "poppins",
            fontSize: "13px",
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
