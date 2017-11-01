import CommonChart from './core/CommonChart';

export default function(config: any) {
  const commonChart = new CommonChart(config);
  commonChart.render();

  return commonChart;
}
