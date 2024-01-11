import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

const formatProductPrice = (price: number): string => {
  const decimalFormat = new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  return decimalFormat.format(price);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.product_orders_in_cart =
          (existingProduct.product_orders_in_cart || 0) + 1;
      } else {
        const formattedProduct: Product = {
          ...action.payload,
          product_price_formatted: formatProductPrice(
            action.payload.product_price
          ),
          product_orders_in_cart: 1,
        };
        state.products.push(formattedProduct);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
        existingProduct.product_orders_in_cart =
          (existingProduct.product_orders_in_cart || 0) - 1;

        if (existingProduct.product_orders_in_cart <= 0) {
          state.products.splice(existingProductIndex, 1);
        }
      }
    },
    clearCart(state) {
      state.products = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
