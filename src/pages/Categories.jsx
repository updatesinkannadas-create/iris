import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import './Categories.css'

const categoryTabs = [
    { id: 'institute', label: 'Institute' },
    { id: 'academics', label: 'Academics' },
    { id: 'campus', label: 'Campus' },
]

/* Tab icons matching exact original IRIS style */
const tabIcons = {
    institute: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18" />
            <path d="M5 21V7l7-4 7 4v14" />
            <path d="M9 21v-6h6v6" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="13" x2="7" y2="13" />
            <line x1="17" y1="13" x2="21" y2="13" />
        </svg>
    ),
    academics: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    ),
    campus: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 8v4" />
            <path d="M7 21v-3a5 5 0 0 1 10 0v3" />
        </svg>
    ),
}

const modulesByCategory = {
    institute: [
        { name: 'Institute Calendar', icon: 'calendar' },
        { name: 'News & Events', icon: 'news' },
        { name: 'Faculty Directory', icon: 'people' },
        { name: 'Departments', icon: 'dept' },
        { name: 'Library', icon: 'library' },
        { name: 'Circulars', icon: 'circular' },
    ],
    academics: [
        { name: 'Academic Calendar', icon: 'acad_calendar' },
        { name: 'My Courses and Grades', icon: 'courses_grades' },
        { name: 'Course Registration', icon: 'registration' },
        { name: 'All Courses', icon: 'all_courses' },
        { name: 'My Credits Tracker', icon: 'credits_tracker' },
        { name: 'My Grade Card', icon: 'grade_card' },
        { name: 'Gyan', icon: 'gyan' },
        { name: 'My Timetable', icon: 'timetable' },
        { name: 'My Attendance Card', icon: 'attendance' },
        { name: 'Feedback Forms', icon: 'feedback' },
    ],
    campus: [
        { name: 'Hostel', icon: 'hostel' },
        { name: 'Transport', icon: 'transport' },
        { name: 'Mess Menu', icon: 'mess' },
        { name: 'Complaints', icon: 'complaints' },
        { name: 'Lost & Found', icon: 'lost' },
        { name: 'Campus Map', icon: 'map' },
    ],
}

/* Module icons - exact match to original IRIS icons */
const iconMap = {
    /* Academics tab icons - matching original exactly */
    acad_calendar: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M8 14h2v2H8z" />
            <path d="M12 14h2v2h-2z" />
            <path d="M7 14l1.5-2h2l-1 2" />
            <path d="M12 7l-2 1h4l-2-1" />
        </svg>
    ),
    courses_grades: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="2" width="14" height="20" rx="2" />
            <line x1="7" y1="7" x2="13" y2="7" />
            <line x1="7" y1="11" x2="13" y2="11" />
            <line x1="7" y1="15" x2="10" y2="15" />
            <rect x="16" y="6" width="5" height="12" rx="1" />
            <line x1="18.5" y1="9" x2="18.5" y2="15" />
        </svg>
    ),
    registration: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="9" y1="7" x2="15" y2="7" />
            <line x1="9" y1="11" x2="15" y2="11" />
            <line x1="9" y1="15" x2="12" y2="15" />
            <path d="M14 15l2 2 3-3" />
        </svg>
    ),
    all_courses: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="7" rx="1.5" />
            <line x1="8" y1="5.5" x2="16" y2="5.5" />
            <rect x="4" y="11" width="16" height="4" rx="1.5" />
            <rect x="4" y="17" width="16" height="5" rx="1.5" />
            <line x1="8" y1="13" x2="14" y2="13" />
            <line x1="8" y1="19.5" x2="14" y2="19.5" />
        </svg>
    ),
    credits_tracker: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
            <polyline points="5 17 8 13 11 15 14 11 17 13" />
        </svg>
    ),
    grade_card: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
            <line x1="8" y1="18" x2="12" y2="18" />
            <text x="15" y="19" fill="#5856d6" fontSize="7" fontWeight="700" fontFamily="Inter" stroke="none">A</text>
        </svg>
    ),
    gyan: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
            <line x1="12" y1="6" x2="12" y2="10" />
            <line x1="10" y1="8" x2="14" y2="8" />
        </svg>
    ),
    timetable: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
    ),
    attendance: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M9 11l2 2 4-4" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="17" x2="14" y2="17" />
        </svg>
    ),
    feedback: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="11" x2="16" y2="11" />
            <line x1="8" y1="15" x2="16" y2="15" />
            <line x1="8" y1="19" x2="12" y2="19" />
        </svg>
    ),
    /* Institute tab icons */
    calendar: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    news: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="7" y1="8" x2="17" y2="8" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="7" y1="16" x2="13" y2="16" />
        </svg>
    ),
    people: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
        </svg>
    ),
    dept: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M3 21h18" />
            <path d="M5 21V7l7-4 7 4v14" />
            <rect x="9" y="13" width="6" height="8" />
        </svg>
    ),
    library: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    ),
    circular: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    ),
    /* Campus tab icons */
    hostel: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M3 21V9l9-7 9 7v12" />
            <rect x="9" y="13" width="6" height="8" />
        </svg>
    ),
    transport: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <rect x="3" y="6" width="18" height="10" rx="2" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
            <line x1="9" y1="16" x2="15" y2="16" />
        </svg>
    ),
    mess: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M3 11h18M5 11V6a7 7 0 0 1 14 0v5" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="8" y1="17" x2="16" y2="17" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    complaints: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
    lost: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    map: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="1.3">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
}

function Categories() {
    const [activeCategory, setActiveCategory] = useState('academics')
    const [searchTerm, setSearchTerm] = useState('')

    const categoryOrder = ['institute', 'academics', 'campus']

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            const currentIndex = categoryOrder.indexOf(activeCategory)
            if (currentIndex < categoryOrder.length - 1) {
                setActiveCategory(categoryOrder[currentIndex + 1])
            }
        },
        onSwipedRight: () => {
            const currentIndex = categoryOrder.indexOf(activeCategory)
            if (currentIndex > 0) {
                setActiveCategory(categoryOrder[currentIndex - 1])
            }
        },
        preventScrollOnSwipe: true,
        trackMouse: true
    })

    const modules = modulesByCategory[activeCategory] || []
    const filteredModules = modules.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="categories-page">
            {/* Header */}
            <header className="cat-header">
                <h1 className="cat-logo">
                    <span>I</span>
                    <span>r</span>
                    <span>I</span>
                    <span>S</span>
                </h1>
            </header>

            {/* Search */}
            <div className="search-bar">
                <svg className="search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5856d6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Modules"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Category Tabs */}
            <div className="category-tabs">
                {categoryTabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`category-tab ${activeCategory === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(tab.id)}
                    >
                        <span className="category-tab-icon">{tabIcons[tab.id]}</span>
                        <span className="category-tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Modules Grid */}
            <div className="modules-swipe-container" {...handlers} style={{ minHeight: '60vh' }}>
                <div className="modules-grid">
                    {filteredModules.map((module, index) => (
                        <div key={index} className="module-card">
                            <div className="module-icon-wrapper">
                                {iconMap[module.icon]}
                            </div>
                            <span className="module-name">{module.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories
