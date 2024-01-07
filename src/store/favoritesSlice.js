import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash'

const initialState = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {

		addFavoriteItem: (state, data) => {
			state.push(data.payload)
			localStorage.setItem('favorites', JSON.stringify(state))
		},

		removeFavoriteItem: (state, data) => {
			const arrIdx = state.indexOf(data.payload)
			state.splice(arrIdx, 1)
			localStorage.setItem('favorites', JSON.stringify(state))
		},

	}
})

export const { addFavoriteItem, removeFavoriteItem } = favoritesSlice.actions
export default favoritesSlice.reducer