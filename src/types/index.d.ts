import JobTitlesTable from "../components/JobTitlesTable";

// src/types/index.d.ts
export interface JobData {
  work_year: number;
  experience_level: string;
  employment_type: string;
  job_title: string;
  salary: number;
  salary_currency: string;
  salary_in_usd: number;
  employee_residence: string;
  remote_ratio: number;
  company_location: string;
  company_size: string;
}

export interface YearSummary {
  year: number;
  total_jobs: number;
  average_salary: number;
  job_titles: { [key: string]: number };
}

export interface ChatResponse {
  response: string;
}

export interface JobTitles{
  [key: string]: number;
}
