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

const jobslice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: ((state, { payload: { name, value } }) => {
      state[name] = value
    }),
    clearValues: () => {
      return { ...initialState, jobLocation: getUserFromLocalStorage()?.location || '' }
    }
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
       
}
})
export const createjob = createAsyncThunk('job/createjob', async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    thunkAPI.dispatch(clearValues());
    return resp.data
  }
  catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutuser())
      return thunkAPI.rejectWithValue("unauthorized logging out............")
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})
export default jobslice.reducer
export const { handleChange, clearValues } = jobslice.actions