import SectionHeading from "../components/SectionHeading";
import { Users, ShieldCheck } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SummaryCard from "../components/SummaryCard";
import UsersSkeleton from "../components/Skeletons/UsersSkeleton";
import { useGetAllUsers } from "../hooks/useGetAllUsers";

const UsersPage = () => {
  const queryClient = useQueryClient();

  // Fetch all users
  const { users = [], isLoading } = useGetAllUsers();

  // Mutation to update user role
  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await fetch(`/api/user/role/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error("Failed to update role");
      return res.json();
    },

    onSuccess: () => {
      toast.success("User role updated successfully.");
      queryClient.invalidateQueries(["users"]);
    },

    onError: () => {
      toast.error("Failed to update role");
    },
  });

  const handleRoleChange = (id, role) => {
    mutation.mutate({ id, role });
  };

  const totalUsers = users.filter((u) => u.role === "user").length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;

  return (
    <>
      <SectionHeading
        title="Users List"
        subtitle="Manage all registered users below"
      />

      {isLoading ? (
        <UsersSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <SummaryCard
              icon={Users}
              title="Total Users"
              count={totalUsers}
              color="#3B82F6"
            />

            <SummaryCard
              icon={ShieldCheck}
              title="Total Admins"
              count={totalAdmins}
              color="#10B981"
            />
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto rounded-xl shadow bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-2 sm:px-6 py-4 text-left text-nowrap">
                    Sr No.
                  </th>
                  <th className="px-2 sm:px-6 py-4 text-left">Name</th>
                  <th className="px-2 sm:px-6 py-4 text-left">Email</th>
                  <th className="px-2 sm:px-6 py-4 text-left">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.slice(1).map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 sm:px-10 py-4 font-medium text-gray-800">
                      {index + 1}
                    </td>

                    <td className="px-2 sm:px-6 py-4 text-nowrap">
                      {user.fullName}
                    </td>

                    <td className="px-2 sm:px-6 py-4">{user.email}</td>

                    <td className="px-2 sm:px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className={`cursor-pointer border rounded px-2 py-1 text-sm shadow-sm transition outline-none  ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700 border-green-400"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default UsersPage;
