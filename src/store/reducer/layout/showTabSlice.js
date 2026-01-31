import { createSlice } from "@reduxjs/toolkit";


export const showTabSlice = createSlice({
  name: "showTab",
  initialState: {
    show: false,
  },
  reducers: {
    setTrueForShow: (state, action) => {
      state.show = true;
    },
    setFalseForShow: (state, action) => {
      state.show = false;
    },
  },
});

export const { setTrueForShow, setFalseForShow } = showTabSlice.actions;
export default showTabSlice.reducer;
