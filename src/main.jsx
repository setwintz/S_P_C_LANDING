import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx';
import './index.css';

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import store, { persistor } from './store/index.js';
import ToastContainer from './components/toastContainer/ToastContainer.jsx';
import UnsavedChangesModal from './components/UnsavedChangesModel.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      {/* Pass the persistor prop here */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <UnsavedChangesModal />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
