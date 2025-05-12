import React, { useState } from "react";
import {
  UserOutlined,
  ShoppingOutlined,
  ProfileOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  LineChartOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { Menu, theme, Layout } from "antd";

const { Sider } = Layout;

const AppSider = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.roles?.includes('admin');

  const services = [
    {
      key: "user",
      icon: <UserOutlined />,
      label: "Utilisateurs",
      onmouseenter: () => console.log("SideBarel à userService"),
    },
    {
      key: "product",
      icon: <ShoppingOutlined />,
      label: "Produits",
      children: [
        {
          key: "product-list",
          label: "Liste Produits",
          onClick: () => navigate("/products"),
        },
        {
          key: "categories",
          label: "Catégories",
          onClick: () => navigate("/categories"),
        },
        isAdmin && {
          key: "stock",
          label: "Stock",
          onClick: () => navigate("/admin/products"),
        },
      ].filter(Boolean), // Supprime les `false` si pas admin
    },
    {
      key: "order",
      icon: <ProfileOutlined />,
      label: "Commandes",
      onClick: () => console.log("SideBarel à orderService"),
    },
    {
      key: "payment",
      icon: <CreditCardOutlined />,
      label: "Paiements",
      onClick: () => console.log("SideBarel à paymentService"),
    },
    {
      key: "log",
      icon: <FileTextOutlined />,
      label: "Logs",
      onClick: () => console.log("SideBarel à logService"),
    },
    isAdmin && {
      key: "dashboard",
      icon: <LineChartOutlined />,
      label: "Dashboard",
      onClick: () => console.log("SideBarel à analyticService"),
    },
    {
      key: "invoice",
      icon: <FileDoneOutlined />,
      label: "Factures",
      onClick: () => console.log("SideBarel à invoiceService"),
    },
  ].filter(Boolean); // Supprime les entrées false si pas admin

  return (
    <Sider
      width={170}
      style={{ background: colorBgContainer }}
      collapsed={collapsed}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["user"]}
        style={{ height: "100%", borderRight: 0 }}
        items={services}
      />
    </Sider>
  );
};


export default AppSider;
