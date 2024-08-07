import React, { useState } from "react";
import { FundOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Drawer, Layout, Menu, theme } from "antd";
import News from "./News";

const { Content, Footer, Sider } = Layout;

const items2: MenuProps["items"] = [FundOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `chỉ số ${key}`,

    children: new Array(2).fill(null).map((_, j) => {
      const subKey = index * 5 + j + 1;
      return {
        key: subKey,
        label: `mã CK${subKey}`,
      };
    }),
  };
});
const Nopage = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>

      <Content style={{ padding: "0 48px", height: "100%" }}>
        <Breadcrumb style={{ margin: "20px 0" }}></Breadcrumb>
        <Layout
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            backgroundColor: "var(--color-theme-secondary)",
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                backgroundColor: "var(--color-theme-price-table-col-highlight)",
              }}
              items={items2}
            />
          </Sider>

          <Content style={{ padding: "0 24px", height: "100%" }}>
            <News />
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center", marginTop:"100px" }}>
          <h1>thị trường</h1>
        </Footer>
      </Content>
    </>
  );
};

export default Nopage;
