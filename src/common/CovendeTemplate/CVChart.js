import { CVMoneyFormat } from './CVMethods';
import { COLORS } from './CVThemes';

export const CVChartOptions = ({
  idcanvas,
  colors,
  x = {
    text: '',
    color: '',
    background: ''
  },
  y = {
    text: '',
    color: '',
    background: ''
  }
}) => {
  return {
    chart: {
      id: idcanvas,
      type: 'area',
      height: 350,
      zoom: {
        autoScaleYaxis: true
      }
    },
    colors: colors,
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    annotations: {
      yaxis: [
        {
          label: {
            show: true,
            text: y.text,
            style: {
              color: y.color,
              background: y.background
            }
          }
        }
      ],
      xaxis: [
        {
          label: {
            show: true,
            text: x.text,
            style: {
              color: x.color,
              background: x.background
            }
          }
        }
      ]
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow'
    },
    xaxis: {
      type: 'datetime',
      min: 0,
      tickAmount: 6
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left'
    }
  };
};

export const CVChartGradient = ({ color, idcanvas }) => {
  var ctx = document.getElementById(idcanvas).getContext('2d');
  var gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, '#FFFFFF10');
  return gradient;
};
