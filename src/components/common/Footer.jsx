import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--color-border)',
      padding: '3rem 2rem 1.5rem',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              marginBottom: '0.75rem',
            }}>
              EmlakPro
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Türkiye'nin en güvenilir gayrimenkul platformu. Hayalinizdeki evi bulmanıza yardımcı oluyoruz.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: 'var(--color-text)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem' }}>
              Hızlı Erişim
            </h4>
            {[
              { to: '/', label: 'Ana Sayfa' },
              { to: '/ilanlar', label: 'İlanlar' },
              { to: '/favoriler', label: 'Favorilerim' },
              { to: '/profil', label: 'Profilim' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block',
                color: 'var(--color-text-muted)',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                transition: 'color var(--transition)',
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'var(--color-text)', fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem' }}>
              İletişim
            </h4>
            {[
              { icon: <MapPin size={14} />, text: 'Samsun, Türkiye' },
              { icon: <Phone size={14} />, text: '+90 362 000 00 00' },
              { icon: <Mail size={14} />, text: 'info@emlakpro.com.tr' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-text-muted)',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
              }}>
                <span style={{ color: 'var(--color-primary)' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ color: 'var(--color-text-faint)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} EmlakPro. Tüm hakları saklıdır.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" style={{
                color: 'var(--color-text-muted)',
                transition: 'color var(--transition)',
              }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
