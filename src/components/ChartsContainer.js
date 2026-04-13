import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = ({ trackedJobs, onDelete }) => {
  if (!trackedJobs.length) {
    return (
      <Wrapper>
        <h4>tracked jobs</h4>
        <p>No tracked jobs yet. Add one from the Add Job page.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h4>tracked jobs</h4>
      <div className='tracked-list'>
        {trackedJobs.map((job) => (
          <article key={job.id} className='tracked-card'>
            <div className='tracked-header'>
              <div>
                <h5>{job.title}</h5>
                <p>{job.company}</p>
              </div>
              <span className='tracked-status'>{job.status}</span>
            </div>
            <div className='tracked-details'>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Type:</strong> {job.jobType}
              </p>
              <p>
                <strong>Mode:</strong> {job.workMode}
              </p>
              <p>
                <strong>Applied:</strong> {job.appliedDate}
              </p>
              <p>
                <strong>CV:</strong> {job.cvFileName || 'Not uploaded'}
              </p>
            </div>
            {job.notes ? <p className='tracked-notes'>{job.notes}</p> : null}
            <div className='tracked-actions'>
              {job.jobLink ? (
                <a href={job.jobLink} target='_blank' rel='noreferrer' className='btn'>
                  open link
                </a>
              ) : null}
              <button type='button' className='btn btn-danger' onClick={() => onDelete(job.id)}>
                delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </Wrapper>
  );
};

export default ChartsContainer;
