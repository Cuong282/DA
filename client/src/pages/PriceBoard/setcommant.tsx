import React, { useCallback, useState } from "react";
import {
  Button,
  Drawer,
  Input,
  Select,
  Space,
  Tooltip,
} from "antd";
import "./setcommant.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { GetApi } from "../../services";

const SetBuy: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null); // Khối lượng
  const [price, setPrice] = useState<number | null>(null);       // Giá
  const [account, setAccount] = useState<string | null>(null);   // Tài khoản đặt lệnh

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Xử lý thay đổi khối lượng
  const handleQuantityChange = (value: string) => {
    setQuantity(Number(value));
  };

  // Xử lý thay đổi giá
  const handlePriceChange = (value: string) => {
    setPrice(Number(value));
  };

  // Xử lý thay đổi tài khoản
  const handleAccountChange = (value: string) => {
    setAccount(value);
  };

  // Hàm xử lý khi nhấn nút Mua
  const handleBuy = () => {
    if (!quantity || !price || !account) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Gọi API hoặc xử lý logic mua ở đây
    console.log("Mua cổ phiếu với khối lượng:", quantity, "giá:", price, "tài khoản:", account);
    alert(`Mua thành công ${quantity} cổ phiếu với giá ${price} từ tài khoản ${account}`);
  };

  // Hàm xử lý khi nhấn nút Bán
  const handleSell = () => {
    if (!quantity || !price || !account) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Gọi API hoặc xử lý logic bán ở đây
    console.log("Bán cổ phiếu với khối lượng:", quantity, "giá:", price, "tài khoản:", account);
    alert(`Bán thành công ${quantity} cổ phiếu với giá ${price} từ tài khoản ${account}`);
  };
  const [rowData, setRowData] = useState<any[]>();

function getUserData (){
    GetApi()
    .then((result) => {
      const data = convertDataUser(result.data.slice(0, 30));
      // setRowData(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
function convertDataUser (data:any){
  return(
    data.length > 0  
  )
}
const onGridReady = useCallback((params: any) => {
  getNewdata();
}, []);
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
          <div>
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
            <p>Tài khoản đặt lệnh</p>
            <Select
              showSearch
              placeholder="Chọn tài khoản"
              onChange={handleAccountChange} // Xử lý khi chọn tài khoản
              options={[
                { value: 'Jack', label: 'Jack' },
                { value: 'Lucy', label: 'Lucy' },
                { value: 'Tom', label: 'Tom' },
              ]}
            />
          </div>

          <div className="flex items-center justify-around mt-8">
            <p>Khối Lượng</p>
            <div className=" input-group">
              <Input
                placeholder="Nhập khối lượng"
                value={quantity ?? ''}
                onChange={(e) => handleQuantityChange(e.target.value)} // Xử lý thay đổi khối lượng
              />
            </div>
          </div>

          <div className="flex items-center justify-around mt-8">
            <p>Giá (x1000)</p>
            <div className=" input-group">
              <Input
                placeholder="Nhập giá"
                value={price ?? ''}
                onChange={(e) => handlePriceChange(e.target.value)} // Xử lý thay đổi giá
              />
            </div>
          </div>

          <div className="flex items-center justify-around mt-10">
            <Button className="border-current bg-green-600" type="primary" onClick={handleBuy}>Mua</Button>
            <Button className="border-current bg-red-600" type="primary" onClick={handleSell}>Bán</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SetBuy;
function getNewdata() {
  throw new Error("Function not implemented.");
}

