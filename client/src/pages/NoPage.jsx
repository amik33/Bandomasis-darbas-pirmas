import { Link } from "react-router-dom"

export function NoPage () {
    return  (
        <div className="container">
            <div className="row">
                <h1 className="col-12 display-1 text-center">404</h1>
                <p className="col-12 display-6 text-center">Page not found</p>
            </div>
            <div className="d-flex justify-content-center p-5">
                <Link className="btn btn-warning rounded-pill py-2" to="/">Go Home page</Link>
            </div>
        </div>
    )
}