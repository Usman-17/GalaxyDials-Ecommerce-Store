import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { useQuery } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";

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
