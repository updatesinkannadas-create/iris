import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './FavoritesSelect.css'

const allModules = [
    { name: 'Academic Calendar', category: 'Academics', icon: 'acad_calendar' },
    { name: 'My Courses and Grades', category: 'Academics', icon: 'courses_grades' },
    { name: 'Course Registration', category: 'Academics', icon: 'registration' },
    { name: 'All Courses', category: 'Academics', icon: 'all_courses' },
    { name: 'My Credits Tracker', category: 'Academics', icon: 'credits_tracker' },
    { name: 'My Grade Card', category: 'Academics', icon: 'grade_card' },
    { name: 'Gyan', category: 'Academics', icon: 'gyan' },
    { name: 'My Timetable', category: 'Academics', icon: 'timetable' },
    { name: 'My Attendance Card', category: 'Academics', icon: 'attendance' },
    { name: 'Feedback Forms', category: 'Academics', icon: 'feedback' },
    { name: 'Events Management', category: 'Campus', icon: 'events' },
    { name: 'Infrastructure Booking', category: 'Campus', icon: 'infra' },
    { name: 'Buy and Sell', category: 'Campus', icon: 'buysell' },
    { name: 'Career Development Centre', category: 'Campus', icon: 'cdc' },
    { name: 'Calendar and Events (CEMS)', category: 'Campus', icon: 'cems' },
    { name: 'Announcements', category: 'Institute', icon: 'announcements' },
    { name: 'Hostel Dashboard', category: 'Campus', icon: 'hostel' },
    { name: 'Transport', category: 'Campus', icon: 'transport' },
    { name: 'Mess Menu', category: 'Campus', icon: 'mess' },
    { name: 'Complaints', category: 'Campus', icon: 'complaints' },
    { name: 'Lost & Found', category: 'Campus', icon: 'lost' },
    { name: 'Campus Map', category: 'Campus', icon: 'map' },
    { name: 'Institute Calendar', category: 'Institute', icon: 'calendar' },
    { name: 'News & Events', category: 'Institute', icon: 'news' },
    { name: 'Faculty Directory', category: 'Institute', icon: 'people' },
    { name: 'Departments', category: 'Institute', icon: 'dept' },
    { name: 'Library', category: 'Institute', icon: 'library' },
    { name: 'Circulars', category: 'Institute', icon: 'circular' },
]

const moduleIcons = {
    acad_calendar: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    courses_grades: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="12" y2="14" />
        </svg>
    ),
    registration: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="9" y1="6" x2="15" y2="6" />
            <path d="M15 10l-6 6" />
            <path d="M13 10l2 2" />
        </svg>
    ),
    all_courses: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="17" x2="12" y2="17" />
        </svg>
    ),
    credits_tracker: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    ),
    grade_card: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M9 11l2 2 4-4" />
        </svg>
    ),
    gyan: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
    ),
    timetable: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="9" y1="4" x2="9" y2="22" />
        </svg>
    ),
    attendance: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M9 11l2 2 4-4" />
            <line x1="8" y1="6" x2="16" y2="6" />
        </svg>
    ),
    feedback: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="11" x2="16" y2="11" />
            <line x1="8" y1="15" x2="16" y2="15" />
        </svg>
    ),
    events: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    infra: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M3 21h18" />
            <path d="M5 21V7l7-4 7 4v14" />
            <rect x="9" y="13" width="6" height="8" />
        </svg>
    ),
    buysell: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    ),
    cdc: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    cems: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    announcements: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    ),
    hostel: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M3 21V9l9-7 9 7v12" />
            <rect x="9" y="13" width="6" height="8" />
        </svg>
    ),
    transport: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="6" width="18" height="10" rx="2" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
        </svg>
    ),
    mess: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M3 11h18M5 11V6a7 7 0 0 1 14 0v5" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="8" y1="17" x2="16" y2="17" />
        </svg>
    ),
    complaints: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
    lost: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    map: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    calendar: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    news: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="7" y1="8" x2="17" y2="8" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="7" y1="16" x2="13" y2="16" />
        </svg>
    ),
    people: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
        </svg>
    ),
    dept: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M3 21h18" />
            <path d="M5 21V7l7-4 7 4v14" />
            <rect x="9" y="13" width="6" height="8" />
        </svg>
    ),
    library: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    ),
    circular: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    ),
}

const DEFAULT_FAVORITES = ['Course Registration']

function FavoritesSelect() {
    const navigate = useNavigate()
    const { user, userData } = useAuth()

    const [favorites, setFavorites] = useState(() => {
        const cached = localStorage.getItem('iris-favorites')
        if (cached) return JSON.parse(cached)
        return DEFAULT_FAVORITES
    })

    const toggleFavorite = (moduleName) => {
        let updated
        if (favorites.includes(moduleName)) {
            updated = favorites.filter(f => f !== moduleName)
        } else {
            updated = [...favorites, moduleName]
        }
        setFavorites(updated)
        localStorage.setItem('iris-favorites', JSON.stringify(updated))
    }

    return (
        <div className="favorites-select-page">
            <header className="fav-select-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <h1 className="fav-select-title">Select Favourite Screens</h1>
            </header>

            <div className="fav-select-list">
                {allModules.map((mod, index) => (
                    <button
                        key={index}
                        className="fav-select-item"
                        onClick={() => toggleFavorite(mod.name)}
                    >
                        <div className="fav-select-icon">
                            {moduleIcons[mod.icon]}
                        </div>
                        <div className="fav-select-info">
                            <span className="fav-select-name">{mod.name}</span>
                            <span className="fav-select-category">{mod.category}</span>
                        </div>
                        <svg
                            className={`fav-heart ${favorites.includes(mod.name) ? 'active' : ''}`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={favorites.includes(mod.name) ? '#ff3b30' : 'none'}
                            stroke={favorites.includes(mod.name) ? '#ff3b30' : 'var(--text-muted)'}
                            strokeWidth="1.5"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FavoritesSelect
