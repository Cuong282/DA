import React, { Dispatch, SetStateAction, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { listMenus } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import "./Menu.css";
interface getMenus {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

const GetMenus = ({ active, setActive }: getMenus) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {listMenus.map((item, index) => (
        <li
        onMouseUp={() => {
            setActive(active === index ? -1 : index);
            item.path && navigate(item.path);
          }}
          key={item.name + index}
          className={`relative text-theme-text-tertiary whitespace-nowrap px-2 py-1 cursor-pointer text-[11px]
           font-medium select-none flex items-center menu-hover
           ${location.pathname == item.path ? "" : "hover:"}bg-theme-dropdown-active `}>
          <p className="flex items-center hover:text-theme-text-tertiary">
            {item.name}
            {item?.childrent &&
              (index === active ? (
                <BiChevronUp fontSize={20} />
              ) : (
                <BiChevronDown fontSize={20} />
              ))}
          </p>
          {active === index && (
            <ul className="absolute left-0 top-7 z-20 min-w-full bg-theme-dropdown-background animate-dropfadeDown overflow-hidden shadow-lg">
              {item.childrent &&
                item.childrent.map((e, i) => (
                  <li
                    onClick={() => {
                      navigate(e.path);
                    }}
                    key={e.name + i}
                    className="px-3 py-1 hover:bg-theme-dropdown-active whitespace-nowrap "
                  >
                    {e.name}
                  </li>
                ))}
            </ul>
          )}
        </li>
        
      ))}
    </>
  );
};

const Menu = () => {
  const [active, setActive] = useState<number>(-1);
  return (
    <div className="flex w-full border-t border-theme-invert bg-theme-secondary justify-between">
      <div className="navbar ">
      <ul className="w-full flex ">
        <GetMenus active={active} setActive={setActive} />
        <div className="flex items-center text-theme-text-tertiary ml-2px">
          <div className="btn">
          <CloseOutlined />
          </div>
          <div className="cancel">
          <MenuOutlined />
          </div>
        </div>
      </ul>
      </div>
      <div className="flex ustify-center items-center text-11 min-w-max lg:flex">
        <div className="flex justify-center items-center text-theme-text-up space-x-1">
          <span> Connected</span>
        </div>
      </div>

    </div>
  );
};

export default Menu;
