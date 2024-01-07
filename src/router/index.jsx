import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from '../pages/NotFound'
import Main from "../pages/Main";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Favorites from '../pages/Favorites'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <Main />
			},

			{
				path: '/cart',
				element: <Cart />
			},

			{
				path: '/checkout',
				element: <Checkout />
			},

			{
				path: '/favorites',
				element: <Favorites />
			},

		]
	},


	{
		path: '*',
		element: <NotFound />,
	}
])

export default router