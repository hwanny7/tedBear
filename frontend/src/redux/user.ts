import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('accessToken');
      state.isLogin = false;
    },
    login: state => {
      state.isLogin = true;
    },
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
