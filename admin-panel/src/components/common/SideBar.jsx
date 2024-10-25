import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LucideLayoutDashboard,
  ClipboardList,
  User,
  MailSearch,
  LogOut,
  Box,
  ShoppingBag,
  ImagePlus,
} from "lucide-react";
import useLogout from "../../hooks/useLogout";
// imports End

const menuItems = [
  {
    key: "/",
    icon: <LucideLayoutDashboard size={20} />,
  },
  {
    key: "orders",
    icon: <ClipboardList size={20} />,
  },
  {
    key: "users",
    icon: <User size={20} />,
  },
  {
    key: "product/add",
    icon: <ShoppingBag size={20} />,
  },

  {
    key: "enquiries",
    icon: <MailSearch size={20} />,
  },
  {
    key: "banners/add",
    icon: <ImagePlus size={20} />,
  },
];

const SideBar = () => {
  const { logoutMutation } = useLogout();
  const navigate = useNavigate();
  return (
    <div className="side-bar d-flex flex-column h-100">
      <Link
        to={"/"}
        className="logo d-flex align-items-center justify-content-between"
      >
        <div>
          <Box className="text-white" size={22} />
        </div>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[""]}
        items={menuItems}
        onClick={({ key }) => {
          navigate(key);
        }}
        className="flex-grow-1"
      />

      <div onClick={() => logoutMutation()} className="logout-button mb-2">
        <LogOut size={20} />
      </div>
    </div>
  );
};

export default SideBar;
