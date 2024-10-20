import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to logout account");
      }
    },

    onSuccess: () => {
      toast.success("Logged out successfully!");
      queryClient.invalidateQueries(["authUser"]);
      navigate("/");
    },

    onError: (error) => {
      toast.error(`Logout failed: ${error.message}`);
    },
  });

  return { logoutMutation };
};

export default useLogout;
