import useFavoritesStore from '@store/favoritesStore'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Maximize2, BedDouble, Trash2 } from 'lucide-react'
import { formatPrice } from '@utils/helpers'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoritesStore()

  if (favorites.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '6rem 2rem',
        color: 'var(--color-text-muted)',
      }}>
        <Heart size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.75rem', color: 'var(--color-text)' }}>
          Favori İlanınız Yok
        </h2>
        <p style={{ marginBottom: '2rem' }}>Beğendiğiniz ilanları favorilere ekleyerek burada görüntüleyin.</p>
        <Link to="/ilanlar" style={{
          padding: '12px 28px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-primary)',
          color: '#0f1117',
          fontWeight: 700,
        }}>
          İlanları Keşfet
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Favorilerim
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        {favorites.length} ilan favorilerde
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {favorites.map(listing => (
          <div key={listing.id} style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '180px',
              background: 'var(--color-surface-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-faint)',
              fontSize: '0.8rem',
            }}>
              Fotoğraf
            </div>
            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{listing.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                <MapPin size={13} /> {listing.district}, {listing.city}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatPrice(listing.price)}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/ilanlar/${listing.id}`} style={{
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(201,169,110,0.15)',
                    color: 'var(--color-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: '1px solid rgba(201,169,110,0.3)',
                  }}>
                    Detay
                  </Link>
                  <button onClick={() => removeFavorite(listing.id)} style={{
                    padding: '7px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(248,113,113,0.1)',
                    color: 'var(--color-error)',
                    border: '1px solid rgba(248,113,113,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
