import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import ModalWrapper from '../assets/wrappers/ApplyJobModal';
import { submitFakeApplication } from '../utils/fakeJobsApi';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

const initialState = {
  firstName: '',
  lastName: '',
  hasExperience: 'no',
  companyName: '',
  expYears: '',
  profileSummary: '',
  role: '',
  collegeName: '',
  percentage: '',
  cvFileName: '',
};

const ApplyJobForm = ({ job, onClose }) => {
  const [values, setValues] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues(initialState);
  }, [job]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setValues((current) => ({
      ...current,
      cvFileName: file ? file.name : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.firstName || !values.lastName || !values.collegeName || !values.percentage) {
      toast.error('Please fill out the required details');
      return;
    }

    if (!values.cvFileName) {
      toast.error('Please upload your CV');
      return;
    }

    if (
      values.hasExperience === 'yes' &&
      (!values.companyName || !values.expYears || !values.profileSummary || !values.role)
    ) {
      toast.error('Please complete the experience section');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      jobId: job._id,
      jobTitle: job.title,
      ...values,
    };

    const result = await submitFakeApplication(payload);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(`Application submitted for ${job.title}`);
      onClose();
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <div className='modal-shell' onClick={(event) => event.stopPropagation()}>
        <div className='modal-topbar'>
          <div className='modal-title'>
            <h3>Easy Apply</h3>
            <p>
              {job.title} at {job.company}
            </p>
          </div>
          <button type='button' className='close-btn' onClick={onClose} aria-label='Close apply form'>
            ×
          </button>
        </div>
        <Wrapper>
          <form className='form' onSubmit={handleSubmit}>
            <h3>apply for {job.title}</h3>
            <div className='form-center'>
              <FormRow
                type='text'
                name='firstName'
                labelText='first name'
                value={values.firstName}
                handleChange={handleChange}
              />
              <FormRow
                type='text'
                name='lastName'
                labelText='last name'
                value={values.lastName}
                handleChange={handleChange}
              />
              <FormRowSelect
                name='hasExperience'
                labelText='experience'
                value={values.hasExperience}
                handleChange={handleChange}
                list={['no', 'yes']}
              />
              <FormRow
                type='text'
                name='collegeName'
                labelText='college name'
                value={values.collegeName}
                handleChange={handleChange}
              />
              <FormRow
                type='number'
                name='percentage'
                labelText='percentage'
                value={values.percentage}
                handleChange={handleChange}
              />
              <div className='form-row'>
                <label htmlFor='cvUpload' className='form-label'>
                  cv upload
                </label>
                <input id='cvUpload' type='file' className='form-input' onChange={handleFileChange} />
                {values.cvFileName ? <small>{values.cvFileName}</small> : null}
              </div>
              <FormRow
                type='text'
                name='companyName'
                labelText='company name'
                value={values.companyName}
                handleChange={handleChange}
                disabled={values.hasExperience === 'no'}
              />
              <FormRow
                type='number'
                name='expYears'
                labelText='experience years'
                value={values.expYears}
                handleChange={handleChange}
                disabled={values.hasExperience === 'no'}
              />
              <FormRow
                type='text'
                name='role'
                labelText='role'
                value={values.role}
                handleChange={handleChange}
                disabled={values.hasExperience === 'no'}
              />
              <div className='form-row' style={{ gridColumn: '1 / -1' }}>
                <label htmlFor='profileSummary' className='form-label'>
                  profile summary
                </label>
                <textarea
                  id='profileSummary'
                  name='profileSummary'
                  value={values.profileSummary}
                  onChange={handleChange}
                  className='form-textarea'
                  disabled={values.hasExperience === 'no'}
                />
              </div>
              <div className='btn-container' style={{ gridColumn: '1 / -1' }}>
                <button type='button' className='btn clear-btn' onClick={onClose}>
                  cancel
                </button>
                <button type='submit' className='btn submit-btn' disabled={isSubmitting}>
                  {isSubmitting ? 'submitting...' : 'submit'}
                </button>
              </div>
            </div>
          </form>
        </Wrapper>
      </div>
    </ModalWrapper>
  );
};

export default ApplyJobForm;
