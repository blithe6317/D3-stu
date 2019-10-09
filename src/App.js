import React from "react";
import { withRouter } from "react-router-dom";

import { Layout } from "antd";
import { MenuComponent, SwitchComponent } from "./router";
import "./App.css";

const App = () => {
  const { Content, Sider } = Layout;
  const bodyHeight = document.body.height;

  return (
    <Layout style={{ height: "100%" }}>
      <Sider width={200} height={bodyHeight}>
        <MenuComponent></MenuComponent>
      </Sider>
      <Content style={{ padding: "10px" }}>
        <SwitchComponent></SwitchComponent>
      </Content>
    </Layout>
  );
};

export default withRouter(App);
