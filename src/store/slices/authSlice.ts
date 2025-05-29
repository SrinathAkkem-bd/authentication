import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../utils/auth';
import { apiService } from '../../utils/api';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const githubLogin = createAsyncThunk(
  'auth/githubLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserInfo();
      if (response.status === 200) {
        auth.setSession();
        return response.data;
      }
      return rejectWithValue('Authentication failed');
    } catch (error) {
      return rejectWithValue('GitHub login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    auth.clearSession();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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