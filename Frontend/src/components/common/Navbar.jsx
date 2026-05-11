import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Home, Search, Heart, User, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import useAuthStore from '@store/authStore'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = [
    { to: '/', label: 'Ana Sayfa', icon: <Home size={16} /> },
    { to: '/ilanlar', label: 'İlanlar', icon: <Search size={16} /> },
    { to: '/favoriler', label: 'Favoriler', icon: <Heart size={16} /> },
  ]

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15,17,23,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--color-border)',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          letterSpacing: '-0.02em',
        }}>
          Emlak<span style={{ color: 'var(--color-text)' }}>Pro</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                background: isActive ? 'rgba(201,169,110,0.1)' : 'transparent',
                transition: 'var(--transition)',
              })}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAuthenticated ? (
            <>
              <Link to="/profil" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
              }}>
                <User size={18} />
                {user?.name}
              </Link>
              <button onClick={handleLogout} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
                color: 'var(--color-text-muted)',
                fontSize: '0.875rem',
                border: '1px solid var(--color-border)',
              }}>
                <LogOut size={15} />
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link to="/giris" style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
              }}>
                Giriş Yap
              </Link>
              <Link to="/kayit" style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-primary)',
                color: '#0f1117',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}>
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
