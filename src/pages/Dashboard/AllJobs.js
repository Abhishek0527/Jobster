import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SearchContainer, JobsContainer } from '../../components';
import ApplyJobForm from '../../components/ApplyJobForm';
import { getJobsFromProvider } from '../../utils/jobProviders';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const data = await getJobsFromProvider({ provider, search });
        if (isMounted) {
          setJobs(data);
        }
      } catch (error) {
        if (isMounted) {
          setJobs([]);
          toast.error('Unable to load remote jobs right now');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [provider, search]);

  return (
    <>
      <SearchContainer
        search={search}
        provider={provider}
        onSearchChange={(e) => setSearch(e.target.value)}
        onProviderChange={(e) => setProvider(e.target.value)}
        onClear={() => {
          setSearch('');
          setProvider('all');
        }}
      />
      <JobsContainer jobs={jobs} isLoading={isLoading} onApply={setSelectedJob} />
      {selectedJob ? <ApplyJobForm job={selectedJob} onClose={() => setSelectedJob(null)} /> : null}
    </>
  );
};

export default AllJobs;
