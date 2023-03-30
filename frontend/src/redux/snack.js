import { createSlice } from '@reduxjs/toolkit';

// 리덕스에 array 형태로 다 넣을 수 있음
const initialStateValue = {
  open: false,
  vertical: 'top',
  horizontal: 'right',
  message: '',
  severity: 'success',
};

const snackSlice = createSlice({
  name: 'snack',
  initialState: initialStateValue,
  reducers: {
    /** open, message */
    handleSuccessState: (state, action) => {
      console.log(
        'handleSuccessState reducer called with payload:',
        action.payload,
      );
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    // handleErrorState: (state, action) => {
    //   console.log(
    //     'handleErrorState reducer called with payload:',
    //     action.payload,
    //   );
    //   state.open = action.payload.open;
    //   state.message = action.payload.message;
    //   state.severity = 'error';
    // },
  },
});

export const { handleSuccessState } = snackSlice.actions;
// export const { handleSuccessState, handleErrorState } = snackSlice.actions;

export default snackSlice.reducer;
