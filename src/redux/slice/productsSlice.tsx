import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  [key: string]: any;
}

const initialState: ProductsState = {};

const productsSlice = createSlice({
  name: "productsData",
  initialState,
  reducers: {
    setProductsData(
      state,
      action: PayloadAction<{ label: string; data: any }>
    ) {
      const { label, data } = action.payload;
      return {
        ...state,
        [label]: data,
      };
    },
  },
});

export const { setProductsData } = productsSlice.actions;

export default productsSlice.reducer;
