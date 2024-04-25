import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { SettingOutlined } from "@ant-design/icons";
// import { getIndexmuntichart } from "../../services/apis";
import "./BoxIndex.css";
// import { ColDef } from "ag-grid-community";
import { AiTwotoneSetting } from "react-icons/ai";

interface IIndexCharts {
  Chỉsố: number;
  Điểm: number;
  "<+/->": number;
  "KLGD(Triệu)": number;
  "GTGD(Tỷ)": number;
  "CKTăng/Giảm": number;
}

function BoxIndex() {
  const [data, setData] = useState<IIndexCharts[] | []>([]);
  async function getdata() {
    // const data: any = await getIndexmuntichart();
    // setData(convertDatas(data.data.data));
  }

  useEffect(() => {
    getdata();
  }, []);

  function convertDatas(data: any) {
    return (
      data?.length > 0 &&
      data?.map((data: any) => {
        return {
          Chỉsố: data.label,
          Điểm:new Intl.NumberFormat().format(data.indexValue),
          "<+/->": data.change,
          "KLGD(Triệu)": new Intl.NumberFormat().format(data.allQty / 1000000),
          "GTGD(Tỷ)": new Intl.NumberFormat("de-DE").format(data.totalValue / 1000000),
          "CK Tăng/Giảm": data.advances,
        };
      })
    );
  }

  const columnDefs = [
    {
      field: "Chỉsố",
      sortable: true,
      width: 100,
     
      cellStyle: {
        color: "var(--color-theme-text-tertiary)",
      },
    },
    {
      field: "Điểm",
      width: 90,
      sortable: true,
      cellStyle: {
        color: "rgb(11, 223, 57)",
      },
    },
    { field: "<+/->", width: 90, sortable: true },
    {
      field: "KLGD(Triệu)",
      width: 100,
      sortable: true,
      cellStyle: {
        color: "var(--color-theme-text-tertiary)",
      },
    },
    {
      field: "GTGD(Tỷ)",
      width: 100,
      sortable: true,
      cellStyle: {
        color: "var(--color-theme-text-tertiary)",
      },
    },
    {
      field: "CK Tăng/Giảm",
      width: 150,
      sortable: true,
    },
  ];

  return (
    <>
       <div className="col-span-5 xl:col-span-4 rounded bg-theme-secondary ">
          <div className="relative bg-theme-secondary  ">
            <table className="w-full text-sm text-left text-gray-500  ">
              <thead className="text-theme-text-tertiary theme-text-highlight ">
                <tr >
                  <td className="px-2 py-0"> <SettingOutlined className="px-1 py-1 " />Chỉ số</td>
                  <td className="px-2 py-0">Điểm</td>
                  <td className="px-2 py-0">{'<+/->'}</td>
                  <td className="px-2 py-0">KLGD(triệu)</td>
                  <td className="px-2 py-0">GTGD(tỷ)</td>
                  <td className="px-2 py-0">CK tăng/giảm</td>
                </tr>
              </thead>
              <tbody>

              <tr className="  theme-text-highlight mt-4 ">
                  <th
                    scope="row"
                    className="px-1 py-1 font-medium text-theme-text-tertiary "
                  >
                    VNINDEX
                  </th>
                  <td className="px-4 py-2">Black</td>
                  <td className="px-1 py-1">Accessories</td>
                  <td className="px-1 py-1">$99</td>
                  <td className="px-1 py-1">$99</td>
                  <td className="px-0 py-0">Laptop</td>
                </tr>
                <tr className="  dark:border-gray-700 theme-text-pending theme-sell-highlight bg-theme-price-table-col-highlight">
                  <th scope="row" className="px-1 py-1 font-medium text-theme-text-tertiary">
                    VN30
                  </th>
                  <td className="px-0 py-2">Silver</td>
                  <td className="px-0 py-0">Silver</td>
                  <td className="px-0 py-0">Laptop</td>
                  <td className="px-0 py-0">Laptop</td>
                  <td className="px-0 py-0">Laptop</td>
                </tr>
                <tr className=" dark:border-gray-700 ">
                  <th
                    scope="row"
                    className="px-1 py-0 font-medium whitespace-nowrap text-theme-text-tertiary"
                  >
                    HNX30
                  </th>
                  <td className="px-1 py-2">White</td>
                  <td className="px-1 py-1">Laptop PC</td>
                  <td className="px-1 py-1">$1999</td>
                  <td className="px-1 py-1">$1999</td>
                  <td className="px-0 py-0">Laptop</td>
                </tr>
                <tr className=" theme-sell-highlight bg-theme-price-table-col-highlight">
                  <th
                    scope="row"
                    className="px-1 py-1 font-medium whitespace-nowrap text-theme-text-tertiary"
                  >
                    VNXALL
                  </th>
                  <td className="px-1 py-2">Black</td>
                  <td className="px-1 py-1">Accessories</td>
                  <td className="px-1 py-1">$99</td>
                  <td className="px-1 py-1">$99</td>
                  <td className="px-0 py-0">Laptop</td>
                </tr>
                <tr className="  theme-text-highlight ">
                  <th
                    scope="row"
                    className="px-1 py-1 font-medium text-theme-text-tertiary "
                  >
                    HNX
                  </th>
                  <td className="px-1 py-2">Black</td>
                  <td className="px-1 py-1">Accessories</td>
                  <td className="px-1 py-1">$99</td>
                  <td className="px-1 py-1">$99</td>
                  <td className="px-0 py-0">Laptop</td>
                </tr>
                <tr className=" theme-sell-highlight bg-theme-price-table-col-highlight">
                  <th
                    scope="row"
                    className="px-1 py-1 font-medium  whitespace-nowrap text-theme-text-tertiary "
                  >
                    UPCOM
                  </th>
                  <td className="px-1 py-2">Black</td>
                  <td className="px-1 py-1">Accessories</td>
                  <td className="px-1 py-1">$99</td>
                  <td className="px-1 py-1">$99</td>
                  <td className="px-1 py-1">Laptop</td>
                </tr>
             
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}

export default BoxIndex;
