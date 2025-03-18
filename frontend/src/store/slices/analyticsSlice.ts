import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Analytics } from '../../types';
import { api } from '../../services/api';

interface AnalyticsState {
  analytics: Analytics[];
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  analytics: [],
  loading: false,
  error: null,
};

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async () => {
    const response = await api.get('/analytics');
    return response.data;
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
        state.loading = false;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export default analyticsSlice.reducer;
