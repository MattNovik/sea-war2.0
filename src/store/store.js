import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from './counter/counterSlice';
import tableWorkSpace from './tableRedux/tableWorkSpace';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    table: tableWorkSpace,
  },
});
