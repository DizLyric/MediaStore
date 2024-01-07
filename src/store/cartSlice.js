import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {

		addCartItem: (state, data) => {
			state.push({ ...data.payload, qty: 1 })
			localStorage.setItem('cart', JSON.stringify(state))
		},

		setCartItem: (state, data) => {
			const objIdx = state.indexOf(_.find(state, { id: data.payload.id }));
			state[objIdx] = data.payload
			localStorage.setItem('cart', JSON.stringify(state))
		},

		removeCartItem: (state, data) => {
			const objIdx = state.indexOf(_.find(state, { id: data.payload }));
			state.splice(objIdx, 1)
			localStorage.setItem('cart', JSON.stringify(state))
		},

		clearCart: (state) => {
			state.splice(0, state.length)
			localStorage.setItem('cart', JSON.stringify(state))
		},


	}
})

export const { addCartItem, setCartItem, removeCartItem, clearCart } = cartSlice.actions
export default cartSlice.reducer