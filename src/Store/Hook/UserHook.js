import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OutputByIdUser: [],
  OutputUser: [],
  InputDeleteIdUser: [],
  InputUpdateUser: [],
  InputUpdatepasswordUser: [],
};

const UserHook = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserData(state) {},
    getUser(state, action) {
      state.OutputUser = action.payload;
    },
    getByIdUserData(state) {},
    getByIdUser(state, action) {
      state.OutputByIdUser = action.payload;
    },
    setDeleteIdUserData(state) {},
    setDeleteIdUser(state, action) {
      const newData = action.payload;
      state.InputDeleteIdUser.push({
        id: newData.id,
      });
    },
    setUpdateUserData(state) {},
    setUpdateUser(state, action) {
      const newData = action.payload;
      state.InputUpdateUser.push({
        position: newData.position,
        email: newData.email,
        FullName: newData.FullName,
        userType: newData.userType,
      });
    },
    setUpdatepasswordUserData(state) {},
    setUpdatepasswordUser(state, action) {
      const newData = action.payload;
      state.InputUpdatepasswordUser.push({
        oldPassword: newData.oldPassword,
        password: newData.password,
      });
    },
  },
});

export const {
  getByIdUserData,
  getByIdUser,
  getUserData,
  getUser,
  setDeleteIdUserData,
  setDeleteIdUser,
  setUpdateUserData,
  setUpdateUser,
  setUpdatepasswordUserData,
  setUpdatepasswordUser,
} = UserHook.actions;

export default UserHook.reducer;
