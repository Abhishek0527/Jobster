import { FaLocationArrow } from 'react-icons/fa';
import { MdWorkHistory } from 'react-icons/md';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

const Job = ({ job, onApply }) => {
  const { title, company, location, experienceRequired, description, employmentType } = job;

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company?.charAt(0) || 'j'}</div>
        <div className='info'>
          <h5>{title}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <p style={{ marginBottom: '1rem', maxWidth: '100%' }}>{description}</p>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<MdWorkHistory />} text={`${employmentType} role`} />
          <JobInfo
            icon={<MdWorkHistory />}
            text={`experience required: ${experienceRequired}`}
          />
        </div>
        <footer>
          <div className='actions' style={{ visibility: 'visible' }}>
            <button type='button' className='btn edit-btn' onClick={() => onApply(job)}>
              apply
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
