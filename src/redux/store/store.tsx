import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoryReducer from "../slice/categorySlice";
import productsReducer from "../slice/productsSlice";
import cartReducer from "../slice/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);
const persistedProductsReducer = persistReducer(persistConfig, productsReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    category: persistedCategoryReducer,
    products: persistedProductsReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
