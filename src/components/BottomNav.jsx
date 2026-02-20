import { NavLink } from 'react-router-dom'
import './BottomNav.css'

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 3L2 12h3v8h5v-6h4v6h5v-8h3L12 3z" />
                    <rect x="10.5" y="9" width="3" height="3" fill="var(--bg-card)" rx="0.5" />
                </svg>
                <span className="nav-label">Home</span>
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="8" height="10" rx="1" />
                    <rect x="13" y="3" width="8" height="6" rx="1" />
                    <rect x="3" y="15" width="8" height="6" rx="1" />
                    <rect x="13" y="11" width="8" height="10" rx="1" />
                </svg>
                <span className="nav-label">Categories</span>
            </NavLink>
            <NavLink to="/more" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="4" cy="5" r="1.5" />
                    <circle cx="4" cy="12" r="1.5" />
                    <circle cx="4" cy="19" r="1.5" />
                    <rect x="8" y="3.5" width="14" height="3" rx="1" />
                    <rect x="8" y="10.5" width="14" height="3" rx="1" />
                    <rect x="8" y="17.5" width="14" height="3" rx="1" />
                </svg>
                <span className="nav-label">More</span>
            </NavLink>
        </nav>
    )
}

export default BottomNav
