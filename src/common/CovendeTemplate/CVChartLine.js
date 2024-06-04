import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import ReactApexChart from 'react-apexcharts';
import { CVChartOptions } from './CVChart';

/**
 *
 * @param {Object} param0
 * @param {[{data:[Number], color:String, label: String}]} param0.data
 * @param {[String]} param0.labels
 * @param {String} param0.prefixY
 * @returns
 */
function CVChartLine({ data, labels, prefixY = '' }) {
  const idcanvas = v4();
  const [lista, setlista] = useState([]);
  const [custom, setcustom] = useState({});

  const initdata = () => {
    let lab = [];
    data = data.map((item, idx) => {
      // let reg = item.data.map((x) => [x, labels[idx]]);
      lab.push(item.color);
      return { data: item.data || [], name: item.label || '' };
    });
    // console.log({ data, lab });
    setcustom({ ...CVChartOptions({ idcanvas, colors: lab }), labels });
    setlista(data);
  };

  useEffect(() => {
    initdata();
  }, [data]);

  return (
    <ReactApexChart
      options={custom}
      series={lista}
      type='area'
      height={350}
      width={400}
    />
  );
}

export default CVChartLine;
