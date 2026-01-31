import { createSlice } from "@reduxjs/toolkit";


export const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    tenant:  null
  },
  reducers: {
    setTenant: (state, action) => {
      state.tenant = action.payload;
    },
    removeTenant: (state, action) => {
      state.tenant = null;
    },
  },
});

export const { setTenant, removeTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
