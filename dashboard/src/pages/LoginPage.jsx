import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginPage = () => {
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.error || "Login failed. Please try again.");
      } catch (error) {
        throw new Error(error.message || "Login failed. Please try again.");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },

    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md sm:p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-base text-gray-500 px-20 sm:px-8">
            Enter your email and password below to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Email */}
          <div className="grid">
            <label htmlFor="email" className="text-base font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              autoComplete="email"
              className="border border-gray-300 px-2 py-2 rounded text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="grid">
            <label htmlFor="password" className="text-base font-medium">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={isShow ? "text" : "password"}
                required
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full border border-gray-300 px-2 py-2 rounded text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {password && (
                <div
                  role="button"
                  aria-label={isShow ? "Hide password" : "Show password"}
                  tabIndex={0}
                  onClick={() => setIsShow(!isShow)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-black"
                >
                  {isShow ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-3">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition cursor-pointer select-none"
              disabled={isPending}
            >
              {isPending ? <LoadingSpinner content="Logging in..." /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
