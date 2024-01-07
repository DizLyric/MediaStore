import React from 'react'
import './style.css'

function Banner() {
    return (
        <div id="banner" className="p-5 m-2 text-center">
            <div className="col-sm-6 p-lg-5 my-5">
                <h1 id="slogan" className="display-4 fw-bold text-mediasoft">MediaStore</h1>
                <hr />
                <h3 className="fw-normal text-muted mb-3">Твой выбор, твои возможности!</h3>
            </div>
        </div>
    )
}

export default Banner