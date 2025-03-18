import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Following } from '../../types';
import { api } from '../../services/api';

interface FollowingState {
  following: Following[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowingState = {
  following: [],
  loading: false,
  error: null,
};

export const fetchFollowing = createAsyncThunk(
  'following/fetchFollowing',
  async () => {
    const response = await api.get('/following');
    return response.data;
  }
);

export const unfollowUsers = createAsyncThunk(
  'following/unfollowUsers',
  async (userIds: string[]) => {
    const response = await api.post('/following/unfollow', { userIds });
    return userIds;
  }
);

const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
        state.loading = false;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(unfollowUsers.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (user) => !action.payload.includes(user.followedUserId)
        );
      });
  },
});

export default followingSlice.reducer;
