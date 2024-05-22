import React, { useState, useEffect } from 'react';
import { YearSummary } from '../types';
import { processData } from '../utils/processData';
import './MainTable.css';

interface MainTableProps {
  onRowClick: (yearData: YearSummary) => void;
}

const MainTable: React.FC<MainTableProps> = ({ onRowClick }) => {
  const [data, setData] = useState<YearSummary[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof YearSummary; direction: 'ascending' | 'descending' }>({ key: 'year', direction: 'ascending' });

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(processData(data)));
  }, []);

  const sortData = (key: keyof YearSummary) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setData(prevData =>
      [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      })
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => sortData('year')}>Year</th>
          <th onClick={() => sortData('total_jobs')}>Total Jobs</th>
          <th onClick={() => sortData('average_salary')}>Average Salary (USD)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} onClick={() => onRowClick(item)}>
            <td>{item.year}</td>
            <td>{item.total_jobs}</td>
            <td>{item.average_salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
