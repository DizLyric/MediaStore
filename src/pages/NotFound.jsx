import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="container">
            <div className="wrapper d-flex flex-column justify-content-center align-items-center w-100 vh-100">
                <h1>
                    Страница не найдена
                </h1>
                <Link to="/" className="btn btn-mediasoft my-4">На главную</Link>
            </div>
        </div>
    )
}

export default NotFound