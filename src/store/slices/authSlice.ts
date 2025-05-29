import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../utils/auth';
import { apiService } from '../../utils/api';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!auth.getSession(),
  isLoading: false,
  error: null,
};

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserInfo();
      return response.data;
    } catch (error) {
      auth.clearSession();
      return rejectWithValue('Authentication failed');
    }
  }
);

export const githubLogin = createAsyncThunk(
  'auth/githubLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue('GitHub login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiService.logout();
      auth.clearSession();
      return;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(githubLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(githubLogin.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(githubLogin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;