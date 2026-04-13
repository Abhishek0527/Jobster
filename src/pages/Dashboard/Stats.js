import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ChartsContainer, StatsContainer } from '../../components';
import {
  deleteTrackedJobFromStorage,
  getTrackedJobsFromStorage,
} from '../../utils/trackedJobsStorage';

const Stats = () => {
  const [trackedJobs, setTrackedJobs] = useState([]);

  useEffect(() => {
    setTrackedJobs(getTrackedJobsFromStorage());
  }, []);

  const handleDelete = (jobId) => {
    const updatedJobs = deleteTrackedJobFromStorage(jobId);
    setTrackedJobs(updatedJobs);
    toast.success('Tracked job removed');
  };

  return (
    <>
      <StatsContainer trackedJobs={trackedJobs} />
      <ChartsContainer trackedJobs={trackedJobs} onDelete={handleDelete} />
    </>
  );
};

export default Stats;
