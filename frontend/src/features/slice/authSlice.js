import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user; // Set user data
      state.isAuthenticated = true;
      state.token = action.payload.token; // Set token
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null; // Clear token
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
