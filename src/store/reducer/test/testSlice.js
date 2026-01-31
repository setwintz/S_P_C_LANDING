import { createSlice } from "@reduxjs/toolkit";

const storedCustomer = JSON.parse(localStorage.getItem("SAAS_ERP1_SUPER_ADMIN_INFO"));


export const testSlice = createSlice({
  name: "test",
  initialState: {
    clientUser:  storedCustomer ? storedCustomer : null,
    isAuth: storedCustomer ? true : false,
    haha: "asdfasdf"
  },
  reducers: {
    setClientUser: (state, action) => {
      state.clientUser = action.payload;
      state.isAuth = true;
    },
    logOut: (state, action) => {
      state.clientUser = null;
      state.isAuth = false;
    },
  },
});

export const { setClientUser, logOut } = testSlice.actions;
export default testSlice.reducer;
