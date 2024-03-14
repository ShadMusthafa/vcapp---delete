import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*interface Item {
  name: string;
  category: string;
  price: number;
}*/

interface Item {
  _id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

interface FilterState {
  filteredItems: Item[];
}

const initialState: FilterState = {
  filteredItems: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_ITEMS(
      state,
      action: PayloadAction<{ items: Item[]; search: string }>
    ) {
      const { items, search } = action.payload;
      const tempItems = items.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.price.toString().includes(search)
        );
      });
      state.filteredItems = tempItems;
    },
  },
});

export const { FILTER_ITEMS } = filterSlice.actions;

export const selectFilteredItems = (state: { filter: FilterState }) =>
  state.filter.filteredItems;

export default filterSlice.reducer;
