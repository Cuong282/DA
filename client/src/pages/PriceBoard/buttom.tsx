
import { useState } from "react";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import history from "../../untils/history";
const listMenus = [
  {
    name: "BẢNG GIÁ",
    path: "/cong-cu-phan-tich",
    childrent: null,
  },
  {
    name: "CÔNG CỤ PHÂN TÍCH",
    path: "/cong-cu-phan-tich",
    childrent: [
      {
        name: "Biểu đồ kỹ thuật",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Bản đồ nhiệt giá",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Cảnh báo",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Toàn cảnh thị trường",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Top cổ phiếu",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "phân tích cơ bản",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Bộ lọc cổ phiếu",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Thông tin doanh nghiệp",
        path: "/cong-cu-phan-tich",
      },
    ],
  },
  {
    name: "GIAO DỊCH CHỨNG KHOÁN",
    path: "/cong-cu-phan-tich",
    childrent: [
      {
        name: "Biểu đồ kỹ thuật",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Bản đồ nhiệt giá",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Cảnh báo",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Toàn cảnh thị trường",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Top cổ phiếu",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "phân tích cơ bản",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Bộ lọc cổ phiếu",
        path: "/cong-cu-phan-tich",
      },
      {
        name: "Thông tin doanh nghiệp",
        path: "/cong-cu-phan-tich",
      },
    ],
  },
  {
    name: "GIAO DỊCH TIỀN",
    path: "/cong-cu-phan-tich",
  },
  {
    name: "QUẢN LÝ TÀI KHOẢN",
    path: "/cong-cu-phan-tich",
  },
  {
    name: "S-PRODUCTS",
    path: "/cong-cu-phan-tich",
  },
];

const getMenus = (
  active: number,
  setActive: (a: number) => void,
  pageIndex: number = 0
) => {
  return listMenus.map((item, index) => (
    <li
      onClick={() => {
        setActive(active === index ? -1 : index);
      }}
      key={item.name + index}
      className={`relative text-theme-text-tertiary px-3 py-1 cursor-pointer text-sm select-none ${pageIndex == index ? "" : "hover:"
        }bg-theme-dropdown-active`}
    >
      <p className="flex">
        {item.name}
        {item?.childrent &&
          (index === active ? (
            <BiChevronUp fontSize={20} />
          ) : (
            <BiChevronDown fontSize={20} />
          ))}
      </p>
      {active === index && (
        <ul className="absolute left-0 top-7 right-0 bg-theme-dropdown-background animate-dropfadeDown overflow-hidden">
          {item.childrent &&
            item.childrent.map((e, i) => (

              <li

                onClick={() => {
                  history.push(e.path);
                }}
                key={e.name + i}
                className="px-3 py-1 hover:bg-theme-dropdown-active"
              >
                {e.name}
              </li>
            ))}
        </ul>
      )}
    </li>
  ));
}


const Buttom = () => {
  const [active, setActive] = useState(-1);
  return (
    <div className="w-full border-t border-theme-invert bg-theme-secondary px-3 dropbtn text-theme-text-tertiary">
      <ul className="w-full flex">{getMenus(active, setActive, 1)}</ul>
    </div>
  );
};

export default Buttom;