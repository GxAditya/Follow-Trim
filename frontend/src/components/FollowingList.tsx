import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Following } from '../types';

interface Props {
  following: Following[];
  onUnfollow: (userIds: string[]) => void;
}

const FollowingList: React.FC<Props> = ({ following, onUnfollow }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'date' | 'interaction' | 'name'>('name');
  const [showMutuals, setShowMutuals] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  
  const debouncedSearch = useDebounce(search, 300);

  const filteredFollowing = following
    .filter(user => {
      if (showMutuals && !user.isMutual) return false;
      if (debouncedSearch && !user.username.toLowerCase().includes(debouncedSearch.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'date':
          return new Date(b.followDate).getTime() - new Date(a.followDate).getTime();
        case 'interaction':
          return new Date(b.lastInteraction || 0).getTime() - new Date(a.lastInteraction || 0).getTime();
        default:
          return a.username.localeCompare(b.username);
      }
    });

  const handleBatchUnfollow = () => {
    if (window.confirm(`Unfollow ${selected.length} users?`)) {
      onUnfollow(selected);
      setSelected([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="px-4 py-2 border rounded"
        >
          <option value="name">Sort by name</option>
          <option value="date">Sort by follow date</option>
          <option value="interaction">Sort by last interaction</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showMutuals}
            onChange={(e) => setShowMutuals(e.target.checked)}
          />
          Mutuals only
        </label>
      </div>

      {selected.length > 0 && (
        <button
          onClick={handleBatchUnfollow}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Unfollow Selected ({selected.length})
        </button>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredFollowing.map(user => (
          <div 
            key={user.id}
            className="p-4 border rounded flex items-center gap-4"
          >
            <input
              type="checkbox"
              checked={selected.includes(user.followedUserId)}
              onChange={(e) => {
                setSelected(prev => 
                  e.target.checked
                    ? [...prev, user.followedUserId]
                    : prev.filter(id => id !== user.followedUserId)
                );
              }}
            />
            <div>
              <h3 className="font-bold">{user.username}</h3>
              <p className="text-sm text-gray-500">
                Following since {new Date(user.followDate).toLocaleDateString()}
              </p>
              {user.lastInteraction && (
                <p className="text-sm text-gray-500">
                  Last interaction: {new Date(user.lastInteraction).toLocaleDateString()}
                </p>
              )}
              {user.isMutual && (
                <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                  Mutual
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingList;
