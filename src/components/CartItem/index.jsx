import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeCartItem, setCartItem } from '../../store/cartSlice'

function CartItem(props) {

	const dispatch = useDispatch()
	const [item, setItem] = useState(props.obj)

	const increment = () => item.qty < item.inStock ? setItem({ ...item, qty: item.qty + 1 }) : {}
	const decrement = () => item.qty > 1 ? setItem({ ...item, qty: item.qty - 1 }) : {}
	const custom = (value) => {
		if(value > item.inStock) setItem({ ...item, qty: item.inStock })
		else if (value < 1) setItem({ ...item, qty: 1 })
		else setItem({ ...item, qty: value })
	}

	useEffect(() => { dispatch(setCartItem(item)) }, [item.qty])

	return (
		<div className="card rounded-4 mb-4">
			<div className="card-body p-004">
				<div className="row d-flex justify-content-between align-items-center">
					<div className="col-md-2 col-lg-2 col-xl-2 bg-light p-2 rounded-3">
						<img
							src={"/images/products/" + item.img}
							className="img-fluid rounded-3" alt={item.model}
						/>
					</div>
					<div className="col-md-3 col-lg-3 col-xl-3">
						<h3>{item.brand} {item.model}</h3>
						<p className="m-0"><span className="text-muted">Цвет: </span>{item.color}</p>
						<p className="m-0"><span className="text-muted">Память: </span>{item.ram}/{item.rom}</p>
					</div>
					<div className="col-md-3 col-lg-3 col-xl-2 d-flex">
						<button onClick={decrement} className="btn btn-link px-2">
							<i className="bi bi-dash-circle text-mediasoft"></i>
						</button>

						<input onChange={e => custom(+e.target.value)} name="quantity" value={item.qty} type="number"
							className="form-control form-control-sm text-center" />

						<button onClick={increment} className="btn btn-link px-2">
							<i className="bi bi-plus-circle text-mediasoft"></i>
						</button>
					</div>
					<div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
						<h5 className="mb-0">{(item.price * item.qty).toLocaleString('ru')} &#8381;</h5>
					</div>
					<div onClick={() => dispatch(removeCartItem(item.id))} className="col-md-1 col-lg-1 col-xl-1 text-center">
						<i className="bi bi-x-lg fs-4 text-danger" style={{ cursor: 'pointer' }}></i>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartItem