import { Link } from "react-router-dom"

export function Footer () {
    return (
    <div className="container">
    <footer className="text-bg-danger py-3 my-4">
      <ul className="nav justify-content-center border-bottom-dark pb-3 mb-3">
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">Home</Link></li>
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">Features</Link></li>
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">Pricing</Link></li>
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">FAQs</Link></li>
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-dark">About</Link></li>
      </ul>
      <p className="text-center text-dark">© 2023 Company, Inc</p>
    </footer>
  </div>
    )
}