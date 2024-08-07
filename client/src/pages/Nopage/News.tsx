
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect } from "react";



const News = () => {

  
  const chartOptions = {

    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    series: [
      {
        data: [1, 2, 3, 2, 4, 2, 3, 5,12,3,5,5,12,15,1,5,20 ,1,12,4,12,4,5,20,7,2,6, 3, 2, 4, 2, 3, 5,12,3,5,5,12,15,1,5,20 ,1,12,4,12,4,5,20,7,8,16,12, 3, 5,12,3,5,5,12,15,1,5,20 ,1,12,4,12,4,5,20,7,2,6,5,20,7,2,6,8,16,2,3,5,5,12,15,1,5,20 ,1,12,4,12,4,5,20,7,2,6,5,20,7,2,6,12, 3, 5,12,3,5,5,12],
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
      minWidth: "100%",
      height: 400,
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

  async function getdata() {

  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <section className="w-full h-full bg-theme-secondary ">
            <div className="w-full p-3 " >
              <div className="w-full h-full " >
                <HighchartsReact
                  highcharts={Highcharts}
                   options={chartOptions}
                />
              </div>
            </div>
    </section>
  );
};

export default News;
//git add .