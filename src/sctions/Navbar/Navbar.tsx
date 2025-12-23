import './Navbar.css'
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand ms-4" to="/">Task Manager</NavLink>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon "></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/tasks" >Tasks</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/users">Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/notes">Notes</NavLink>
          </li>
        </ul>
        <div className="navbar-theme-toggle">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
