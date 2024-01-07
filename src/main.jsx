import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api';
import store from './store'
import router from "./router";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'

import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	// <PrimeReactProvider>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	// </PrimeReactProvider>
)
