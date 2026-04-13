import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
  error: null,
};

const jobslice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    setEditJob: (state, { payload }) => {
      const { _id, position, company, jobLocation, jobType, status } = payload;
      state.isEditing = true;
      state.editJobId = _id;
      state.position = position;
      state.company = company;
      state.jobLocation = jobLocation;
      state.jobType = jobType;
      state.status = status;
    },
    clearValues: () => ({
      ...initialState,
      jobLocation: getUserFromLocalStorage()?.location || '',
    }),
    createjobRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createjobSuccess: (state) => {
      state.isLoading = false;
    },
    createjobFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    editJobRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    editJobSuccess: (state) => {
      state.isLoading = false;
      state.isEditing = false;
      state.editJobId = '';
    },
    editJobFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default jobslice.reducer;
export const {
  handleChange,
  setEditJob,
  clearValues,
  createjobRequest,
  createjobSuccess,
  createjobFailure,
  editJobRequest,
  editJobSuccess,
  editJobFailure,
} = jobslice.actions;
