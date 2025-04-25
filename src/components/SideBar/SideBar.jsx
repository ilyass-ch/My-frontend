import React from "react";
import { Layout, theme } from "antd";
import AppHeader from "../Header/AppHeader";
import AppSider from "./AppSider";
import 'antd/dist/reset.css';

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
            //   marginTop: 10 ,
              padding: 24,
              marginTop: 5,
              marginRight:5,
              marginLeft: 5,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            Sélectionne un service dans la barre latérale.
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SideBar;
