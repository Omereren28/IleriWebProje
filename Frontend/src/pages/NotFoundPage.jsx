import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 15vw, 10rem)',
        fontWeight: 700,
        color: 'var(--color-primary)',
        opacity: 0.3,
        lineHeight: 1,
        marginBottom: '1rem',
      }}>
        404
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
        Sayfa Bulunamadı
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Link to="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 28px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-primary)',
        color: '#0f1117',
        fontWeight: 700,
      }}>
        <Home size={18} />
        Ana Sayfaya Dön
      </Link>
    </div>
  )
}
