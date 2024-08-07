import React, { useState } from "react";
import {
  Button,
  Drawer,
  Dropdown,
  Input,
  MenuProps,
  Space,
  Tooltip,
} from "antd";
import "./setcommant.css";
import {
  DownOutlined,
  InfoCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";

const SetBuy: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      label: <a >USER1</a>,
      key: "0",
    },
    {
      label: <a >USER2</a>,
      key: "1",
    },
    {
      label: "USER3",
      key: "3",
    },
  ];

  return (
    <>
      <Button
        type="primary"
        size="small"
        className=" bg-theme-buy text-theme-text-invert w-28 "
        onClick={showDrawer}
      >
        Đặt lệnh
      </Button>
      <Drawer
        title=""
        className=" "
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <ul className="flex items-center ag-header-cell-text">
              <li className="text-base">đặt lệnh điều kiện</li>
            </ul>
          </Space>
        }
      >
        {/* header */}
        <div className="title-header text-theme-text-invert flex items-center justify-between space-x-2">
          <div className="flex items-center">
            <h3 className="text-theme-text-up"> SSI </h3>
            <p className="text-sm pl-2"> (HOSE)</p>
          </div>
          <div className="">
            <div className="text-color-down flex text-center justify-center">
              <h1>29.6</h1>
            </div>
            <div className="flex justify-between items-center space-x-3">
              <p className="flex-1 cursor-pointer text-theme-text-up hover:underline">
                33.30
              </p>
              <p className="text-theme-text-down">33.0</p>
              <p className="text-theme-text-ref">29</p>
            </div>
          </div>
          <div>
            <div>Phiên GDTT</div>
            <div>Tổng KL</div>
          </div>
        </div>
        {/* content */}
        <div className="title-content mt-8">
          <div className="flex items-center justify-between space-x-2">
            <p>tài khoản đặt lệnh</p>

            <Input className="size-2/4 bg-white" placeholder="Filled" variant="filled" />
            <Dropdown menu={{ items }} trigger={["click"]} className="text-theme-text-up">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="flex items-center justify-around mt-8">
            <p>KL mua </p>
            <p> 0VND</p>
          </div>

          <div className="flex items-center justify-around mt-8">
            <p>Khối Lượng</p>
            <div className=" input-group">
              
              <div className="cursor-pointer text-theme-text-down hover:bg-tertiary hover:text-color-highlight icon left-icon"></div>
              <Input
                placeholder="Enter your username"
                prefix={<MinusOutlined style={{ color: "green" }} />}
                suffix={
                  <Tooltip title="Extra information">
                    <PlusOutlined style={{ color: "green" }} />
                  </Tooltip>
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-around mt-8">
            <p>Giá (x1000)</p>
            <div className=" input-group">
              
              <div className="cursor-pointer text-theme-text-down hover:bg-tertiary hover:text-color-highlight icon left-icon"></div>
              <Input
                placeholder="Enter your username"
                prefix={<MinusOutlined style={{ color: "green" }} />}
                suffix={
                  <Tooltip title="Extra information">
                    <PlusOutlined style={{ color: "green" }} />
                  </Tooltip>
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-around mt-10">
          <Button className="border-current bg-green-600" type="primary">Mua</Button>
          <Button className="border-current bg-red-600" type="primary">Bán</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SetBuy;
