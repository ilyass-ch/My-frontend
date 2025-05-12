import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import AppHeader from "../Header/AppHeader";
import AppSider from "./AppSider";
import { Outlet, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import 'antd/dist/reset.css';
import "./SideBar.css";

const { Content } = Layout;

const SideBar = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (location.state?.showLoginSuccess) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 1300);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <Layout style={{ padding: "10px 10px" }}>
          <Content
            style={{
              padding: 24,
              marginTop: 5,
              marginRight: 5,
              marginLeft: 5,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              overflow: "auto",
              maxHeight: "calc(100vh - 112px)",
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(83, 61, 224, 0.2) transparent',
              msOverflowStyle: 'none',
            }}
          >
            {showAlert && (
              <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                <Alert severity="success" variant="filled" sx={{ borderRadius: 2 , fontSize: 12 }}>
                  Bienvenue, vous êtes connecté !
                </Alert>
              </Stack>
            )}

            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SideBar;
