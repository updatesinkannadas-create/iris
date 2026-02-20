import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export function useSettings() {
    return useContext(SettingsContext)
}

export function SettingsProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('iris-theme') || 'dark'
    })

    const [fontSize, setFontSize] = useState(() => {
        return parseInt(localStorage.getItem('iris-font-size') || '12', 10)
    })

    // Apply theme
    useEffect(() => {
        localStorage.setItem('iris-theme', theme)
        const root = document.documentElement

        if (theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            applyTheme(root, prefersDark ? 'dark' : 'light')

            const listener = (e) => applyTheme(root, e.matches ? 'dark' : 'light')
            const mq = window.matchMedia('(prefers-color-scheme: dark)')
            mq.addEventListener('change', listener)
            return () => mq.removeEventListener('change', listener)
        } else {
            applyTheme(root, theme)
        }
    }, [theme])

    // Apply font size — changes root font-size so rem units scale
    useEffect(() => {
        localStorage.setItem('iris-font-size', fontSize.toString())
        document.documentElement.style.fontSize = `${fontSize}px`
    }, [fontSize])

    return (
        <SettingsContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
            {children}
        </SettingsContext.Provider>
    )
}

function applyTheme(root, mode) {
    if (mode === 'light') {
        root.setAttribute('data-theme', 'light')
        root.style.setProperty('--bg-primary', '#f2f2f7')
        root.style.setProperty('--bg-card', '#ffffff')
        root.style.setProperty('--bg-card-alt', '#f0f0f5')
        root.style.setProperty('--bg-card-dark', '#e8e8ed')
        root.style.setProperty('--bg-input', '#ffffff')
        root.style.setProperty('--text-primary', '#000000')
        root.style.setProperty('--text-secondary', '#6c6c70')
        root.style.setProperty('--text-muted', '#8e8e93')
        root.style.setProperty('--border-color', 'transparent')
        root.style.setProperty('--border-subtle', '#e5e5ea')
        root.style.setProperty('--nav-bg', '#f9f9f9')
        root.style.setProperty('--card-shadow', '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)')
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f2f2f7')
    } else {
        root.setAttribute('data-theme', 'dark')
        root.style.setProperty('--bg-primary', '#000000')
        root.style.setProperty('--bg-card', '#1c1c1e')
        root.style.setProperty('--bg-card-alt', '#252527')
        root.style.setProperty('--bg-card-dark', '#161618')
        root.style.setProperty('--bg-input', '#1c1c1e')
        root.style.setProperty('--text-primary', '#ffffff')
        root.style.setProperty('--text-secondary', '#8e8e93')
        root.style.setProperty('--text-muted', '#636366')
        root.style.setProperty('--border-color', '#2c2c2e')
        root.style.setProperty('--border-subtle', '#2c2c2e')
        root.style.setProperty('--nav-bg', '#000000')
        root.style.setProperty('--card-shadow', 'none')
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#000000')
    }
}
