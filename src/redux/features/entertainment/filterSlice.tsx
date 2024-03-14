import { createSlice } from '@reduxjs/toolkit';
import { Entertainment } from '../../../components/Trending/TrendingCards';
import { NewBookmark } from './entertainmentSlice';

interface InitialState {
	filter: {
		filteredEntertainments: [];
		filteredMovies: [];
		filteredTvSeries: [];
		filteredBookmarks: [];
	};
}
{
}
const initialState = {
	filteredEntertainments: [],
	filteredMovies: [],
	filteredTvSeries: [],
	filteredBookmarks: [],
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		FILTER_ENTERTAINMENTS(state, action) {
			const { entertainments, search } = action.payload;

			const tempEntertainments = entertainments.filter(
				(entertainment: Entertainment) => {
					return entertainment.title
						.toLowerCase()
						.includes(search.toLowerCase());
				}
			);
			state.filteredEntertainments = tempEntertainments;
		},
		FILTER_MOVIES(state, action) {
			const { entertainments, search } = action.payload;

			const tempMovies = entertainments.filter(
				(entertainment: Entertainment) => {
					if (entertainment.category === 'Movie') {
						return entertainment.title
							.toLowerCase()
							.includes(search.toLowerCase());
					}
				}
			);
			state.filteredMovies = tempMovies;
		},
		FILTER_TV_SERIES(state, action) {
			const { entertainments, search } = action.payload;

			const tempTvSeries = entertainments.filter(
				(entertainment: Entertainment) => {
					if (entertainment.category === 'TV Series') {
						return entertainment.title
							.toLowerCase()
							.includes(search.toLowerCase());
					}
				}
			);
			state.filteredTvSeries = tempTvSeries;
		},
		FILTER_BOOKMARKEDS(state, action) {
			const { bookmarkeds, search } = action.payload;

			const tempBookmarkeds = bookmarkeds.filter((bookmark: NewBookmark) => {
				return bookmark.title.toLowerCase().includes(search.toLowerCase());
			});
			state.filteredBookmarks = tempBookmarkeds;
		},
	},
});

export const {
	FILTER_ENTERTAINMENTS,
	FILTER_MOVIES,
	FILTER_TV_SERIES,
	FILTER_BOOKMARKEDS,
} = filterSlice.actions;

export const selectFilteredEntertainments = (state: InitialState) =>
	state.filter.filteredEntertainments;

export const selectFilteredMovies = (state: InitialState) =>
	state.filter.filteredMovies;

export const selectFilteredTvSeries = (state: InitialState) =>
	state.filter.filteredTvSeries;

export const selectFilteredBookmarks = (state: InitialState) =>
	state.filter.filteredBookmarks;

export default filterSlice.reducer;
