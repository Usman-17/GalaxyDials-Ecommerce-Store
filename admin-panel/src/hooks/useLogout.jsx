import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout/admin", {
          method: "POST",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to logout account");
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      // navigate("/login");
      toast.success("Logout successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: () => {
      toast.error("Logout Failed");
    },
  });

  return { logoutMutation };
};

export default useLogout;
