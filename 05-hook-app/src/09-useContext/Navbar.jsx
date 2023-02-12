import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {
  return (

    <nav className="navbar navbar-expand-lg bg-dark rounded-3" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">useContext</Link>
            
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <NavLink to="/" className={({ isActive }) => `nav-link ${ isActive && 'active'}`}>Home</NavLink>

                <NavLink to="/about" className={(args) => { return 'nav-link'}}>About</NavLink>

                <NavLink to="/login" className={(args) => { return 'nav-link'}}>Login</NavLink>
            </ul>
            </div>
        </div>
    </nav>
  )
}
