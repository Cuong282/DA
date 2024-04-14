


import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { BiChevronDown } from "react-icons/bi";


const News = () => {

  const chartOptions = {

    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    series: [
      {
        data: [1, 2, 3, 2, 4, 2, 3, 5,12,3,5,5,12,15,1,5,33 ,1,12,4,12,4,5,20,7,2,6,8,16,12],
      },
    ],
    legend: {
      floating: true,
   
      x: 100,
  
      y: 70,
    },
    title: {
      align: "center",
      text: "",
      style: {
        fontSize: "11px",
        "font-weight": "bolder",
      },
    },
    credits: {
      enabled: false,
    },
    chart: {
      type: "line",
      minWidth: 700,
      height: 172,
      backgroundColor: "transparent",
      marginRight: 0,
      marginTop: 0,
      marginLeft: 0,
    },
    subtitle: {
      align: "center",
      text: ``,
      style: {
        color: "#333333",
        fontSize: "12px",
      },
    },
    plotOptions: {
      series: {
        pointStart: 0,
      },
    },
   
  };


  return (
    <section className="w-full h-full">
      <div className=" p-1 bg-theme-primary grid grid-cols-12 gap-1 w-full h-full    ">
       
          <div className=" text-white w-full h-full">
            <div className="w-30 p-3" style={{height:'500px '}}>
              <div className="w-full h-full bg-theme-primary">
                <HighchartsReact
                  highcharts={Highcharts}

                   options={chartOptions}
                />
              </div>

              {/* <div className="flex justify-between pt-3 ">
                <button className="flex select-index-button max-w items-center hover:text-color-highlight">
                  <p className="text-theme-text-tertiary flex items-center text-xs">
                    VNINDEX
                  </p>
                  <BiChevronDown />
                </button>
                <div className="flex items-center whitespace-nowrap text-color-down">
                  <ArrowDownOutlined style={{ color: "red" }} />
                  <span style={{ fontSize: 10, color: "red" }}>
                    {" "}
                    1,117.42 (-5.04 -0.45%)
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-2 text-theme-text-tertiary ">
                <span style={{ fontSize: 12 }}>928,596,018 CP</span>
                <span style={{ fontSize: 12 }}>17,130.702 Tỷ</span>
              </div>
              <div className="flex justify-between">
                <div className="flex-1 flex items-center space-x-0.5 pt-2 text-sm">
                  <ArrowUpOutlined style={{ color: "green" }} />
                  <span className="inline text-green-400">126</span>
                  <span className="inline text-green-400"> (5)</span>
                </div>
                <div className="flex-1 flex items-center space-x-0.5 pt-2 text-sm">
                  <MinusOutlined style={{ marginTop: "7px" }} />
                  <span className="inline text-yellow-400">51</span>
                </div>
                <div className="flex-1 flex items-center space-x-0.5 pt-2 text-sm">
                  <ArrowDownOutlined style={{ color: "red" }} />
                  <span className="inline text-red-400">280</span>
                  <span className="inline text-blue-400"> (8)</span>
                </div>
                <div className="flex-1 text-right whitespace-nowrap pl-1 pt-2 text-sm text-theme-text-tertiary ">
                  Đóng cửa
                </div>
              </div> */}
            </div>
          </div>

       
        </div>

      

    </section>
  );
};

export default News;
//git add .
