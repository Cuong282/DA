
import HighchartsReact from "highcharts-react-official";
import "./BoxIndex.css";

const HightCharts = () => {

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
    <>
      <div className="highcharts-background relative" style={{ height: 105 }}>
        <div className="absolute left-0 top-0 w-full h-[85px] bg-theme-primary"></div>
        <div>
        {
            <HighchartsReact
            options={chartOptions}
            />
             }
        </div>
      </div>
    </>
  );
};

export default HightCharts;