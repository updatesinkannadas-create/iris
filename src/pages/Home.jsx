import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

function Home() {
    const navigate = useNavigate()
    const { userData } = useAuth()
    const [showImageViewer, setShowImageViewer] = useState(false)

    // Fallbacks if data isn't fully loaded
    const fullName = userData?.fullName || 'Student'
    const profilePic = userData?.profilePhotoURL || null
    const degreeInfo = [userData?.degree, userData?.year, userData?.semester]
        .filter(Boolean).join(', ') || 'No degree info'
    const branchInfo = userData?.branch || 'No branch info'
    const majorCredits = userData?.majorCredits || 0
    const minorCredits = userData?.minorCredits || 0
    const isHostel = userData?.hostelStatus === 'hostel'
    const courses = userData?.courses || []

    return (
        <div className="home-page">
            {/* Full-screen Image Viewer */}
            {showImageViewer && (
                <div className="image-viewer-overlay" onClick={() => setShowImageViewer(false)}>
                    <div className="image-viewer-header">
                        <button className="image-viewer-back" onClick={() => setShowImageViewer(false)}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <span className="image-viewer-title">Profile</span>
                    </div>
                    <div className="image-viewer-body" onClick={(e) => e.stopPropagation()}>
                        {profilePic ? (
                            <img src={profilePic} alt="Profile" />
                        ) : (
                            <div className="profile-placeholder profile-placeholder-fullscreen">
                                {fullName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="iris-header">
                <h1 className="iris-logo">
                    <span>I</span>
                    <span>r</span>
                    <span>I</span>
                    <span>S</span>
                </h1>
                <button className="notification-btn" aria-label="Notifications">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.8">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="notification-dot"></span>
                </button>
            </header>

            {/* Profile Section */}
            <section className="section">
                <h2 className="section-title">Profile</h2>
                <div className="profile-card" onClick={() => navigate('/profile')}>
                    {profilePic ? (
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="profile-avatar"
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowImageViewer(true)
                            }}
                            style={{ cursor: 'pointer' }}
                        />
                    ) : (
                        <div
                            className="profile-placeholder profile-avatar"
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowImageViewer(true)
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            {fullName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="profile-info">
                        <h3 className="profile-name">{fullName}</h3>
                        <p className="profile-detail">{degreeInfo}</p>
                        <p className="profile-detail">{branchInfo}</p>
                    </div>
                    <svg className="profile-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </section>

            {/* Dashboard Section */}
            <section className="section">
                <h2 className="section-title">Dashboard</h2>
                <div className="dashboard-grid">
                    <div className="dashboard-card credits-card">
                        <div className="credits-header">
                            <span className="credits-label">Credits</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <line x1="7" y1="17" x2="7" y2="11" />
                                <line x1="12" y1="17" x2="12" y2="8" />
                                <line x1="17" y1="17" x2="17" y2="13" />
                                <polyline points="7 11 12 8 17 13" fill="none" />
                            </svg>
                            <svg className="transfer-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="17 2 21 6 17 10" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <polyline points="7 14 3 18 7 22" />
                                <line x1="21" y1="18" x2="3" y2="18" />
                            </svg>
                        </div>
                        <div className="credits-values">
                            <div className="credit-item">
                                <span className="credit-number">{majorCredits}</span>
                                <span className="credit-label">Major</span>
                            </div>
                            <div className="credit-item">
                                <span className="credit-number">{minorCredits}</span>
                                <span className="credit-label">Minor</span>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-card hostel-card">
                        <p className="hostel-text">{isHostel ? 'Hostel Allotted' : 'Day Scholar'}</p>
                        {!isHostel && (
                            <>
                                <p className="hostel-text-sub">or</p>
                                <p className="hostel-text">Hostel not allotted</p>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="section">
                <h2 className="section-title">Courses</h2>
                <div className="courses-grid">
                    {courses.length > 0 ? courses.map((course, index) => (
                        <div key={index} className={`course-card ${course.status === 'dropped' ? 'course-dropped' : ''}`}>
                            {course.status === 'dropped' && <div className="dropped-corner"></div>}
                            <div className="course-header">
                                <span className="course-code">{course.code}</span>
                                {course.status !== 'dropped' && (
                                    <svg className="moodle-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="53" r="47" fill="#f98012" />
                                        <text x="50%" y="65%" fontSize="55" fontWeight="bold" fontFamily="Arial, Helvetica, sans-serif" fill="#ffffff" textAnchor="middle" dominantBaseline="middle">m</text>
                                        <path d="M50 8L15 22l35 14 35-14L50 8z" fill="#4b3d2b" />
                                        <rect x="47" y="21" width="6" height="10" fill="#4b3d2b" />
                                        <path d="M83 22v22l3-3v-19z" fill="#4b3d2b" />
                                    </svg>
                                )}
                            </div>
                            <p className="course-name">{course.name}</p>
                            <p className="course-status">
                                {course.status === 'dropped' ? 'Course has been dropped' : 'Attendance not marked yet.'}
                            </p>
                        </div>
                    )) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '10px' }}>No courses added yet.</p>
                    )}
                </div>
            </section>

            {/* Favorite Screens */}
            <section className="section">
                <h2 className="section-title">
                    Favorite Screens{' '}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" style={{ verticalAlign: 'middle', marginLeft: '2px' }}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                </h2>
                <div className="favorites-row">
                    <div className="favorite-card">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="2" width="14" height="20" rx="2" />
                            <line x1="9" y1="6" x2="15" y2="6" />
                            <path d="M15 10l-6 6" />
                            <path d="M9 16l0 0" />
                            <path d="M13 10l2 2" />
                        </svg>
                        <span className="favorite-label">Course Registration</span>
                    </div>
                    <button className="edit-favorites-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                            <line x1="15" y1="5" x2="19" y2="9" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Announcements */}
            <section className="section">
                <h2 className="section-title">Announcements</h2>
                <div className="announcement-card">
                    <span className="announcement-tag">Academic News</span>
                    <p className="announcement-text">Kind Attention Students: Instructions for the upcoming Examinations.</p>
                    <p className="announcement-date">Updated at: February 18, 2026 - 10:14 AM</p>
                </div>
            </section>
        </div>
    )
}

export default Home
