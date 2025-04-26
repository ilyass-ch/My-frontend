import React from "react";
import { Layout, theme } from "antd";
import AppHeader from "../Header/AppHeader";
import AppSider from "./AppSider";
import { Outlet } from "react-router-dom"; // ✅ Importer Outlet
import 'antd/dist/reset.css';
import "./SideBar.css"; // ✅ Importer le fichier CSS

const { Content } = Layout;

const SideBar = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <Layout style={{ padding: "0 24px 24px" }}>
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

              /* SCROLLBAR STYLE */
              scrollbarWidth: 'thin', /* Firefox */
              scrollbarColor: 'rgba(83, 61, 224, 0.2) transparent', /* Firefox */

              /* Webkit (Chrome, Edge, Safari) */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
          >
            <Outlet />
          </Content>

        </Layout>
      </Layout>
    </Layout>
  );
};

export default SideBar;
