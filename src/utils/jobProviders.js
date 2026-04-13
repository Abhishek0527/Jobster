import { getFakeJobs } from './fakeJobsApi';

const ADZUNA_COUNTRY = process.env.REACT_APP_ADZUNA_COUNTRY || 'in';
const ADZUNA_APP_ID = process.env.REACT_APP_ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.REACT_APP_ADZUNA_APP_KEY;

const normalizeText = (value, fallback = 'Not specified') => value || fallback;
const stripHtml = (value = '') =>
  value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
const createExcerpt = (value, maxLength = 180) => {
  const cleanText = stripHtml(value);

  if (!cleanText) {
    return 'Description not available.';
  }

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return `${cleanText.slice(0, maxLength).trim()}...`;
};

const normalizeAdzunaJob = (job) => ({
  _id: `adzuna-${job.id}`,
  title: normalizeText(job.title),
  company: normalizeText(job.company?.display_name, 'Adzuna company'),
  location: normalizeText(job.location?.display_name),
  experienceRequired: 'not mentioned',
  description: createExcerpt(job.description),
  employmentType: job.contract_time || job.contract_type || 'full-time',
  source: 'Adzuna',
  applyUrl: job.redirect_url || '',
});

const normalizeRemotiveJob = (job) => ({
  _id: `remotive-${job.id}`,
  title: normalizeText(job.title),
  company: normalizeText(job.company_name, 'Remotive company'),
  location: normalizeText(job.candidate_required_location, 'Remote'),
  experienceRequired: 'not mentioned',
  description: createExcerpt(job.description),
  employmentType: job.job_type || 'remote',
  source: 'Remotive',
  applyUrl: job.url || '',
});

const fetchAdzunaJobs = async (search) => {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    return [];
  }

  const params = new URLSearchParams({
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    results_per_page: '10',
    'content-type': 'application/json',
  });

  if (search) {
    params.set('what', search);
  }

  const response = await fetch(
    `https://api.adzuna.com/v1/api/jobs/${ADZUNA_COUNTRY}/search/1?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('Adzuna request failed');
  }

  const data = await response.json();
  return (data.results || []).map(normalizeAdzunaJob);
};

const fetchRemotiveJobs = async (search) => {
  const params = new URLSearchParams();
  if (search) {
    params.set('search', search);
  }

  const query = params.toString();
  const response = await fetch(`https://remotive.com/api/remote-jobs${query ? `?${query}` : ''}`);

  if (!response.ok) {
    throw new Error('Remotive request failed');
  }

  const data = await response.json();
  return (data.jobs || []).slice(0, 10).map(normalizeRemotiveJob);
};

export const getJobsFromProvider = async ({ provider, search }) => {
  if (provider === 'adzuna') {
    const adzunaJobs = await fetchAdzunaJobs(search);
    return adzunaJobs.length ? adzunaJobs : getFakeJobs();
  }

  if (provider === 'remotive') {
    const remotiveJobs = await fetchRemotiveJobs(search);
    return remotiveJobs.length ? remotiveJobs : getFakeJobs();
  }

  if (provider === 'all') {
    const [adzunaResult, remotiveResult] = await Promise.allSettled([
      fetchAdzunaJobs(search),
      fetchRemotiveJobs(search),
    ]);

    const adzunaJobs = adzunaResult.status === 'fulfilled' ? adzunaResult.value : [];
    const remotiveJobs = remotiveResult.status === 'fulfilled' ? remotiveResult.value : [];
    const combinedJobs = [...adzunaJobs, ...remotiveJobs];

    return combinedJobs.length ? combinedJobs : getFakeJobs();
  }

  return getFakeJobs();
};
