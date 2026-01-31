import { createSlice } from "@reduxjs/toolkit";


export const onPageSlice = createSlice({
  name: "onPage",
  initialState: {
    createPage: false,
    editPage: false,
    viewPage: false,
    saveFunction: () => {

    },

  },
  reducers: {
    setTrueForCreatePage: (state, action) => {
      state.createPage = true;
    },
    setFalseForCreatePage: (state, action) => {
      state.createPage = false;
    },
    setTrueForEditPage: (state, action) => {
      state.editPage = true;
    },
    setFalseForEditPage: (state, action) => {
      state.editPage = false;
    },

    setSaveFunction: (state, action) => {
      state.saveFunction = action.payload;
    },
  },
});

export const {
  setTrueForCreatePage,
  setFalseForCreatePage,
  setTrueForEditPage,
  setFalseForEditPage,
  setSaveFunction,

} = onPageSlice.actions;
export default onPageSlice.reducer;
