import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Categories from './pages/Categories'
import More from './pages/More'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import EditProfile from './pages/EditProfile'
import BottomNav from './components/BottomNav'
import ChatButton from './components/ChatButton'
import './App.css'

function App() {
  const { user, isNewUser, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Loading...</p>
    </div>
  }

  if (!user) {
    return <Login />
  }

  if (isNewUser) {
    return <Onboarding />
  }

  return (
    <div className="app">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/more" element={<More />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/edit-profile" element={null} />
        <Route path="*" element={<ChatButton />} />
      </Routes>
      <Routes>
        <Route path="/edit-profile" element={null} />
        <Route path="*" element={<BottomNav />} />
      </Routes>
    </div>
  )
}

export default App
