import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import { useAuth } from '../context/AuthContext'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import './More.css'

function More() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const { theme, setTheme, fontSize, setFontSize, screenFitScale, setScreenFitScale } = useSettings()
    const [showHidden, setShowHidden] = useState(false)

    const fontSizeLabels = {
        12: 'Default',
        13: 'Medium',
        14: 'Large',
        15: 'Extra Large',
        16: 'Maximum',
    }

    const settingsItems = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
            label: 'Edit Profile',
            action: () => navigate('/edit-profile'),
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            ),
            label: 'Change Password',
            action: () => alert('Change password feature coming soon'),
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <path d="M21.5 2v6h-6" />
                    <path d="M2.5 22v-6h6" />
                    <path d="M2 11.5a10 10 0 0 1 18.8-4.3" />
                    <path d="M22 12.5a10 10 0 0 1-18.8 4.3" />
                </svg>
            ),
            label: 'Sync account',
            action: () => alert('Account synced!'),
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            ),
            label: 'Log out',
            action: logout,
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="1.5">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
            ),
            label: 'Delete All Data',
            labelStyle: { color: '#ff3b30' },
            action: async () => {
                if (window.confirm('Are you sure? This will delete ALL your data and you will need to set up your profile again.')) {
                    try {
                        if (user) {
                            await deleteDoc(doc(db, 'users', user.uid))
                        }
                        localStorage.clear()
                        logout()
                    } catch (err) {
                        console.error('Error deleting data:', err)
                        alert('Failed to delete data. Please try again.')
                    }
                }
            },
        },
    ]

    const miscItems = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            ),
            label: 'About IRIS',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22 7 12 13 2 7" />
                </svg>
            ),
            label: 'Support',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            ),
            label: 'Open Source Libraries',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            label: 'Data Protection Policy',
        },
    ]

    return (
        <div className="more-page">
            {/* Header */}
            <header className="iris-header">
                <div className="iris-logo">
                    <img src="/iris-logo.png" alt="IRIS" />
                </div>
            </header>

            {/* Version */}
            <div className="version-bar">
                <span>v4.1.0</span>
            </div>

            {/* Settings */}
            <section className="more-section">
                <h2 className="more-section-title">Settings</h2>
                <div className="more-card">
                    {/* Theme Switcher */}
                    <div className="theme-switcher">
                        <button
                            className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                            onClick={() => setTheme('light')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                            Light
                        </button>
                        <button
                            className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                            onClick={() => setTheme('dark')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                            Dark
                        </button>
                        <button
                            className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                            onClick={() => setTheme('system')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            System
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="more-divider"></div>

                    {/* Settings Items */}
                    {settingsItems.map((item, index) => (
                        <div key={index}>
                            <button className="more-item" onClick={item.action}>
                                <span className="more-item-icon">{item.icon}</span>
                                <span className="more-item-label" style={item.labelStyle}>{item.label}</span>
                            </button>
                            {index < settingsItems.length - 1 && <div className="more-divider"></div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* Miscellaneous */}
            <section className="more-section">
                <h2 className="more-section-title">Miscellaneous</h2>
                <div className="more-card">
                    {miscItems.map((item, index) => (
                        <div key={index}>
                            <button className="more-item">
                                <span className="more-item-icon">{item.icon}</span>
                                <span className="more-item-label">{item.label}</span>
                            </button>
                            {index < miscItems.length - 1 && <div className="more-divider"></div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* Hidden Settings - toggle */}
            <section className="more-section">
                <button
                    className="hidden-settings-toggle"
                    onClick={() => setShowHidden(!showHidden)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span>Hidden Settings</span>
                    <svg
                        width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="var(--text-secondary)" strokeWidth="2"
                        className={`chevron-icon ${showHidden ? 'open' : ''}`}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {showHidden && (
                    <div className="more-card hidden-settings-card">
                        {/* Font Size Control */}
                        <div className="hidden-setting-item">
                            <div className="hidden-setting-header">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                    <path d="M4 7V4h16v3" />
                                    <line x1="12" y1="4" x2="12" y2="20" />
                                    <line x1="8" y1="20" x2="16" y2="20" />
                                </svg>
                                <span className="hidden-setting-label">Font Size</span>
                                <span className="hidden-setting-value">{fontSizeLabels[fontSize] || `${fontSize}px`}</span>
                            </div>
                            <div className="font-size-control">
                                <span className="font-size-preview" style={{ fontSize: '0.75rem' }}>A</span>
                                <input
                                    type="range"
                                    className="font-size-slider"
                                    min="12"
                                    max="16"
                                    step="1"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                                />
                                <span className="font-size-preview" style={{ fontSize: '1.3rem' }}>A</span>
                            </div>
                            <div className="font-size-ticks">
                                {[12, 13, 14, 15, 16].map(size => (
                                    <button
                                        key={size}
                                        className={`font-tick ${fontSize === size ? 'active' : ''}`}
                                        onClick={() => setFontSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="more-divider"></div>

                        {/* Screen Fit Control */}
                        <div className="hidden-setting-item">
                            <div className="hidden-setting-header">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <polyline points="9 21 3 21 3 15" />
                                    <line x1="21" y1="3" x2="14" y2="10" />
                                    <line x1="3" y1="21" x2="10" y2="14" />
                                </svg>
                                <span className="hidden-setting-label">Screen Fit</span>
                                <span className="hidden-setting-value">{(screenFitScale * 100).toFixed(0)}%</span>
                            </div>
                            <div className="font-size-control">
                                <span className="font-size-preview" style={{ fontSize: '0.8rem' }}>XS</span>
                                <input
                                    type="range"
                                    className="font-size-slider"
                                    min="0.8"
                                    max="1.5"
                                    step="0.05"
                                    value={screenFitScale}
                                    onChange={(e) => setScreenFitScale(parseFloat(e.target.value))}
                                />
                                <span className="font-size-preview" style={{ fontSize: '1.2rem' }}>XL</span>
                            </div>
                            <div className="font-size-ticks">
                                {[0.8, 1.0, 1.25, 1.5].map(scale => (
                                    <button
                                        key={scale}
                                        className={`font-tick ${screenFitScale === scale ? 'active' : ''}`}
                                        onClick={() => setScreenFitScale(scale)}
                                    >
                                        {(scale * 100).toFixed(0)}%
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </section>
        </div>
    )
}

export default More
