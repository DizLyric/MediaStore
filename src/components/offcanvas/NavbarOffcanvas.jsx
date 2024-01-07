import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searching } from '../../store/productsSlice'
import { Link } from "react-router-dom";

function OffcanvasNavbar() {

	const dispatch = useDispatch()
	const [text, setText] = useState(null)
	const cartLength = useSelector(state => state.cart).length
	const favoritesLength = useSelector(state => state.favorites).length

	return (
		<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
			<div className="offcanvas-header">
				<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Меню</h5>
				<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body">

				<ul className="navbar-nav mb-3 flex-row text-center justify-content-between">
					{/* <li className="nav-item rounded-4 p-1 icon-hover">
						<a className="nav-link p-0" href="#">
							<i className="bi bi-bar-chart fs-4" />
							<sub className="ms-1 border rounded-2 px-1" style={{ background: 'red' }}>5</sub>
							<h6>Сравнение</h6>
						</a>
					</li> */}
					<li className="col-3 nav-item rounded-4 p-1 icon-hover" data-bs-dismiss="offcanvas">
						<Link to="/favorites" className="nav-link p-0" href="#">
							<i className="bi bi-suit-heart fs-4"></i>
							{
								favoritesLength > 0 &&
								<sub className="ms-1 border rounded-2 px-1" style={{ background: 'gray' }}>{favoritesLength}</sub>
							}
							<h6>Избранное</h6>
						</Link>
					</li>
					<li className="col-3 nav-item rounded-4 p-1 icon-hover" data-bs-dismiss="offcanvas">
						<Link to="/cart" className="nav-link p-0">
							<i className="bi bi-cart3 fs-4" />

							{
								cartLength > 0 &&
								<sub className="ms-1 border rounded-2 px-1" style={{ background: 'red' }}>{cartLength}</sub>
							}
							<h6>Корзина</h6>
						</Link>
					</li>
					<li className="col-3 nav-item rounded-4 p-1 icon-hover">
						<a className="nav-link p-0" href="#">
							<i className="bi bi-person-circle fs-4" />
							<h6>Профиль</h6>
						</a>
					</li>
				</ul>

				<form className="d-flex" role="search">
					<input onInput={(e) => setText(e.target.value)} className="form-control me-2" type="search" placeholder="Поиск..." aria-label="Поиск..." id="offcanvas-search" />
					<button onClick={() => dispatch(searching({ text }))} className="btn btn-mediasoft" type="button" data-bs-dismiss="offcanvas">Найти</button>
				</form>
				<hr />
			</div>
		</div>
	)
}

export default OffcanvasNavbar