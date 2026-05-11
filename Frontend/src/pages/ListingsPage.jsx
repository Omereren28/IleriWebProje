import { useListings } from '@hooks/useListings'
import { formatPrice } from '@utils/helpers'
import { MapPin, Maximize2, BedDouble, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import useFavoritesStore from '@store/favoritesStore'

export default function ListingsPage() {
  const { data: listings, isLoading, error } = useListings()
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ color: 'var(--color-text-muted)' }}>İlanlar yükleniyor…</div>
    </div>
  )

  if (error) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-error)' }}>
      İlanlar yüklenirken bir hata oluştu.
    </div>
  )

  // API yokken örnek veri
  const mockListings = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `${['Deniz Manzaralı', 'Merkezi', 'Ferah', 'Yeni Bina'][i % 4]} ${['3+1 Daire', '2+1 Daire', 'Villa', 'Stüdyo'][i % 4]}`,
    price: (500 + i * 150) * 1000,
    area: 80 + i * 20,
    rooms: `${(i % 4) + 1}+1`,
    city: ['Samsun', 'İstanbul', 'İzmir', 'Ankara'][i % 4],
    district: ['Atakum', 'Kadıköy', 'Karşıyaka', 'Çankaya'][i % 4],
    type: i % 2 === 0 ? 'Satılık' : 'Kiralık',
  }))

  const items = listings || mockListings

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2.2rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
      }}>
        İlanlar
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        {items.length} ilan listeleniyor
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {items.map((listing) => (
          <div key={listing.id} style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            transition: 'border-color var(--transition), transform var(--transition)',
          }}>
            {/* Image placeholder */}
            <div style={{
              height: '200px',
              background: 'var(--color-surface-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-faint)',
              fontSize: '0.8rem',
              position: 'relative',
            }}>
              <span>Fotoğraf</span>
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: listing.type === 'Satılık' ? 'var(--color-primary)' : 'var(--color-success)',
                color: '#0f1117',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '100px',
              }}>
                {listing.type}
              </span>
              <button
                onClick={() => isFavorite(listing.id) ? removeFavorite(listing.id) : addFavorite(listing)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(15,17,23,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isFavorite(listing.id) ? 'var(--color-error)' : 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Heart size={16} fill={isFavorite(listing.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>
                {listing.title}
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
                marginBottom: '1rem',
              }}>
                <MapPin size={13} />
                {listing.district}, {listing.city}
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BedDouble size={14} /> {listing.rooms}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Maximize2 size={14} /> {listing.area} m²
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                }}>
                  {formatPrice(listing.price)}
                </span>
                <Link to={`/ilanlar/${listing.id}`} style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(201,169,110,0.15)',
                  color: 'var(--color-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid rgba(201,169,110,0.3)',
                }}>
                  Detay
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
