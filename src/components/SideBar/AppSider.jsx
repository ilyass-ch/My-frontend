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
import { Menu, theme, Layout } from "antd";

const { Sider } = Layout;

const services = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "Utilisateurs",
    onClick: () => console.log("SideBarel à userService"),
  },
  {
    key: "product",
    icon: <ShoppingOutlined />,
    label: "Produits",
    onClick: () => console.log("SideBarel à productService"),
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
  {
    key: "Dashboard",
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
];

const AppSider = () => {
  const [collapsed, setCollapsed] = useState(true); // État pour gérer l'affichage du Sider
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMouseEnter = () => setCollapsed(false); // Afficher le Sider lors du survol
  const handleMouseLeave = () => setCollapsed(true); // Fermer le Sider lorsque le curseur s'éloigne

  return (
    <Sider
      width={170}
      style={{ background: colorBgContainer }}
      collapsed={collapsed}
      onMouseEnter={handleMouseEnter} // Événement au survol
      onMouseLeave={handleMouseLeave} // Événement au retrait du survol
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["user"]}
        style={{ height: "100%", borderRight: 0 }}
        items={services.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          onClick: item.onClick,
        }))}
      />
    </Sider>
  );
};

export default AppSider;
