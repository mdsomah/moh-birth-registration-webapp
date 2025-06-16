import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewUser: null,
  editUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setViewUser: (state, action) => {
      state.viewUser = action.payload;
    },
    removeViewUser: (state, _action) => {
      state.viewUser = null;
    },
    setEditUser: (state, action) => {
      state.editUser = action.payload;
    },
    removeEditUser: (state, _action) => {
      state.editUser = null;
    },
  },
});

export const { setViewUser, removeViewUser, setEditUser, removeEditUser } =
  userSlice.actions;
export const getViewUser = (state) => state.user.viewUser;
export default userSlice.reducer;
