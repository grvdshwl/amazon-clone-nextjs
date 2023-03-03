import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const itemIndex = state.items.findIndex((basketItem) => {
        return basketItem.id === action.payload.id;
      });
      let newBasket = [...state.items];

      if (itemIndex >= 0) {
        newBasket.splice(itemIndex, 1);
      } else {
        console.warn("Cannot remove product which is not in basket.");
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectItemsTotal = (state) =>
  state.basket.items.reduce((acc, item) => acc + item.price, 0);

export default basketSlice.reducer;
