import React from "react";
import { Dropdown, Space, Avatar, Menu } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const userMenu = (
  <Menu>
    <Menu.Item key="profile" icon={<ProfileOutlined />} onClick={() => console.log("Profil utilisateur")}>
      Profil
    </Menu.Item>
    <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => console.log("Paramètres utilisateur")}>
      Paramètres
    </Menu.Item>
    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => console.log("Déconnexion utilisateur")}>
      Déconnexion
    </Menu.Item>
  </Menu>
);

const AppHeader = () => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(75, 67, 150, 1)",
        padding: "0 16px",
        height: 64,
      }}
    >
      <div style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>
        Gestion Commerciale
      </div>
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <Space style={{ cursor: "pointer", color: "#fff" }}>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </Dropdown>
    </header>
  );
};

export default AppHeader;
