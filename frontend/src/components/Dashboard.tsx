import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchFollowing } from '../store/slices/followingSlice';
import { fetchAnalytics } from '../store/slices/analyticsSlice';
import FollowingList from './FollowingList';
import AnalyticsDashboard from './AnalyticsDashboard';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { following, loading: followingLoading } = useSelector((state: RootState) => state.following);
  const { analytics, loading: analyticsLoading } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    if (user) {
      dispatch(fetchFollowing());
      dispatch(fetchAnalytics());
    }
  }, [dispatch, user]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">FollowTrim Dashboard</h1>
        <span className="text-gray-600">
          Connected to {user?.platform}
        </span>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Following Analysis</h2>
          {analyticsLoading ? (
            <div>Loading analytics...</div>
          ) : (
            <AnalyticsDashboard 
              analytics={analytics} 
              platform={user?.platform as 'instagram' | 'twitter'} 
            />
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Following Management</h2>
        {followingLoading ? (
          <div>Loading following list...</div>
        ) : (
          <FollowingList 
            following={following}
            onUnfollow={(userIds) => dispatch(unfollowUsers(userIds))}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
