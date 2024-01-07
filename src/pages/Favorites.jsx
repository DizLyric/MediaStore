import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import ProductItem from '../components/Products/ProductItem'
import { Link } from 'react-router-dom'

function Favorites() {

	const favIdxs = useSelector(state => state.favorites)
	const products = useSelector(state => state.products.products)
	const favorites = _.filter(products, item => _.includes(favIdxs, item.id))
	console.log(favorites);

	return (
		<section id="cart">
			<div className="container py-5">
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-10">
						<div className="d-flex justify-content-between align-items-center">
							<h1 className="mb-4">Избранное &nbsp;
								<span className="fs-6 text-secondary border py-1 px-2 rounded-1">
									{favorites.length}
								</span>
							</h1>
						</div>
						<div className="row">
							{
								favorites.map((item) =>
									<ProductItem obj={item} key={item.id} />
								)
							}
						</div>
						{
							favorites.length == 0 &&
							
							<div className="card text-center py-5">
								<h1 className="my-3">Список избранных товаров пуст!</h1>
								<p>Посмотрите предложения на <Link to="/">главной странице</Link></p>
							</div>
						}

					</div>
				</div>
			</div>
		</section>
	)
}

export default Favorites