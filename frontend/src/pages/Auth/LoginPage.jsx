import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Imports End

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ email, password });
  };

  const togglePassword = () => setIsShow(!isShow);

  return (
    <div className="flex justify-center items-center py-24 sm:py-8">
      <div className="w-full max-w-sm bg-white px-4 py-8 rounded">
        <div className="grid gap-2 text-center mb-7">
          <h1 className="text-4xl font-bold">Login</h1>
          <p className="text-sm px-6 text-gray-500">
            Enter your email and password below to access your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-base font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              id="email"
              required
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label className="block text-base font-semibold text-gray-700">
                Password
              </label>

              <Link
                to={"/forgot-password"}
                className="ml-auto inline-block text-sm font-semibold hover:text-blue-600 hover:underline transition duration-75 ease-in-out"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="relative">
              <input
                type={isShow ? "text" : "password"}
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 mb-3"
              />

              <div
                onClick={togglePassword}
                className="absolute top-6 right-5 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700"
              >
                {password && (
                  <>{isShow ? <Eye size={18} /> : <EyeOff size={18} />}</>
                )}
              </div>
            </div>
          </div>

          {/* Login & Signup Button */}
          <div className="flex items-center justify-between gap-3 flex-col">
            {/* Login */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full text-white bg-gray-950 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition"
            >
              {isPending ? <LoadingSpinner content="Logging in..." /> : "Login"}
            </button>

            {/* Signup */}
            <Link
              to="/signup"
              className="w-full text-gray-800 border border-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
