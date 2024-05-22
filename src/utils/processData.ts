import { JobData, YearSummary } from '../types';

export const processData = (data: JobData[]): YearSummary[] => {
  const yearMap: { [key: number]: YearSummary } = {};

  data.forEach((job) => {
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

  // Calculate average salary
  Object.values(yearMap).forEach((yearSummary) => {
    yearSummary.average_salary = Math.round(yearSummary.average_salary / yearSummary.total_jobs);
  });

  return Object.values(yearMap);
};
