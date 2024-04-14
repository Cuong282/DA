import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Popover, Select, Switch } from "antd";
import { HiOutlineSearch } from "react-icons/hi";
import { AiTwotoneSetting } from "react-icons/ai";
import { MoreOutlined, ArrowUpOutlined, PlusOutlined } from "@ant-design/icons";
import listItemBoard from "../../IndexItem/IndexItem";

interface getMenus {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

// const [button,setButton]= useState("");
const GetMenus = ({ active, setActive }: getMenus) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {listItemBoard.map((item, index) => (
        <button
          onMouseUp={() => {
            setActive(active === index ? -1 : index);
            item.path && navigate(item.path);
          }}
          key={item.name + index}
          className={`relative text-theme-text-tertiary whitespace-nowrap px-3 py-1 cursor-pointer text-sm select-none w-full hover:bg-theme-dropdown-active h-8 `}
        >
          <p className="flex hover:text-theme-text-tertiary">
            {item.name}
            {item?.childrent && <BiChevronDown fontSize={20} />}
          </p>
          {active === index && (
            <ul className="absolute left-0 top-8 z-20 min-w-full bg-theme-dropdown-active animate-dropfadeDown overflow-hidden shadow-lg rounded-b-lg">
              {item.childrent &&
                item.childrent.map((e, i) => (
                  <li
                    onClick={() => {
                      navigate(e.path);
                    }}
                    key={e.name + i}
                    className="px-3 py-1 hover:bg-theme-dropdown-active text-theme-text-tertiary rounded"
                  >
                    {item.name === "Danh mục của tôi" && i === 0 ? (
                      <div className="flex items-center ">
                        <input
                          type="search"
                          placeholder="tạo danh mục mới"
                          className=" w-64 h-1.5 p-4 ps-10 text-sm rounded focus:border-blue-500 bg-theme-input-background"
                        />
                        <PlusOutlined  className="text-theme-text-tertiary border-none h-5 w-5 ml-3" />
                      </div>
                    ) : (
                      e.name
                    )}
                  </li>
                ))}
            </ul>
          )}
        </button>
      ))}
    </>
  );
};
const valueOption = [
  {
    label: "1,000,000",
    value: 1000000,
  },
  {
    label: "1,000,000,000",
    value: 1000000000,
  },
];
const volumeOptions = [
  {
    label: 1,
    value: 1,
  },
  {
    label: 10,
    value: 10,
  },
];
const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};
const Menu = () => {
  const [active, setActive] = useState<number>(-1);
  const [unitVolume, setUnitVolume] = React.useState<number>(1);
  const [unitValue, setUnitValue] = React.useState<number>(1000000);
  return (
    <>
      <div className="flex justify-between bg-theme-table-row-odd text-theme-text-tertiary w-full">
        <div className="flex justify-between align-middle w-full items-center bg-theme-table-row-odd ">
          <Input
            size="small"
            className="bg-theme-input-background w-72 mr-1 "
            addonBefore={
              <HiOutlineSearch className="text-theme-text-tertiary border-none" />
            }
            placeholder="Tìm kiếm CK"
          />
          <div className="flex w-full justify-between">
            <li className="flex hover">
              <GetMenus active={active} setActive={setActive} />
            </li>
            <ArrowUpOutlined />
          </div>

          <div>
            <ul className="flex items-center ">
              <li className="cursor-pointer ">
                <Popover
                  placement="bottom"
                  content={
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-theme-text-primary">Đơn vị KL</p>
                        <Select
                          style={{ width: 120 }}
                          value={unitVolume}
                          className="ml-2"
                          onChange={(selected) => {
                            setUnitVolume(selected);
                          }}
                          options={volumeOptions}
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p>Đơn vị Giá trị</p>
                        <Select
                          style={{ width: 120 }}
                          value={unitValue}
                          className="ml-2"
                          onChange={(selected) => {
                            setUnitValue(selected);
                          }}
                          options={valueOption}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Sắp xếp realtime</p>
                        <Switch
                          size="small"
                          defaultChecked
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  }
                  trigger="click"
                  className="mr-2 ml-2 cursor-pointer"
                >
                  <AiTwotoneSetting />
                </Popover>
              </li>
              <MoreOutlined className="text-lg" />
              <li className="px-2 py-1">
                <Button
                  // type="ghost"
                  size="small"
                  className="bg-theme-buy text-theme-text-invert w-28"
                >
                  Đặt lệnh
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
