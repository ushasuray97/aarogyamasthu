import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";

const DashboardChart = () => {
  const refContainer = useRef(null);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const chart = Highcharts.chart(refContainer.current, {
      chart: {
        type: "column",
      },
      title: {
        text: "Project Chart",
      },
      xAxis: {
        categories: ["Jan", "Feb", "March", "April", "May"], // the categories of the X Axis
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Progress",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      credits: {
        enabled: false,
      },
      series: dataSource,
    });

    if (dataSource.length > 0) {
      chart.hideLoading();
    } else {
      chart.showLoading();
    }
  }, [dataSource]);

  useEffect(() => {
    setTimeout(() => {
      setDataSource([
        {
          name: "Jan",
          data: [50, 72, 88, 92, 34],
        },
        {
          name: "Feb",
          data: [84, 79, 99, 94, 66],
        },
        {
          name: "March",
          data: [49, 39, 47, 40, 42],
        },
        {
          name: "April",
          data: [43, 34, 77, 35, 53],
        },
      ]);
    }, 2000);
  }, []);

  return (
    <div className="App">
      <div ref={refContainer} />
    </div>
  );
};

export default DashboardChart;
