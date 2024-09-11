import { Menu } from "antd";
import {
  LucideLayoutDashboard,
  ClipboardList,
  User,
  PackageSearch,
  MailSearch,
  LogOut,
  ListOrdered,
} from "lucide-react";
// imports End

const menuItems = [
  {
    key: "/",
    icon: <LucideLayoutDashboard size={20} />,
    label: "Dashboard",
  },
  {
    key: "orders",
    icon: <ClipboardList size={20} />,
    label: "Orders",
  },
  {
    key: "customers",
    icon: <User size={20} />,
    label: "Customers",
  },
  {
    key: "products",
    icon: <PackageSearch size={20} />,
    label: "Products",
    children: [
      {
        key: "products/add",
        icon: <PackageSearch size={22} />,
        label: "Add Product",
      },
      {
        key: "products/list",
        icon: <ListOrdered size={22} />,
        label: "Product List",
      },
    ],
  },

  {
    key: "enquiries",
    icon: <MailSearch size={20} />,
    label: "Enquiries",
  },
];

const SideBar = () => {
  return (
    <div className="side-bar d-flex flex-column h-100">
      <div className="logo d-flex align-items-center justify-content-around">
        <h2>SaraShop</h2>
      </div>
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

      <div className="divider" />
      <div className="logout-button d-flex align-items-center py-2 gap-2 ml-5">
        <LogOut size={20} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
