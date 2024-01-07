import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react';


function App() {

	const history = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [history.pathname]);

	return (
		<>
			<Navbar />
			<main className="flex-grow-1">
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default App