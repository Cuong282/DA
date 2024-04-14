import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <Menu />
      <Outlet />
    </div>
  );
};

export default Layout;
