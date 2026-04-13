import { createSlice } from '@reduxjs/toolkit';

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
  error: null,
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      state.search = initialFiltersState.search;
      state.searchStatus = initialFiltersState.searchStatus;
      state.searchType = initialFiltersState.searchType;
      state.sort = initialFiltersState.sort;
      state.page = 1;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: () => initialState,
    getAllJobsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getAllJobsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs || [];
      state.totalJobs = payload.totalJobs || 0;
      state.numOfPages = payload.numOfPages || 1;
    },
    getAllJobsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    showStatsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    showStatsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats || {};
      state.monthlyApplications = payload.monthlyApplications || [];
    },
    showStatsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    deleteJobRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteJobSuccess: (state) => {
      state.isLoading = false;
    },
    deleteJobFailure: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
  getAllJobsRequest,
  getAllJobsSuccess,
  getAllJobsFailure,
  showStatsRequest,
  showStatsSuccess,
  showStatsFailure,
  deleteJobRequest,
  deleteJobSuccess,
  deleteJobFailure,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
