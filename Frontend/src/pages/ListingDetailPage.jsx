import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, BedDouble, Maximize2, Calendar, Heart } from 'lucide-react'
import { formatPrice, formatDate } from '@utils/helpers'
import useFavoritesStore from '@store/favoritesStore'

export default function ListingDetailPage() {
  const { id } = useParams()
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()

  // Örnek veri (API bağlandığında useListing(id) ile değiştirilecek)
  const listing = {
    id,
    title: 'Deniz Manzaralı Lüks 3+1 Daire',
    price: 4500000,
    area: 145,
    rooms: '3+1',
    floor: 8,
    totalFloors: 12,
    buildYear: 2020,
    city: 'Samsun',
    district: 'Atakum',
    address: 'Atakum Mah. Sahil Cad. No:42',
    type: 'Satılık',
    createdAt: new Date().toISOString(),
    description: 'Samsun Atakum\'da deniz manzaralı, güneş gören, ebeveyn banyolu, amerikan mutfaklı, balkonlu lüks daire. Tüm odalar geniş ve ferah. Site içinde otopark, havuz ve spor alanı mevcuttur.',
    features: ['Balkon', 'Otopark', 'Havuz', 'Asansör', 'Site İçi', 'Ebeveyn Banyo', 'Amerikan Mutfak', 'Doğalgaz'],
  }

  const fav = isFavorite(listing.id)

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
      <Link to="/ilanlar" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--color-text-muted)',
        fontSize: '0.9rem',
        marginBottom: '1.5rem',
      }}>
        <ArrowLeft size={16} /> Geri Dön
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
        {/* Sol */}
        <div>
          <div style={{
            background: 'var(--color-surface-2)',
            borderRadius: 'var(--radius-lg)',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-faint)',
            marginBottom: '1.5rem',
            border: '1px solid var(--color-border)',
          }}>
            Fotoğraf Galerisi
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}>
            {listing.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            <MapPin size={15} /> {listing.address}, {listing.district} / {listing.city}
          </div>

          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ fontWeight: 600, marginBottom: '1rem' }}>Detaylar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Oda Sayısı', value: listing.rooms },
                { label: 'Brüt Alan', value: `${listing.area} m²` },
                { label: 'Kat', value: `${listing.floor} / ${listing.totalFloors}` },
                { label: 'Yapım Yılı', value: listing.buildYear },
              ].map(d => (
                <div key={d.label} style={{
                  background: 'var(--color-surface-2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                }}>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginBottom: '4px' }}>{d.label}</div>
                  <div style={{ fontWeight: 600 }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Açıklama</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>{listing.description}</p>
          </div>

          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
          }}>
            <h2 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Özellikler</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {listing.features.map(f => (
                <span key={f} style={{
                  background: 'rgba(201,169,110,0.1)',
                  border: '1px solid rgba(201,169,110,0.2)',
                  borderRadius: '100px',
                  padding: '6px 14px',
                  fontSize: '0.85rem',
                  color: 'var(--color-primary-light)',
                }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ — fiyat kartı */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          position: 'sticky',
          top: '80px',
        }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--color-primary)',
            color: '#0f1117',
            fontWeight: 700,
            fontSize: '0.8rem',
            padding: '4px 12px',
            borderRadius: '100px',
            marginBottom: '1rem',
          }}>
            {listing.type}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            marginBottom: '1.5rem',
          }}>
            {formatPrice(listing.price)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-primary)',
              color: '#0f1117',
              fontWeight: 700,
              fontSize: '1rem',
              width: '100%',
            }}>
              İletişime Geç
            </button>
            <button
              onClick={() => fav ? removeFavorite(listing.id) : addFavorite(listing)}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: fav ? 'var(--color-error)' : 'var(--color-text)',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '100%',
                cursor: 'pointer',
              }}
            >
              <Heart size={17} fill={fav ? 'currentColor' : 'none'} />
              {fav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </button>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'var(--color-surface-2)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-text-muted)',
            fontSize: '0.8rem',
          }}>
            <Calendar size={14} />
            {formatDate(listing.createdAt)} tarihinde yayınlandı
          </div>
        </div>
      </div>
    </div>
  )
}
