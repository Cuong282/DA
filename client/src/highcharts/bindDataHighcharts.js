const configChartIndex = (value, volume, prevValue) => {
  const minHours = new Date().setHours(8, 59, 0) + 1000 * 7 * 3600;
  const maxHours = new Date().setHours(15, 0, 1) + 1000 * 7 * 3600;
  return {
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    chart: {
      type: "line",
      height: 126,
      backgroundColor: "transparent",
      marginRight: 0,
      marginTop: 0,
      marginLeft: 0,
    },
    series: [
      {
        data: [1, 2, 3, 2, 4, 2, 3, 5,12,3,5,5,12,15,1,5,33 ,1,12,4,12,4,5,20,7,2,6,8,16,12],
      },
    ],
    title: {
      align: "center",
      text: "",
      style: {
        fontSize: "11px",
        "font-weight": "bolder",
      },
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
        pointStart: 100,
      },
    },
    series: [
      {
        //name: "Value",
        data: value,
        type: "line",
        lineWidth: 1,
        showInLegend: false,
        color:'red',
        zones: [
          {
            value: prevValue, // Up to this value, the zone will apply
            color: "#ff3737", // Color for values less than prevValue
          },
          {
            color: "#33F529", // Color for values greater than or equal to prevValue
          },
        ],
        
        zIndex: 2,
      },
      {
        //name: "Volume",
        data: volume,
        type: "column",
        color: "rgb(94,169,193)",
        yAxis: 1,
        showInLegend: false,
        zIndex: 1,
      },
      
    ],
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "datetime",
      gridLineWidth: 1,
      gridLineColor: "#333333",
      crosshair: true,
      tickColor: "transparent",
      min: minHours,
      max: maxHours,
      labels: {
        enabled: true,
        style: {
          fontSize: "10px",
          color: "var(--color-theme-text-tertiary)",
        },
        formatter: function () {
          const label = this.axis.defaultLabelFormatter.call(this).slice(0, 2);
          return label + "h";
        },
      },
      tickInterval: 3600 * 60 * 24,
    },

    yAxis: [
      {
        gridLineWidth: 1,
        title: {
          enabled: false,
        },
        resize: {
          enabled: true,
        },
        labels: {
          enabled: false,
        },
        gridLineColor: "#333333",
        plotLines: [
          {
            value: prevValue,
            label: {
              text: prevValue,
              align: "center",
              style: {
                color: "var(--color-theme-text-tertiary)",
                fontSize: "10px",
              },
            },
            color: "#999999",
            gridLine: 1,
            dashStyle: "shortdash",
            width: 1,
            zIndex: 1,
          },
        ],
      },
      {
        gridLineColor: "#fff",
        height: "70%",
        with: "100%",
        top: "30%",
        visible: false,
      },
    ],
  };
};

export { configChartIndex };
