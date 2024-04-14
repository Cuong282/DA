import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  FundOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import News from "./News";

const { Header, Content, Footer, Sider } = Layout;
// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

const items2: MenuProps["items"] = [
  FundOutlined,
  LaptopOutlined,
  NotificationOutlined,
  TeamOutlined,
  UploadOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `table ${key}`,

    children: new Array(2).fill(null).map((_, j) => {
      const subKey = index * 5 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
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
        {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header> */}
        <Content style={{ padding: "0 48px", height: "100%" }}>
          <Breadcrumb style={{ margin: "20px 0" }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
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
          {/* {new Date().getFullYear()}  */}
        </Footer>
      </Layout>
    </>
  );
};

export default Nopage;
