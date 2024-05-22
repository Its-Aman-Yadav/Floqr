import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { YearSummary } from '../types';
import { processData } from '../utils/processData';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph: React.FC = () => {
  const [data, setData] = useState<YearSummary[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(processData(data)));
  }, []);

  const chartData = {
    labels: data.map(item => item.year),
    datasets: [
      {
        label: 'Total Jobs',
        data: data.map(item => item.total_jobs),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false
      }
    ]
  };

  return <Line data={chartData} />;
};

export default LineGraph;
