import { useState } from 'react';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import { addTrackedJobToStorage } from '../../utils/trackedJobsStorage';

const initialState = {
  title: '',
  company: '',
  location: '',
  jobType: 'full-time',
  workMode: 'onsite',
  status: 'interested',
  appliedDate: '',
  jobLink: '',
  notes: '',
  cvFileName: '',
};

const AddJob = () => {
  const [values, setValues] = useState(initialState);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.title || !values.company || !values.location || !values.appliedDate) {
      toast.error('Please fill out the required fields');
      return;
    }

    addTrackedJobToStorage({
      id: `tracked-${Date.now()}`,
      ...values,
      createdAt: new Date().toISOString(),
    });

    toast.success('Job saved to this browser');
    setValues(initialState);
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Add tracked job</h3>

        <div className='form-center'>
          <FormRow
            type='text'
            name='title'
            labelText='job title'
            value={values.title}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='company'
            value={values.company}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={values.location}
            handleChange={handleChange}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={values.jobType}
            handleChange={handleChange}
            list={['full-time', 'part-time', 'internship', 'contract']}
          />
          <FormRowSelect
            name='workMode'
            labelText='work mode'
            value={values.workMode}
            handleChange={handleChange}
            list={['onsite', 'remote', 'hybrid']}
          />
          <FormRowSelect
            name='status'
            value={values.status}
            handleChange={handleChange}
            list={['interested', 'applied', 'interview', 'offer', 'rejected']}
          />
          <FormRow
            type='date'
            name='appliedDate'
            labelText='applied date'
            value={values.appliedDate}
            handleChange={handleChange}
          />
          <FormRow
            type='url'
            name='jobLink'
            labelText='job link'
            value={values.jobLink}
            handleChange={handleChange}
          />
          <div className='form-row'>
            <label htmlFor='cvUpload' className='form-label'>
              cv upload (optional)
            </label>
            <input id='cvUpload' type='file' className='form-input' onChange={handleFileChange} />
            {values.cvFileName ? <small>{values.cvFileName}</small> : null}
          </div>
          <div className='form-row' style={{ gridColumn: '1 / -1' }}>
            <label htmlFor='notes' className='form-label'>
              notes
            </label>
            <textarea
              id='notes'
              name='notes'
              value={values.notes}
              onChange={handleChange}
              className='form-textarea'
              placeholder='Add HR details, follow-up reminders, interview notes, or anything important'
            />
          </div>
          <div className='btn-container' style={{ gridColumn: '1 / -1' }}>
            <button type='button' className='btn clear-btn' onClick={() => setValues(initialState)}>
              clear
            </button>
            <button type='submit' className='btn submit-btn'>
              save job
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
