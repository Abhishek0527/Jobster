import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { logoutuser } from '../user/userSlice';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const authHeader = (thunkAPI) => ({
  headers: {
    Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
  },
});

export const getAllJobs = createAsyncThunk('allJobs/getAllJobs', async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;

  try {
    const params = new URLSearchParams();
    params.set('page', page);
    if (search) params.set('search', search);
    if (searchStatus !== 'all') params.set('status', searchStatus);
    if (searchType !== 'all') params.set('jobType', searchType);
    if (sort) params.set('sort', sort);

    const resp = await customFetch.get(`/jobs?${params.toString()}`, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      thunkAPI.dispatch(logoutuser());
      return thunkAPI.rejectWithValue('unauthorized logging out............');
    }
    return thunkAPI.rejectWithValue(error?.response?.data?.msg || 'unable to fetch jobs');
  }
});

export const showStats = createAsyncThunk('allJobs/showStats', async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/stats', authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      thunkAPI.dispatch(logoutuser());
      return thunkAPI.rejectWithValue('unauthorized logging out............');
    }
    return thunkAPI.rejectWithValue(error?.response?.data?.msg || 'unable to load stats');
  }
});

export const deleteJob = createAsyncThunk('allJobs/deleteJob', async (jobId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`, authHeader(thunkAPI));
    thunkAPI.dispatch(getAllJobs());
    thunkAPI.dispatch(showStats());
    toast.success('Job removed');
    return { jobId, ...resp.data };
  } catch (error) {
    if (error?.response?.status === 401) {
      thunkAPI.dispatch(logoutuser());
      return thunkAPI.rejectWithValue('unauthorized logging out............');
    }
    return thunkAPI.rejectWithValue(error?.response?.data?.msg || 'unable to delete job');
  }
});

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState, page: 1 };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs || [];
        state.totalJobs = payload.totalJobs || 0;
        state.numOfPages = payload.numOfPages || 1;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats || {};
        state.monthlyApplications = payload.monthlyApplications || [];
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearFilters, changePage, clearAllJobsState } =
  allJobsSlice.actions;
export default allJobsSlice.reducer;
