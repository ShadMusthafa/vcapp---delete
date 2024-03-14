import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  addNewItem,
  deleteItem,
  getAllItems,
  getSingleItem,
  updateSingleItem,
} from "../../../utils/api";

interface Item {
  _id: number;
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
}

interface ItemState {
  itemID: number;
  item: Item | null;
  items: Item[];
  isAddItemModalOpen: boolean;
  isDeleteItemModalOpen: boolean;
  isItemDetailsModalOpen: boolean;
  isEditItemModalOpen: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
  totalStoreValue: number;
  itemsOutOfStock: number;
}

interface RootState {
  item: ItemState;
}

const initialState: ItemState = {
  itemID: 0,
  item: null,
  items: [],
  isAddItemModalOpen: false,
  isDeleteItemModalOpen: false,
  isItemDetailsModalOpen: false,
  isEditItemModalOpen: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  itemsOutOfStock: 0,
};

/*interface FormData {
  name: string;
  email: string;
  phonenumber: number;
  bio: string;
}*/

/*interface UpdateFormItem {
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  image: string | File | any;
  createdAt: Date;
}

interface ItemData {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  image: null;
}*/

export const addItem = createAsyncThunk(
  "products/create",
  async (itemData: any, thunkAPI) => {
    try {
      return await addNewItem(itemData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getItems = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await getAllItems();
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getItem = createAsyncThunk(
  "products/getSingleItem",
  async (id: number, thunkAPI) => {
    try {
      return await getSingleItem(id);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateItem = createAsyncThunk(
  "products/updateItem",
  async ({ itemID, formData }: { itemID: number; formData: any }, thunkAPI) => {
    try {
      return await updateSingleItem(itemID, formData);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSingleItem = createAsyncThunk(
  "products/delete",
  async (id: number, thunkAPI) => {
    try {
      return await deleteItem(id);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action: PayloadAction<Item[]>) {
      const items = action.payload;
      const allItemsValue: number[] = [];
      items.map((item) => {
        const { price, quantity } = item;
        const itemValue = price * quantity;
        return allItemsValue.push(itemValue);
      });
      const totalValue = allItemsValue.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUT_OF_STOCK(state, action: PayloadAction<Item[]>) {
      const items = action.payload;
      const allItemsOutOfStock: number[] = [];
      items.filter((item) => {
        const { quantity } = item;
        if (quantity == 0) {
          return allItemsOutOfStock.push(quantity);
        }
      });

      const totalItems = allItemsOutOfStock.length;
      state.itemsOutOfStock = totalItems;
    },
    SET_ADD_ITEM_MODAL(state, action: PayloadAction<boolean>) {
      state.isAddItemModalOpen = action.payload;
    },
    SET_EDIT_ITEM_MODAL(state, action: PayloadAction<boolean>) {
      state.isEditItemModalOpen = action.payload;
    },
    SET_DELETE_ITEM_MODAL(state, action: PayloadAction<boolean>) {
      state.isDeleteItemModalOpen = action.payload;
    },
    SET_ITEM_DETAILS_MODAL(state, action: PayloadAction<boolean>) {
      state.isItemDetailsModalOpen = action.payload;
    },
    SET_ITEM_ID(state, action: PayloadAction<number>) {
      state.itemID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.items.push(action.payload);
        toast.success("Item added succesfully.");
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteSingleItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSingleItem.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Item successfully deleted");
      })
      .addCase(deleteSingleItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.item = action.payload;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Item succesfully updated");
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      });
  },
});

export const {
  CALC_STORE_VALUE,
  CALC_OUT_OF_STOCK,
  SET_ADD_ITEM_MODAL,
  SET_EDIT_ITEM_MODAL,
  SET_DELETE_ITEM_MODAL,
  SET_ITEM_ID,
  SET_ITEM_DETAILS_MODAL,
} = itemSlice.actions;

export const selectIsLoading = (state: RootState) => state.item.isLoading;
export const selectIsOpenAddItemModal = (state: RootState) =>
  state.item.isAddItemModalOpen;
export const selectIsOpenEditItemModal = (state: RootState) =>
  state.item.isEditItemModalOpen;
export const selectIsOpenDeleteItemModal = (state: RootState) =>
  state.item.isDeleteItemModalOpen;
export const selectisOpenItemDetailsModal = (state: RootState) =>
  state.item.isItemDetailsModalOpen;
export const selectItemID = (state: RootState) => state.item.itemID;
export const selectTotalStoreValue = (state: RootState) =>
  state.item.totalStoreValue;
export const selectItemsOutOfStock = (state: RootState) =>
  state.item.itemsOutOfStock;

export default itemSlice.reducer;
