import { createSlice } from "@reduxjs/toolkit";


export const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    organization:  null
  },
  reducers: {
    setOrganization: (state, action) => {
      state.organization = action.payload;
    },
    removeOrganization: (state, action) => {
      state.organization = null;
    },
  },
});

export const { setOrganization, removeOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
