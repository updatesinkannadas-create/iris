import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSwipeable } from 'react-swipeable'
import './Profile.css'

function Profile() {
    const navigate = useNavigate()
    const { userData } = useAuth()
    const [activeTab, setActiveTab] = useState('personal')

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (activeTab === 'personal') setActiveTab('academics')
        },
        onSwipedRight: () => {
            if (activeTab === 'academics') setActiveTab('personal')
        },
        preventScrollOnSwipe: true,
        trackMouse: true
    })

    // Fallbacks
    const fullName = userData?.fullName || 'Student'
    const profilePic = userData?.profilePhotoURL || null
    const degreeInfo = [userData?.degree, userData?.year, userData?.semester]
        .filter(Boolean).join(', ') || 'No degree info'
    const branchInfo = userData?.branch || 'No branch info'

    const personalData = [
        { label: "Father's Name", value: userData?.personal?.fatherName || '-' },
        { label: "Date of Birth", value: userData?.personal?.dob || '-' },
        { label: "Gender", value: userData?.personal?.gender || '-' },
        { label: "Blood Group", value: userData?.personal?.bloodGroup || '-' },
        { label: "Nationality", value: userData?.personal?.nationality || '-' },
        { label: "Religion", value: userData?.personal?.religion || '-' },
        { label: "Phone", value: userData?.personal?.phone || '-' },
        { label: "Parent's Phone Number", value: userData?.personal?.parentPhone || '-' },
        { label: "Email", value: userData?.personal?.email || '-' },
        { label: "Address", value: userData?.personal?.address || '-' },
    ].filter(item => item.value !== '-')

    const academicData = [
        { label: "Roll Number", value: userData?.academic?.rollNo || '-' },
        { label: "Registration Number", value: userData?.academic?.registrationNo || '-' },
        { label: "Year of Admission", value: userData?.academic?.admissionYear || '-' },
        { label: "Semester", value: userData?.semester || '-' },
        { label: "Branch", value: branchInfo },
        { label: "Degree", value: userData?.degree || '-' },
    ].filter(item => item.value !== '-')

    const currentData = activeTab === 'personal' ? personalData : academicData

    return (
        <div className="profile-page">
            {/* Header */}
            <header className="profile-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <h1 className="profile-page-title">Profile</h1>
            </header>

            {/* Profile Card */}
            <div className="profile-info-card">
                {profilePic ? (
                    <img src={profilePic} alt="Profile" className="profile-avatar-large" />
                ) : (
                    <div className="profile-placeholder profile-avatar-large">
                        {fullName.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="profile-info-text">
                    <h2 className="profile-name-large">{fullName}</h2>
                    <p className="profile-desc">{degreeInfo}</p>
                    <p className="profile-desc">{branchInfo}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button
                    className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('personal')}
                >
                    Personal
                </button>
                <button
                    className={`tab-btn ${activeTab === 'academics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('academics')}
                >
                    Academics
                </button>
            </div>

            {/* Data Card */}
            <div className="profile-swipe-container" {...handlers} style={{ minHeight: '50vh' }}>
                <div className="profile-data-card">
                    {currentData.map((item, index) => (
                        <div key={index} className="data-row">
                            <span className="data-label">{item.label}</span>
                            <span className="data-value">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
