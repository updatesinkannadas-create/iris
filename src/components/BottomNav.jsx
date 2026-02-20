import { NavLink } from 'react-router-dom'
import './BottomNav.css'

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                <span className="nav-label">Home</span>
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <rect x="3" y="3" width="8" height="8" rx="2" />
                    <rect x="13" y="3" width="8" height="8" rx="2" />
                    <rect x="3" y="13" width="8" height="8" rx="2" />
                    <rect x="13" y="13" width="8" height="8" rx="2" />
                </svg>
                <span className="nav-label">Categories</span>
            </NavLink>
            <NavLink to="/more" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="6" x2="16" y2="6" />
                    <line x1="4" y1="12" x2="16" y2="12" />
                    <line x1="4" y1="18" x2="16" y2="18" />
                    <circle cx="20" cy="6" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="20" cy="12" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="20" cy="18" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                <span className="nav-label">More</span>
            </NavLink>
        </nav>
    )
}

export default BottomNav
