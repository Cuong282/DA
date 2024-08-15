
import "./BoxIndex.css";
import { LineChart } from '@mui/x-charts/LineChart';

const HightCharts = () => {




  return (
    <>
      <div className="highcharts-background relative" style={{ height: 105 }}>
        <div className=" w-full h-[85px] bg-theme-primary">
          <div className="">
            {
              <LineChart
              xAxis={[{ data: [0,1, 2, 3, 5, 8, 10] }]}
              yAxis={[{
                colorMap: {
                  type: 'piecewise',
                  thresholds: [0, 10],
                  colors: ['red', 'green', 'blue'],
                }
              }]}
                series={[
                  {
                    data: [0,2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                width={232}
                height={200}
                margin={{ top: 0, bottom: 115, left:0,right:0}}
              />
            }
          </div>
        </div>

      </div>
    </>
  );
};

export default HightCharts;