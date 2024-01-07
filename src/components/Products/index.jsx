import ProductItem from './ProductItem'
import { useSelector } from 'react-redux'
import Sort from '../Sort'



function Products() {
	
	const products = useSelector(state => state.products.filtered)
	
	return (
		<section id="products" className="m-5">
			<Sort />
			<div className="product-items row">
				{ products.length ?
					products.map((item) =>
						<ProductItem obj={item} key={item.id} />
					) : <h1 className="mt-3 text-center">Ничего не найдено!</h1>
				}
			</div>
		</section>
	)
}

export default Products