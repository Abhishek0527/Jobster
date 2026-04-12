import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutuser } from '../user/userSlice';

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
};

const authHeader = (thunkAPI) => ({
  headers: {
    Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
  },
});

export const createjob = createAsyncThunk('job/createjob', async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      thunkAPI.dispatch(logoutuser());
      return thunkAPI.rejectWithValue('unauthorized logging out............');
    }
    return thunkAPI.rejectWithValue(error?.response?.data?.msg || 'unable to create job');
  }
});

export const editJob = createAsyncThunk('job/editJob', async ({ jobId, jobData }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, jobData, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      thunkAPI.dispatch(logoutuser());
      return thunkAPI.rejectWithValue('unauthorized logging out............');
    }
    return thunkAPI.rejectWithValue(error?.response?.data?.msg || 'unable to update job');
  }
});

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
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createjob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createjob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Created');
      })
      .addCase(createjob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        state.isEditing = false;
        state.editJobId = '';
        toast.success('Job Updated');
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default jobslice.reducer;
export const { handleChange, setEditJob, clearValues } = jobslice.actions;
