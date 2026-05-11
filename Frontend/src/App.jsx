import { useEffect, useRef, useState } from 'react'
import './App.css'

/* ── küçük yardımcılar ─────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── veri ──────────────────────────────────── */
const services = [
  {
    icon: '◈',
    title: 'Yapay Zeka Çözümleri',
    desc: 'İş süreçlerinizi dönüştüren, veriye dayalı öğrenen ve anlık karar veren AI sistemleri.',
  },
  {
    icon: '⬡',
    title: 'Bulut Mimarisi',
    desc: 'Ölçeklenebilir, yüksek erişilebilirlikli altyapı tasarımı ve DevOps entegrasyonu.',
  },
  {
    icon: '◎',
    title: 'Veri Mühendisliği',
    desc: 'Ham veriyi stratejik içgörüye dönüştüren pipeline\'lar, dashboard\'lar ve analitik sistemler.',
  },
  {
    icon: '⬢',
    title: 'Güvenlik & Uyum',
    desc: 'Zero-trust mimarisi, sızma testleri ve regülasyon uyumlu güvenlik protokolleri.',
  },
  {
    icon: '◇',
    title: 'Dijital Dönüşüm',
    desc: 'Kurumsal süreçlerin modernizasyonu; strateji, tasarım ve uygulama tek çatı altında.',
  },
  {
    icon: '⬟',
    title: 'Ürün Geliştirme',
    desc: 'Fikir aşamasından lansmanına; çevik metodoloji ile hızlı, kaliteli yazılım teslimatı.',
  },
]

const stats = [
  { value: '340+', label: 'Teslim Edilen Proje' },
  { value: '98%', label: 'Müşteri Memnuniyeti' },
  { value: '12', label: 'Yıllık Tecrübe' },
  { value: '60+', label: 'Uzman Kadro' },
]

const clients = ['Arçelik', 'Turkcell', 'Garanti BBVA', 'Sabancı', 'Anadolu Grubu', 'THY']

const works = [
  { tag: 'AI / Perakende', title: 'Gerçek Zamanlı Talep Tahmini Motoru', year: '2024' },
  { tag: 'Bulut / Fintech', title: 'Mikro Servis Tabanlı Ödeme Altyapısı', year: '2024' },
  { tag: 'Veri / Lojistik', title: 'Filo Optimizasyon Dashboard\'u', year: '2023' },
]

/* ── bileşenler ────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#" className="navbar__logo">
        <span className="logo-mark">▲</span>
        Antigraviti
      </a>
      <div className="navbar__links">
        {['Hizmetler', 'Projeler', 'Hakkımızda', 'İletişim'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
        ))}
      </div>
      <a href="#iletisim" className="navbar__cta">
        Konuşalım <span className="cta-arrow">→</span>
      </a>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      {/* Arka plan katmanları */}
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__scanline" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__badge">
          <span className="badge-dot" />
          Türkiye'nin Teknoloji Dönüşüm Ortağı
        </div>

        <h1 className="hero__title">
          Yerçekimine<br />
          <em className="hero__title--accent">meydan oku.</em>
        </h1>

        <p className="hero__sub">
          Yapay zeka, bulut ve veri mühendisliğini birleştirerek şirketlerin
          sınırlarını zorladığı sistemler inşa ediyoruz.
        </p>

        <div className="hero__actions">
          <a href="#projeler" className="btn btn--primary">
            Projelerimizi Gör
          </a>
          <a href="#hizmetler" className="btn btn--ghost">
            Nasıl Çalışırız
          </a>
        </div>

        {/* istatistik şeridi */}
        <div className="hero__stats">
          {stats.map(s => (
            <div key={s.label} className="hstat">
              <span className="hstat__val">{s.value}</span>
              <span className="hstat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* sağ görsel panel */}
      <div className="hero__visual" aria-hidden="true">
        <div className="vis-card vis-card--1">
          <div className="vis-card__dot" />
          <span>AI Engine v4.2</span>
          <strong>+312% verimlilik</strong>
        </div>
        <div className="vis-ring">
          <div className="vis-ring__inner" />
          <div className="vis-ring__pulse" />
        </div>
        <div className="vis-card vis-card--2">
          <div className="vis-card__dot vis-card__dot--green" />
          <span>Sistem Durumu</span>
          <strong>Tümü Çevrimiçi</strong>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [ref, visible] = useInView()
  return (
    <section id="hizmetler" className="section services" ref={ref}>
      <div className={`section__header ${visible ? 'anim-in' : ''}`}>
        <p className="section__eyebrow">— Uzmanlık Alanlarımız</p>
        <h2 className="section__title">Her katmanda<br />mükemmellik</h2>
      </div>
      <div className={`services__grid ${visible ? 'anim-in' : ''}`}>
        {services.map((s, i) => (
          <div
            key={s.title}
            className="service-card"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="service-card__icon">{s.icon}</div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>
            <div className="service-card__arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Works() {
  const [ref, visible] = useInView()
  return (
    <section id="projeler" className="section works" ref={ref}>
      <div className={`section__header ${visible ? 'anim-in' : ''}`}>
        <p className="section__eyebrow">— Seçilmiş Projeler</p>
        <h2 className="section__title">Ürüne dönüşen<br />fikirler</h2>
      </div>
      <div className={`works__list ${visible ? 'anim-in' : ''}`}>
        {works.map((w, i) => (
          <a
            key={w.title}
            href="#"
            className="work-item"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="work-item__left">
              <span className="work-item__tag">{w.tag}</span>
              <h3 className="work-item__title">{w.title}</h3>
            </div>
            <div className="work-item__right">
              <span className="work-item__year">{w.year}</span>
              <span className="work-item__arrow">↗</span>
            </div>
          </a>
        ))}
      </div>
      <div className={`works__cta ${visible ? 'anim-in' : ''}`}>
        <a href="#" className="btn btn--ghost">Tüm Projeleri Gör →</a>
      </div>
    </section>
  )
}

function Clients() {
  return (
    <div className="clients">
      <p className="clients__label">Güvendikleri şirketler</p>
      <div className="clients__track">
        {[...clients, ...clients].map((c, i) => (
          <span key={i} className="clients__item">{c}</span>
        ))}
      </div>
    </div>
  )
}

function CTA() {
  const [ref, visible] = useInView(0.2)
  return (
    <section id="iletisim" className="section cta-section" ref={ref}>
      <div className={`cta-box ${visible ? 'anim-in' : ''}`}>
        <div className="cta-box__bg" aria-hidden="true" />
        <p className="section__eyebrow" style={{ textAlign: 'center' }}>— Bir Adım Uzaktasınız</p>
        <h2 className="cta-box__title">
          Projenizi birlikte<br />
          <span style={{ color: 'var(--accent)' }}>hayata geçirelim.</span>
        </h2>
        <p className="cta-box__sub">
          48 saat içinde uzmanlarımızdan ücretsiz değerlendirme alın.
        </p>
        <div className="cta-box__form">
          <input
            type="email"
            placeholder="kurumsal@email.com"
            className="cta-input"
          />
          <button className="btn btn--primary">
            Hemen Başlayalım →
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <a href="#" className="navbar__logo" style={{ fontSize: '1.3rem' }}>
            <span className="logo-mark">▲</span>Antigraviti
          </a>
          <p className="footer__tagline">
            Yerçekimine meydan okuyan teknoloji çözümleri.
          </p>
        </div>
        <div className="footer__links">
          {['Hizmetler', 'Projeler', 'Hakkımızda', 'Blog', 'Kariyer'].map(l => (
            <a key={l} href="#" className="footer__link">{l}</a>
          ))}
        </div>
        <div className="footer__links">
          {['LinkedIn', 'GitHub', 'Twitter/X', 'Dribbble'].map(l => (
            <a key={l} href="#" className="footer__link">{l}</a>
          ))}
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Antigraviti Teknoloji A.Ş.</span>
        <span>İstanbul, Türkiye</span>
      </div>
    </footer>
  )
}

/* ── Ana bileşen ───────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Works />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
