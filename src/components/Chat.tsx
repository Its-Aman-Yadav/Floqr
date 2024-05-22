import React, { useState } from 'react';
import data from '../../public/data.json';
import { JobData, YearSummary, ChatResponse } from '../types';

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const processData = (): YearSummary[] => {
    const yearMap: { [key: number]: YearSummary } = {};

    (data as JobData[]).forEach((job) => {
      const { work_year, job_title, salary_in_usd } = job;
      if (!yearMap[work_year]) {
        yearMap[work_year] = {
          year: work_year,
          total_jobs: 0,
          average_salary: 0,
          job_titles: {},
        };
      }

      yearMap[work_year].total_jobs += 1;
      yearMap[work_year].average_salary += salary_in_usd;

      if (yearMap[work_year].job_titles[job_title]) {
        yearMap[work_year].job_titles[job_title] += 1;
      } else {
        yearMap[work_year].job_titles[job_title] = 1;
      }
    });


    Object.values(yearMap).forEach((yearSummary) => {
      yearSummary.average_salary = Math.round(yearSummary.average_salary / yearSummary.total_jobs);
    });

    return Object.values(yearMap);
  };

  const yearSummaries = processData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const lowerCasePrompt = prompt.toLowerCase();
    let answer = 'I am sorry, I do not understand the question.';

    if (lowerCasePrompt.includes('average salary')) {
      const match = lowerCasePrompt.match(/\b\d{4}\b/);
      if (match) {
        const year = parseInt(match[0], 10);
        const summary = yearSummaries.find((summary) => summary.year === year);
        if (summary) {
          answer = `The average salary in ${year} was $${summary.average_salary}.`;
        } else {
          answer = `I don't have data for the year ${year}.`;
        }
      } else {
        answer = `Please specify the year you are interested in.`;
      }
    } else if (lowerCasePrompt.includes('total jobs')) {
      const match = lowerCasePrompt.match(/\b\d{4}\b/);
      if (match) {
        const year = parseInt(match[0], 10);
        const summary = yearSummaries.find((summary) => summary.year === year);
        if (summary) {
          answer = `The total number of jobs in ${year} was ${summary.total_jobs}.`;
        } else {
          answer = `I don't have data for the year ${year}.`;
        }
      } else {
        answer = `Please specify the year you are interested in.`;
      }
    } else if (lowerCasePrompt.includes('job titles')) {
      const match = lowerCasePrompt.match(/\b\d{4}\b/);
      if (match) {
        const year = parseInt(match[0], 10);
        const summary = yearSummaries.find((summary) => summary.year === year);
        if (summary) {
          const titles = Object.entries(summary.job_titles)
            .map(([title, count]) => `${title}: ${count}`)
            .join(', ');
          answer = `The job titles in ${year} were: ${titles}.`;
        } else {
          answer = `I don't have data for the year ${year}.`;
        }
      } else {
        answer = `Please specify the year you are interested in.`;
      }
    }

    setResponse(answer);
    setLoading(false);
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          cols={50}
          placeholder="Ask about ML Engineer salaries..."
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
