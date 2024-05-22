import React from 'react';
import { JobTitles } from '../types';

interface JobTitlesTableProps {
  jobTitles: JobTitles;
}

const JobTitlesTable: React.FC<JobTitlesTableProps> = ({ jobTitles }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Number of Jobs</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(jobTitles).map(([title, count], index) => (
          <tr key={index}>
            <td>{title}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobTitlesTable;
