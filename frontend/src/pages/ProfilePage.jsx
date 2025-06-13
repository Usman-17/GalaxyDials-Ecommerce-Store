import { useEffect, useRef, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomLabel from "../components/CustomLabel";
import SectionHeading from "../components/SectionHeading";
import LoadingSpinner from "../components/LoadingSpinner";

import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import useGetAuth from "../hooks/useGetAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Imports End

const ProfilePage = () => {
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowConfirmNewPassword, setIsConfirmNewPassword] = useState(false);
  const [profileImgPreview, setProfileImgPreview] = useState("");
  const [formData, setFormData] = useState({
    profileImg: "",
    fullName: "",
    mobile: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const queryClient = useQueryClient();

  const {
    mutateAsync: updateProfile,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const res = await fetch(`/api/auth/profile/update`, {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.error || "Failed to update user profile");

      return data;
    },

    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["authUser"]);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: authUser } = useGetAuth();

  useEffect(() => {
    if (authUser) {
      setFormData({
        profileImg: authUser.profileImg?.url || "",
        fullName: authUser.fullName,
        mobile: authUser.mobile,
        email: authUser.email,
        currentPassword: "",
        newPassword: "",
      });
      setProfileImgPreview(
        authUser.profileImg?.url || "/avatar-placeholder.png"
      );
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const profileImgRef = useRef(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImg: file });
      const reader = new FileReader();
      reader.onload = () => setProfileImgPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPending) {
      updateProfile(formData);
    }
  };

  const toggleCurrentPassword = () =>
    setIsShowCurrentPassword(!isShowCurrentPassword);

  const toggleConfirmPassword = () =>
    setIsConfirmNewPassword(!isShowConfirmNewPassword);

  return (
    <div className="max-w-2xl sm:max-w-xl mx-auto px-2 py-6 sm:py-2">
      <div className="mb-2">
        <SectionHeading text1={"Update"} text2={"Profile"} />
      </div>

      <form className="space-y-1" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div>
          <CustomLabel label="Profile Image" />
          <div
            onClick={() => profileImgRef.current.click()}
            className="mb-4 cursor-pointer"
          >
            <input
              type="file"
              hidden
              accept="image/*"
              ref={profileImgRef}
              onChange={handleImgChange}
            />
            <img
              src={profileImgPreview || "/avatar-placeholder.png"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Name */}
          <div>
            <CustomLabel label="Full Name" />
            <CustomInput
              name="fullName"
              placeholder="Muhammad Usman"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          {/* Mobile */}
          <div>
            <CustomLabel label="Mobile" />
            <CustomInput
              name="mobile"
              placeholder="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              maxLength={11}
              minLength={11}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <CustomLabel label="Email" />
          <CustomInput
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Current Password */}
          <div className="relative">
            <CustomLabel label="Current Password" />
            <CustomInput
              type={isShowCurrentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="••••••••"
              value={formData.currentPassword}
              onChange={handleInputChange}
              required={false}
            />

            <div
              onClick={toggleCurrentPassword}
              className="absolute top-12 right-5 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700"
            >
              {formData.currentPassword && (
                <>
                  {isShowCurrentPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </>
              )}
            </div>
          </div>

          {/* new Password */}
          <div className="relative mb-3 sm:mb-1">
            <CustomLabel label="New Password" />
            <CustomInput
              type={isShowConfirmNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="••••••••"
              value={formData.newPassword}
              onChange={handleInputChange}
              required={false}
            />

            <div
              onClick={toggleConfirmPassword}
              className="absolute top-12 right-5 transform -translate-y-1/2 flex items-center justify-center cursor-pointer text-gray-700 "
            >
              {formData.newPassword && (
                <>
                  {isShowConfirmNewPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-base-300 rounded-xl py-6">
          <h2 className="font-medium text-lg mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>
                {authUser?.createdAt &&
                  new Date(authUser.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>

        {isError && <div className="text-red-500">{error.message}</div>}

        <div className="pb-12">
          <button
            type="submit"
            disabled={isPending}
            className="w-full text-white bg-gray-950 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition"
          >
            {isPending ? (
              <LoadingSpinner content="Updating..." />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
