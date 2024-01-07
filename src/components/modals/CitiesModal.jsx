import { useDispatch, useSelector } from "react-redux"
import { setCurrentCity } from "../../store/citiesSlice";

function ModalCities() {
	const cities = useSelector(state => state.cities.cities)

	const dispatch = useDispatch()
	
	return (
		<div className="modal fade" id="modalCities" tabIndex="-1" aria-labelledby="modalCitiesLabel" aria-hidden="true">
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="modalCitiesLabel">Выберите город</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body d-flex flex-column flex-wrap" style={{ maxHeight: '50vh' }}>
						{cities.map((city, idx) =>
							<p key={idx}>
								<a onClick={() => dispatch(setCurrentCity({city}))} data-bs-dismiss="modal"  className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
									style={{ cursor: 'pointer' }}>
									{city}
								</a>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalCities