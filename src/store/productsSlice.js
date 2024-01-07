import { createSlice } from "@reduxjs/toolkit";
import products from '../data/products.json'
import brands from '../data/brands.json'
import _ from 'lodash'

const initialState = {
	products,
	brands,
	filtered: products
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		sorting: (state, data) => {
			switch (data.payload.value) {
				case 'az':
					state.filtered = _.sortBy(state.filtered, ['brand', 'model'])
					break
				case 'za':
					state.filtered = _.sortBy(state.filtered, ['brand', 'model']).reverse()
					break
				case 'cheap':
					state.filtered = _.sortBy(state.filtered, 'price')
					break
				case 'expensive':
					state.filtered = _.sortBy(state.filtered, 'price').reverse()
					break
				default:
					state.filtered = _.sortBy(state.filtered, (item) => _.findIndex(state.products, { model: item.model }));
					break
			}
		},

		filtering: (state, data) => {
			state.filtered = _.filter(state.products, (obj) => {
				return obj.brand == data.payload.brand
			})
		},

		searching: (state, data) => {
			if (data.payload.text) {
				state.filtered = _.filter(state.products, (obj) => {
					return _(obj.brand).toLower().includes(_(data.payload.text).toLower()) || _(obj.model).toLower().includes(_(data.payload.text).toLower())
				})
			}
		},

		resetFiltered: (state) => {
			state.filtered = state.products
		}
	}
}
)

export const { sorting, filtering, searching, resetFiltered } = productsSlice.actions
export default productsSlice.reducer