import React from 'react';
import { useDispatch } from 'react-redux';
import { loginWithPlatform } from '../store/slices/authSlice';
import { AppDispatch } from '../store';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-8">FollowTrim</h1>
        <div className="space-y-4">
          <button
            onClick={() => dispatch(loginWithPlatform('instagram'))}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded"
          >
            Login with Instagram
          </button>
          <button
            onClick={() => dispatch(loginWithPlatform('twitter'))}
            className="w-full py-2 px-4 bg-blue-400 text-white rounded"
          >
            Login with Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
