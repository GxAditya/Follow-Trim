import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import { api } from '../../services/api';

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
};

export const loginWithPlatform = createAsyncThunk(
  'auth/loginWithPlatform',
  async (platform: 'instagram' | 'twitter') => {
    const response = await api.post(`/auth/${platform}/login`);
    window.location.href = response.data.authUrl;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Add async action handlers here
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
