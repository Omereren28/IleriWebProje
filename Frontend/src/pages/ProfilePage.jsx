import useAuthStore from '@store/authStore'
import { User, Mail, Phone, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div style={{ maxWidth: '700px', margin: '3rem auto', padding: '0 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>
        Profilim
      </h1>

      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(201,169,110,0.15)',
          border: '2px solid rgba(201,169,110,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          color: 'var(--color-primary)',
        }}>
          <User size={32} />
        </div>

        <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.25rem' }}>
          {user?.name || 'Kullanıcı Adı'}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {user?.email || 'kullanici@email.com'}
        </p>

        <button onClick={handleLogout} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(248,113,113,0.1)',
          border: '1px solid rgba(248,113,113,0.2)',
          color: 'var(--color-error)',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}>
          <LogOut size={16} />
          Çıkış Yap
        </button>
      </div>
    </div>
  )
}
