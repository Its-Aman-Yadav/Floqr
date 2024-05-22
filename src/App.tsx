// src/App.tsx
import React, { useState } from 'react';
import MainTable from './components/MainTable';
import LineGraph from './components/LineGraph';
import JobTitlesTable from './components/JobTitlesTable';
import Chat from './components/Chat';
import { YearSummary } from './types';
import './App.css';

const App: React.FC = () => {
  const [selectedYearData, setSelectedYearData] = useState<YearSummary | null>(null);

  return (
    <div className="App">
      <h1>ML Engineer Salaries</h1>
      <MainTable onRowClick={setSelectedYearData} />
      <h2>Job Trends</h2>
      <LineGraph />
      {selectedYearData && (
        <>
          <h2>Job Titles for {selectedYearData.year}</h2>
          <JobTitlesTable jobTitles={selectedYearData.job_titles} />
        </>
      )}
      <Chat />
    </div>
  );
};

export default App;
