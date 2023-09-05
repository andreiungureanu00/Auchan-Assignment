import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authStatus: false,
    userID: -1,
  },
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
  },
});

export const { setAuthStatus, setUserID } = userSlice.actions;
export const getAuthStatus = (state) => state.user.authStatus;
export const getUserID = (state) => state.user.userID;
export default userSlice.reducer;
