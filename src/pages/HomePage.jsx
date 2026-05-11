import { Link } from 'react-router-dom'
import { Search, MapPin, TrendingUp, Shield, Clock } from 'lucide-react'

export default function HomePage() {
  const stats = [
    { label: 'Aktif İlan', value: '12.400+' },
    { label: 'Mutlu Müşteri', value: '8.200+' },
    { label: 'Şehir', value: '81' },
    { label: 'Yıllık Deneyim', value: '15+' },
  ]

  const features = [
    {
      icon: <Search size={24} />,
      title: 'Akıllı Arama',
      desc: 'Gelişmiş filtrelerle tam ihtiyacınıza uyan evi saniyeler içinde bulun.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Güvenli İşlem',
      desc: 'Tüm ilanlar doğrulanmış, güvenli ödeme sistemiyle korumalı.',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Piyasa Analizi',
      desc: 'Güncel fiyat verileri ve bölge analizleriyle doğru karar alın.',
    },
    {
      icon: <Clock size={24} />,
      title: '7/24 Destek',
      desc: 'Uzman ekibimiz her zaman yanınızda, sorularınızı anında yanıtlıyoruz.',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 60% 0%, rgba(201,169,110,0.08) 0%, transparent 60%)',
      }}>
        <div style={{ maxWidth: '760px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(201,169,110,0.1)',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: '100px',
            padding: '6px 18px',
            fontSize: '0.8rem',
            color: 'var(--color-primary)',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Türkiye'nin Güvenilir Emlak Platformu
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
          }}>
            Hayalinizdeki Evi<br />
            <span style={{ color: 'var(--color-primary)' }}>Birlikte Bulalım</span>
          </h1>

          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '540px',
            margin: '0 auto 2.5rem',
          }}>
            12.000'den fazla güncel ilan arasından filtreleme yapın, bölge analizi inceleyin ve güvenle alım-satım yapın.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ilanlar" style={{
              padding: '14px 32px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-primary)',
              color: '#0f1117',
              fontWeight: 700,
              fontSize: '1rem',
            }}>
              İlanları Keşfet
            </Link>
            <Link to="/kayit" style={{
              padding: '14px 32px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontWeight: 500,
              fontSize: '1rem',
            }}>
              Ücretsiz Kaydol
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        padding: '3rem 2rem',
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {s.value}
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '0.75rem',
          }}>
            Neden EmlakPro?
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--color-text-muted)',
            marginBottom: '3.5rem',
          }}>
            Gayrimenkul sürecinizi kolaylaştıran özellikler
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(201,169,110,0.1)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  fontSize: '1.05rem',
                }}>
                  {f.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
