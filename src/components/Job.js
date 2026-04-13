import { FaLocationArrow } from 'react-icons/fa';
import { MdWorkHistory } from 'react-icons/md';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

const Job = ({ job, onApply }) => {
  const { title, company, location, experienceRequired, description, employmentType, source, applyUrl } = job;

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
        <p className='job-description'>{description}</p>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<MdWorkHistory />} text={`${employmentType} role`} />
          <JobInfo
            icon={<MdWorkHistory />}
            text={`experience required: ${experienceRequired}`}
          />
          <JobInfo icon={<MdWorkHistory />} text={`source: ${source || 'local'}`} />
        </div>
        <footer>
          <div className='actions' style={{ visibility: 'visible' }}>
            <button type='button' className='btn edit-btn' onClick={() => onApply(job)}>
              apply
            </button>
            {applyUrl ? (
              <a
                href={applyUrl}
                target='_blank'
                rel='noreferrer'
                className='btn delete-btn'
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                view source
              </a>
            ) : null}
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
