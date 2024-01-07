import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'
import Card from 'react-credit-card-flipping'
import ymaps from 'ymaps'
import { clearCart } from '../store/cartSlice'
import { Map, YMaps, Placemark, GeolocationControl, SearchControl, FullscreenControl, ZoomControl } from '@pbe/react-yandex-maps'
import _ from 'lodash'

function Checkout() {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const toast = useRef()
	const flat = useRef()
	const cart = useSelector(state => state.cart)

	useEffect(() => { if (!cart.length && !visibleModal) navigate('/') })

	const apikey = 'a1688b2c-13b0-4d96-8d19-fe3eed2c5d65'
	const apiurl = 'https://api-maps.yandex.ru/2.1/?apikey=a1688b2c-13b0-4d96-8d19-fe3eed2c5d65&lang=ru_RU'
	const defaultCoords = [54.319742, 48.395900]

	const [cardData, setCardData] = useState({ cardNumber: '', cardHolder: '', expDate: '', cvv: '' })
	const [userData, setUserData] = useState({ fullName: '', phoneNumber: '', email: '' })
	const [address, setAddress] = useState('')

	const [cardFliped, setCardFliped] = useState(false)
	const [visibleModal, setVisibleModal] = useState(false)
	const [coords, setCoords] = useState('')

	const total = _.reduce(cart, (sum, obj) => {
		return sum + (obj.price * obj.qty)
	}, 0)

	function mapClick(e) {
		setCoords(e.get('coords'))
		ymaps
			.load(apiurl)
			.then(res => res.geocode(e.get('coords')), { results: 1 })
			.then(res => res.geoObjects.get(0).properties.get('text'))
			.then(res => setAddress(res + ' ' + flat.current.value))
	}

	function validation(e) {
		e.preventDefault()
		e.stopPropagation()
		e.target.classList.add('was-validated')
		if (!e.target.checkValidity() /* || !document.getElementById('delivery-address').value */) {
			showError()
		} else {
			setVisibleModal(true)
			doOrder()
			dispatch(clearCart())
		}
	}

	function showError() {
		toast.current.show({ severity: 'error', summary: 'Ошибка!', detail: 'Заполните необходимые поля', life: 3000 });
	}

	function doOrder() {
		const products = _(cart)
			.map((item) => _.pick(item, ['id', 'qty']))
			.value()

		const order = _.assign({}, { userData, cardData, products, address })
		console.log(order);
		// localStorage. = localStorage.order ?
		// JSON.strin(...JSON.parse(localStorage.order), [order]) : JSON.stringify([order])
	}


	return (
		<div className="container py-5">

			<Toast ref={toast} position="bottom-right" />

			<Dialog
				header="Заказ оформлен!"
				footer={<Link to="/" className="btn btn-mediasoft">Вернусться к каталогу</Link>}
				draggable={false}
				closable={false}
				visible={visibleModal}
				onHide={() => setVisibleModal(false)} style={{ width: '50%' }}
			>
				<DataTable value={cart}>
					<Column field="brand" header="Бренд"></Column>
					<Column field="model" header="Модель"></Column>
					<Column field="price" header="Цена (за шт.)"></Column>
					<Column field="qty" header="Количество"></Column>
				</DataTable>
			</Dialog>

			<div className="row g-5">
				{/* ----- CART ----- */}
				<div className="col-md-5 col-lg-4 order-md-last">
					<h4 className="d-flex justify-content-between align-items-center mb-3">
						<span className="text-mediasoft">Ваша корзина</span>
						<span className="badge bg-mediasoft-primary rounded-pill">{cart.length}</span>
					</h4>
					<ul className="list-group mb-3">
						{
							cart.map(item =>
								<li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
									<div>
										<h6 className="my-0">{item.brand} {item.model}</h6>
										<small className="text-body-secondary">
											[ {item.color} ]<br />[ {item.ram}/{item.rom} ] [ {item.battery} мАч ]
										</small>
									</div>
									<span className="text-body-secondary">{item.price.toLocaleString('ru')} &#8381;</span>
								</li>
							)
						}
					</ul>

					<div className="justify-content-between flex-row card p-2">
						<span>Итог:</span>
						<strong>{total.toLocaleString('ru')} &#8381;</strong>
					</div>
				</div>

				<div className="col-md-7 col-lg-8">
					<form className="needs-validation" onSubmit={(e) => validation(e)} noValidate>

						{/* ----- USER DATA ----- */}
						<h4 className="text-mediasoft mb-3">1. Данные покупателя</h4>
						<div id="user-data" className="row g-3">

							<div className="col-12">
								<label htmlFor="firstName" className="form-label">ФИО</label>
								<InputText onChange={e => setUserData({ ...userData, fullName: e.target.value })} className="form-control" id="firstName" placeholder="" required />
							</div>

							<div className="col-12 col-lg-6">
								<label htmlFor="tel" className="form-label">Телефон</label>
								<InputMask mask="+7 (999) 999-99-99" onChange={e => setUserData({ ...userData, phoneNumber: e.target.value })} type="tel" className="form-control" id="tel" placeholder="+7 (999) 999-99-99" autoComplete="false" required />
							</div>

							<div className="col-12 col-lg-6">
								<label htmlFor="email" className="form-label">Email <span className="text-secondary">(Опционально)</span></label>
								<InputText onChange={e => setUserData({ ...userData, email: e.target.value })} keyfilter="email" className="form-control" id="email" placeholder="you@example.com" autoComplete="false" />
							</div>
						</div>

						{/* ----- CARD DATA ----- */}

						<h4 className="text-mediasoft mt-5 mb-3">2. Данные банковской карты</h4>

						<div id="card-data" className="row justify-content-center">

							<div id="card-wrapper" className="d-flex justify-content-center col-12 col-lg-6 mb-3">
								<Card
									number={cardData.cardNumber}
									name={cardData.cardHolder}
									expiry={cardData.expDate}
									cvv={cardData.cvv}
									flipCard={cardFliped}
									brand={'/images/MediaBankLogo.png'}
									emptyName='CARDHOLDER'
								/>
							</div>


							<div id="card-form" className="row col-12 col-lg-6">

								<div className="form-floating mb-3 px-0">
									<InputMask
										mask='9999 9999 9999 9999'
										onChange={e => setCardData({ ...cardData, cardNumber: e.target.value.replace(/\s/g, '') })}
										id="cardNumber" className="form-control" placeholder="" required
									/>
									<label htmlFor="cardNumber">Номер карты</label>
								</div>

								<div className="form-floating mb-3 px-0">
									<InputText
										onChange={e => setCardData({ ...cardData, cardHolder: e.target.value })}
										keyfilter={/[a-z ]/i}
										id="cardHolder" className="form-control" placeholder="" required
									/>
									<label htmlFor="cardHolder">Владелец</label>
								</div>

								<div className="form-floating mb-3 ps-0 col-6">
									<InputMask
										onChange={e => setCardData({ ...cardData, expDate: e.target.value })}
										mask='99/99'
										id="expDate" className="form-control" placeholder="" required
									/>
									<label htmlFor="expDate">Срок действия</label>
								</div>

								<div className="form-floating mb-3 px-0 col-6">
									<InputMask
										onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
										onFocus={() => setCardFliped(true)}
										onBlur={() => setCardFliped(false)}
										mask='999'
										id="cvv" className="form-control" placeholder="" required
									/>
									<label htmlFor="cvv">CVV</label>
								</div>

							</div>


						</div>

						<h4 className="text-mediasoft mt-5 mb-3">3. Адрес доставки</h4>

						<div id="delivery">

							<div className="d-flex gap-1 mb-3">
								<input id="delivery-address" value={address} className="form-control w-75" type="text" placeholder="Город, улица, дом" required disabled />
								<input ref={flat} id="delivery-flat" className="form-control w-25" type="text" placeholder="Квартира / офис" />
							</div>

							<YMaps query={{ apikey }}>
								<Map
									width="100%" height="400px"
									defaultState={{ center: defaultCoords, zoom: 17 }}
									onClick={e => mapClick(e)}
								>
									<Placemark geometry={coords} />
									<GeolocationControl options={{ float: 'right' }} />
									<SearchControl options={{ float: 'left' }} />
									<FullscreenControl />
									<ZoomControl />
								</Map>
							</YMaps>

						</div>


						<hr className="my-4" />
						<button className="w-100 btn btn-warning btn-lg" type="submit">Оформить заказ</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Checkout