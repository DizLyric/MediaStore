import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { addCartItem } from "../../store/cartSlice"
import { Toast } from "primereact/toast";
import { OverlayPanel } from "primereact/overlaypanel";
import { Image } from "primereact/image";
import { useRef } from "react";
import { addFavoriteItem, removeFavoriteItem } from "../../store/favoritesSlice";


function ProductItem(props) {

	const toast = useRef()
	const details = useRef()
	const item = props.obj
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)
	const favorites = useSelector(state => state.favorites)

	function showToast() {
		toast.current.show({
			severity: 'success',
			summary: 'Товар добавлен!',
			detail: item.brand + ' ' + item.model
		})
	}

	return (
		<div className="col-12 col-sm-4 col-lg-3 g-2">

			<Toast ref={toast} position="bottom-right" />
			<OverlayPanel ref={details} className="w-50">
				<div className="d-flex">
					<div className="d-flex align-items-center me-3">
						<Image src={"/images/products/" + item.img} width="150" preview />
					</div>
					<div className="w-100">
						<h2>{item.brand} {item.model}</h2>
						<hr />
						<ul className="card-text">
							<li>Цвет: {item.color}</li>
							<li>Память: {item.ram}/{item.rom}</li>
							<li>АКБ: {item.battery} мАч</li>
						</ul>
					</div>
				</div>
			</OverlayPanel>

			<div className="card-wrapper h-100">
				<div className="card h-100 bg-mediasoft">
					<div className="d-flex align-items-center bg-light rounded-3 m-3 h-100">
						<img src={"/images/products/" + item.img} className="card-img p-3" alt="..." />
					</div>

					<h5 className="card-title text-center border-top border-bottom py-2">
						{item.brand} {item.model}
					</h5>

					<div className="card-body d-flex flex-column align-items-start justify-content-between">

						<ul className="card-text">
							<li>Цвет: {item.color}</li>
							<li>Память: {item.ram}/{item.rom}</li>
							<li>АКБ: {item.battery} мАч</li>
						</ul>

						<h5 className="card-price border-bottom pt-2">
							{item.inStock > 0 ? item.price.toLocaleString('ru') + ' ₽' : 'Нет на складе'}
						</h5>

						<div className="d-flex flex-wrap gap-2">
							<button className="btn btn-mediasoft" onClick={(e) => details.current.toggle(e)}><i className="bi bi-info-lg"></i></button>
							{/* <button className="btn btn-mediasoft"><i className="bi bi-bar-chart"></i></button> */}

							{
								_.includes(favorites, item.id) ?
									<button
										onClick={() => { dispatch(removeFavoriteItem(item.id)) }}
										className="btn btn-mediasoft"
									><i className="bi bi-suit-heart-fill"></i></button>
									:
									<button
										onClick={() => { dispatch(addFavoriteItem(item.id)) }}
										className="btn btn-mediasoft"
									><i className="bi bi-suit-heart"></i></button>

							}



							<button
								onClick={() => { dispatch(addCartItem({ ...item })); showToast() }}
								className="btn btn-mediasoft"
								disabled={item.inStock == 0 || _.find(cart, { id: item.id })}
							>
								{
									_.find(cart, { id: item.id }) ?
										<i className="bi bi-cart-check"></i> :
										<i className="bi bi-cart-plus"></i>
								}

							</button>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductItem