import BrandsItem from './BrandsItem'
import { useSelector } from 'react-redux'
import './style.css'

function Brands() {
	
	const brands = useSelector(state => state.products.brands)
	const products = useSelector(state => state.products.products)
	
	return (
		<section>
			<div className="brands-wrapper d-flex flex-column">
				<h1 className="my-4">Производители &nbsp;
					<span className="fs-6 text-secondary border p-1 rounded-1">{products.length}</span></h1>
				<div className="row" id="brand-block">
					{
						brands.map(
							(el) => <BrandsItem brand={el} key={el.id}/>
						)
					}
				</div>
			</div>
		</section>
	)
}

export default Brands