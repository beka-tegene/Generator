import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InputRegister: [],
  InputLogin: [],
  isLoading: false,
};

const AuthHook = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoginData(state) {
      state.isLoading = false;
    },
    setLogin(state, action) {
      state.isLoading = true;
      const newData = action.payload;
      state.InputLogin.push({
        email: newData.email,
        password: newData.password,
      });
    },
    setRegisterData(state) {},
    setRegister(state, action) {
      const newData = action.payload;
      state.InputRegister.push({
        position: newData.position,
        email: newData.email,
        password: newData.password,
        FullName: newData.FullName,
        userType: newData.userType,
      });
    },
  },
});

export const { setRegister, setRegisterData, setLoginData, setLogin } =
  AuthHook.actions;

export default AuthHook.reducer;
