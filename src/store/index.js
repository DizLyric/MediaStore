import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from '../store/productsSlice'
import citiesSlice from "../store/citiesSlice";
import cartSlice from "./cartSlice";
import favoritesSlice from "./favoritesSlice";

const rootReducer = combineReducers({
    products: productsSlice,
    cities: citiesSlice,
    cart: cartSlice,
    favorites: favoritesSlice
})

export default configureStore({
    reducer: rootReducer
})