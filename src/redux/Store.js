import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';

// Create the store
const store = configureStore({
  reducer: {
    company: companyReducer, 
  },
});

export default store;
