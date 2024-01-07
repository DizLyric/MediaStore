import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../store/cartSlice'
import { Link } from 'react-router-dom'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import CartItem from '../components/CartItem'
import _ from 'lodash'
import { useRef } from 'react';

function Cart() {

	const toast = useRef(null)
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)
	const total = _.reduce(cart, (sum, obj) => {
		return sum + (obj.price * obj.qty)
	}, 0)

	const accept = () => {
		dispatch(clearCart())
	};

	const clearCartPopup = (event) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Очистить корзину?',
			icon: 'pi pi-info-circle',
			acceptClassName: 'p-button-danger',
			rejectLabel: 'Нет',
			acceptLabel: 'Да',
			accept,
		});
	};

	return (
		<section id="cart">
			<ConfirmPopup />
			<div className="container py-5">
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-10">
						<div className="d-flex justify-content-between align-items-center">
							<h1 className="mb-4">Корзина товаров &nbsp;
								<span className="fs-6 text-secondary border py-1 px-2 rounded-1">
									{cart.length}
								</span>
							</h1>
							{
								cart.length > 0 &&
								<button
									onClick={clearCartPopup}
									className="btn btn-sm btn-outline-danger">
									Очистить корзину
								</button>
							}
						</div>
						{
							cart.map((item) =>
								<CartItem obj={item} key={item.id} />
							)
						}

						{
							cart.length > 0 ?

								<div id="total">
									<h3 className="border-bottom">Итого: {total.toLocaleString('ru')} &#8381;</h3>
									<Link to="/checkout"
										type="button"
										className="btn btn-warning btn-lg w-100"
									>
										Перейти к оформлению
									</Link>
								</div>
								:
								<div className="card text-center py-5">
									<h1 className="my-3">Корзина пуста!</h1>
									<p>Посмотрите предложения на <Link to="/">главной странице</Link></p>
								</div>
						}

					</div>
				</div>
			</div>
		</section>
	)
}

export default Cart