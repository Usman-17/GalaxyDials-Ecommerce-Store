import { Menu, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LucideLayoutDashboard,
  ClipboardList,
  User,
  MailSearch,
  LogOut,
  Box,
  ShoppingBag,
  Bold,
  Sparkle,
} from "lucide-react";
import useLogout from "../../hooks/useLogout";
// imports End

const menuItems = [
  {
    key: "/",
    icon: <LucideLayoutDashboard size={20} />,
    title: "Dashboard",
  },
  {
    key: "orders",
    icon: <ClipboardList size={20} />,
    title: "Orders",
  },
  {
    key: "users",
    icon: <User size={20} />,
    title: "Users",
  },
  {
    key: "product/add",
    icon: <ShoppingBag size={20} />,
    title: "Add Products",
  },

  {
    key: "enquiries",
    icon: <MailSearch size={20} />,
    title: "Enquiries",
  },
  {
    key: "brand/add",
    icon: <Bold size={20} />,
    title: "Brand",
  },
  {
    key: "category/add",
    icon: <Sparkle size={20} />,
    title: "Category",
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
        className="flex-grow-1"
      >
        {menuItems.map(({ key, icon, title }) => (
          <Menu.Item
            key={key}
            onClick={() => navigate(key)}
            icon={
              <Tooltip placement="right" title={title} color="geekblue">
                {icon}
              </Tooltip>
            }
          />
        ))}
      </Menu>

      <div onClick={() => logoutMutation()} className="logout-button mb-2">
        <Tooltip placement="right" title="Logout" color="#geekblue">
          <LogOut size={20} />
        </Tooltip>
      </div>
    </div>
  );
};

export default SideBar;
