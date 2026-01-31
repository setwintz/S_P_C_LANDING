// 1. unsavedChangesSlice.js (With pendingPath)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasUnsavedChanges: false,
  pendingPath: null,
  showModal: false,
};

const unsavedChangesSlice = createSlice({
  name: 'unsavedChanges',
  initialState,
  reducers: {
    setHasUnsavedChanges(state, action) {
      state.hasUnsavedChanges = action.payload;
    },
    openModal(state, action) {
      state.pendingPath = action.payload; // Store intended path
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
      state.pendingPath = null;
    },
    confirmLeave(state) {
      state.hasUnsavedChanges = false;
      state.showModal = false;
      state.pendingPath = null;
    },
  },
});

export const {
  setHasUnsavedChanges,
  openModal,
  closeModal,
  confirmLeave,
} = unsavedChangesSlice.actions;

export default unsavedChangesSlice.reducer;