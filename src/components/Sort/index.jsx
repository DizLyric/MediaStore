import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetFiltered, sorting } from '../../store/productsSlice'

function Sort() {

    const dispatch = useDispatch()
    const [selectValue, setSelectValue] = useState('default')

    function changeSelect(value) {
        setSelectValue(value)
        dispatch(sorting({ value }))
    }

    const reset = () => {
        setSelectValue('default')
        dispatch(resetFiltered())
    }

    return (
        <div className="d-flex flex-wrap justify-content-between border-top border-bottom py-2">
            <div className="select-wrapper">
                <select onChange={e => changeSelect(e.target.value)} value={selectValue} className="form-select" name="sort" aria-label="Default select example">
                    <option value="default" disabled>Сортировка</option>
                    <option value="without">Без сортировки</option>
                    <optgroup label="По названию">
                        <option value="az">A - Z</option>
                        <option value="za">Z - A</option>
                    </optgroup>
                    <optgroup label="По цене">
                        <option value="cheap">Сначала дешевые</option>
                        <option value="expensive">Сначала дорогие</option>
                    </optgroup>
                </select>
            </div>
            <button onClick={() => reset()} type="button" className="btn btn-outline-danger">Сбросить фильтры и сортировку</button>
        </div>
    )
}

export default Sort