import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities: [
		'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
		'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
		'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Ульяновск'
	],

    currentCity: localStorage.getItem('city') ? localStorage.getItem('city') : 'Ульяновск'
}

const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCurrentCity: (state, data) => {
            state.currentCity = data.payload.city
            localStorage.setItem('city', data.payload.city)
        }
    }
})


export const { setCurrentCity } = citiesSlice.actions
export default citiesSlice.reducer