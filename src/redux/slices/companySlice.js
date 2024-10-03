// redux/slices/companySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyName: '',
  companyId: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyInfo(state, action) {
      state.companyName = action.payload.companyName;
      state.companyId = action.payload.companyId;
    },
    clearCompanyInfo(state) {
      state.companyName = '';
      state.companyId = '';
    },
  },
});

export const { setCompanyInfo, clearCompanyInfo } = companySlice.actions;

export default companySlice.reducer;
