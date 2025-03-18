export interface User {
  id: string;
  username: string;
  platform: 'instagram' | 'twitter';
  createdAt: string;
  updatedAt: string;
}

export interface Following {
  id: string;
  userId: string;
  followedUserId: string;
  username: string;
  followDate: string;
  lastInteraction?: string;
  isMutual: boolean;
  engagementScore: number;
}

export interface Analytics {
  id: string;
  userId: string;
  followCount: number;
  date: string;
  platform: 'instagram' | 'twitter';
  engagementScore: number;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}
