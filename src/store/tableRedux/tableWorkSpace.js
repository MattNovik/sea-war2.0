import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const generateArray = (length) =>
  [...new Array(length)].map(function () {
    return {
      mean: 0,
      id: nanoid(),
    };
  });

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tableSpace: generateArray(100),
    ships: {
      a: { top: 0, left: 0, count: 4, position: 'absolute' },
      b: { top: 0, left: 40, count: 4, position: 'absolute' },
    },
  },
  reducers: {
    moveBox: (state, action) => {
      let { id, left, top, count, position } = action.payload;
      state.ships[action.payload.newId].top = top;
      state.ships[action.payload.newId].left = left;
    },
  },
});

export const { moveBox } = tableSlice.actions;

export default tableSlice.reducer;
