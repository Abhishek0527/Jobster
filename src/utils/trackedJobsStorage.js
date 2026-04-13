const TRACKED_JOBS_KEY = 'trackedJobs';

export const getTrackedJobsFromStorage = () => {
  const rawValue = localStorage.getItem(TRACKED_JOBS_KEY);
  return rawValue ? JSON.parse(rawValue) : [];
};

export const addTrackedJobToStorage = (job) => {
  const existingJobs = getTrackedJobsFromStorage();
  const updatedJobs = [job, ...existingJobs];
  localStorage.setItem(TRACKED_JOBS_KEY, JSON.stringify(updatedJobs));
  return updatedJobs;
};

export const deleteTrackedJobFromStorage = (jobId) => {
  const existingJobs = getTrackedJobsFromStorage();
  const updatedJobs = existingJobs.filter((job) => job.id !== jobId);
  localStorage.setItem(TRACKED_JOBS_KEY, JSON.stringify(updatedJobs));
  return updatedJobs;
};
