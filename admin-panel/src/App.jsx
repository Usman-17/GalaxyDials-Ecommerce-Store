import "./App.scss";
import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

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
        <Route path="/users" element={<UsersPage />} />
      </Routes>

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
