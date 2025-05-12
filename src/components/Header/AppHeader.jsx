import React from "react";
import { Dropdown, Space, Avatar, Menu } from "antd";
import { logout } from "../../features/auth/login/LoginSlice";
import {
  UserOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AppHeader = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();


    const handleLogout = () => {
    // Supprimer les données de l'utilisateur du localStorage
    localStorage.clear();
    // Réinitialiser l'état dans Redux
    dispatch(logout());
    // Rediriger l'utilisateur vers la page de connexion
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item
        key="profile"
        icon={<ProfileOutlined />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="settings"
        icon={<SettingOutlined />}
        onClick={() => console.log("Paramètres utilisateur")}
      >
        Paramètres
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() =>{
        handleLogout();
      }}
      >
        Déconnexion
      </Menu.Item>
    </Menu>
  );

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
