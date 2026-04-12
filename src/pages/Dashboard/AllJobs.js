import { useEffect, useMemo, useState } from 'react';
import { SearchContainer, JobsContainer } from '../../components';
import ApplyJobForm from '../../components/ApplyJobForm';
import { getFakeJobs } from '../../utils/fakeJobsApi';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setIsLoading(true);
      const data = await getFakeJobs();
      if (isMounted) {
        setJobs(data);
        setIsLoading(false);
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return jobs;
    }

    return jobs.filter((job) =>
      [job.title, job.company, job.location, job.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [jobs, search]);

  return (
    <>
      <SearchContainer
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
      />
      <JobsContainer jobs={filteredJobs} isLoading={isLoading} onApply={setSelectedJob} />
      {selectedJob ? <ApplyJobForm job={selectedJob} onClose={() => setSelectedJob(null)} /> : null}
    </>
  );
};

export default AllJobs;
