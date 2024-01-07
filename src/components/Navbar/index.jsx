import NavbarOffcanvas from '../offcanvas/NavbarOffcanvas'
import CitiesModal from '../modals/CitiesModal'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { searching } from '../../store/productsSlice'
import { Link } from 'react-router-dom'
import './style.css'

function Navbar() {

	const dispatch = useDispatch()
	const [text, setText] = useState(null)
	const city = useSelector(state => state.cities.currentCity)
	const cartLength = useSelector(state => state.cart).length
	const favoritesLength = useSelector(state => state.favorites).length

	return (
		<>
			<section className="sticky-top bg-mediasoft">
				<nav className="navbar navbar-expand-lg border-bottom">
					<div className="container-fluid">
						<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<Link to="/" id="logo" className="navbar-brand px-3">MediaStore</Link>
						<p className="m-0">
							<i className="bi bi-geo-alt"> </i>
							<a href="#" data-bs-toggle="modal" data-bs-target="#modalCities"
								className="link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-offset-2 link-offset-3-hover">
								{city}
							</a>
						</p>
						<div className="collapse navbar-collapse flex-row-reverse">
							<ul className="navbar-nav mb-2 mb-lg-0 w-25 justify-content-evenly">
								{/* <li className="nav-item">
									<a className="nav-link px-0" href="#">
										<i className="bi bi-bar-chart fs-5" />
										<sub className="ms-1 border rounded-2 px-1" style={{ background: 'red' }}>5</sub>
									</a>
								</li> */}
								<li className="nav-item">
									<Link to="/favorites" className="nav-link px-0" href="#">
										<i className="bi bi-suit-heart fs-5"></i>
										{
											favoritesLength > 0 &&
											<sub className="ms-1 border rounded-2 px-1" style={{ background: 'gray' }}>{favoritesLength}</sub>
										}
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/cart" className="nav-link px-0">
										<i className="bi bi-cart3 fs-5" />
										{
											cartLength > 0 &&
											<sub className="ms-1 border rounded-2 px-1" style={{ background: 'red' }}>{cartLength}</sub>
										}
									</Link>
								</li>
								<li className="nav-item">
									<a className="nav-link px-0" href="#">
										<i className="bi bi-person-circle fs-5" />
									</a>
								</li>
							</ul>
							<div className="d-flex w-50 mx-auto">
								<input
									onKeyDown={(e => e.key == 'Enter' ? dispatch(searching({ text })) : {})}
									onInput={(e) => setText(e.target.value)}
									className="form-control me-2"
									type="search"
									placeholder="Поиск..."
									aria-label="Поиск..."
									id="navbar-search"
								/>

								<Link to="/" type="button" className="btn btn-mediasoft" onClick={() => dispatch(searching({ text }))}>Найти</Link>
							</div>
						</div>
					</div>
				</nav>

			</section>
			<NavbarOffcanvas />
			<CitiesModal />
		</>
	)
}

export default Navbar