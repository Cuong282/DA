import React from "react";
import {
  FundOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import News from "./News";

const {  Content, Footer, Sider } = Layout;

const items2: MenuProps["items"] = [
  FundOutlined,

].map((icon, index) => {
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
      <Layout>
        <Content style={{ padding: "0 48px", height: "100%" }}>
          <Breadcrumb style={{ margin: "20px 0" }}>
          </Breadcrumb>
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
                items={items2}
              />
            </Sider>

            <Content style={{ padding: "0 24px", height: "100%" }}>
              <News />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
            <h1>thị trường</h1>
        </Footer>
      </Layout>
    </>
  );
};

export default Nopage;
