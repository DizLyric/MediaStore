import { useDispatch, useSelector } from 'react-redux'
import { filtering } from '../../store/productsSlice'
import _ from 'lodash'


function BrandsItem(props) {
	
	const products = useSelector(state => state.products.products)
	const countProducts = (value) => _.size(_.filter(products, item => item['brand'] === value))

	const dispatch = useDispatch()
	const item = props.brand

	function setFilter(){
		dispatch(filtering({brand: item.name}))
		document.querySelector('#products').scrollIntoView()
	}

	return (
		<div onClick={setFilter} className="brand-item col-12 col-sm-4 col-lg-3 border d-flex flex-column align-items-center justify-content-center">
			<img src={`./images/brands/${item.img}`} alt={item.name} />
			<h6 className="mt-3 text-light">{item.name}</h6>
			<p className="text-secondary m-0">Товаров: {countProducts(item.name)}</p>
		</div>
	)
}

export default BrandsItem