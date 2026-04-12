import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import Loading from './Loading';

const JobsContainer = ({ jobs, isLoading, onApply }) => {
  if (isLoading) {
    return <Loading center />;
  }

  if (!jobs.length) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {jobs.length} job{jobs.length !== 1 ? 's' : ''} available
      </h5>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job key={job._id} job={job} onApply={onApply} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
