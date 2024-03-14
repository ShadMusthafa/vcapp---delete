import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	addBookmark,
	deleteBookmark,
	getAllBookmarkeds,
	getAllEntertainments,
	getSingleEntertainment,
} from '../../../utils/api';

interface InitialState {
	entertainments: [];
	singleEntertainment: {};
	bookmarkeds: NewBookmark[];
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: unknown;
}

export interface NewBookmark {
	_id: string;
	category: string;
	isTrending: boolean;
	isBookmarked: boolean;
	rating: string;
	title: string;
	year: number;
	thumbnail?: {
		regular: {
			large: string;
			medium: string;
			small: string;
		};
		trending?: {
			large: string;
			small: string;
		};
	};
}

const initialState: InitialState = {
	entertainments: [],
	singleEntertainment: {},
	bookmarkeds: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getEntertainments = createAsyncThunk(
	'entertainments/getAll',
	async (_: void, thunkAPI) => {
		try {
			return await getAllEntertainments();
		} catch (error: any) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getEntertainment = createAsyncThunk(
	'entertainment/getSingleEntertainment',
	async (id: string, thunkAPI) => {
		try {
			return await getSingleEntertainment(id);
		} catch (error: any) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const addNewBookmark = createAsyncThunk(
	'bookmarks/addNewBookmark',
	async (newBookmark: NewBookmark, thunkAPI) => {
		try {
			return await addBookmark(newBookmark);
		} catch (error: any) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deleteSingleBookmark = createAsyncThunk(
	'bookmarks/deleteBookmark',
	async (id: string, thunkAPI) => {
		try {
			return await deleteBookmark(id);
		} catch (error: any) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getBookmarkeds = createAsyncThunk(
	'bookmarks/getAll',
	async (_: void, thunkAPI) => {
		try {
			return await getAllBookmarkeds();
		} catch (error: any) {
			const message =
				(error.response && error.response.data && error.response.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const entertainmentSlice = createSlice({
	name: 'entertainments',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getEntertainments.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getEntertainments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.entertainments = action.payload;
			})
			.addCase(getEntertainments.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getEntertainment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getEntertainment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.singleEntertainment = action.payload;
			})
			.addCase(getEntertainment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getBookmarkeds.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBookmarkeds.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.bookmarkeds = action.payload;
			})
			.addCase(getBookmarkeds.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addNewBookmark.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addNewBookmark.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.bookmarkeds.push(action.payload);
				toast.success('Successfully bookmarked.');
			})
			.addCase(addNewBookmark.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteSingleBookmark.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteSingleBookmark.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				toast.success('Successfully removed from bookmarks.');
			})
			.addCase(deleteSingleBookmark.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const {} = entertainmentSlice.actions;

export default entertainmentSlice.reducer;
