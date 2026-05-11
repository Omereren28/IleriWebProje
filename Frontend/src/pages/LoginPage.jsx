import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '@services/authService'
import useAuthStore from '@store/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await authService.login(data)
      login(res.user, res.token)
      toast.success('Giriş başarılı!')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Giriş yapılamadı.')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    outline: 'none',
  }

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      padding: '2.5rem',
      width: '100%',
      maxWidth: '420px',
    }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Giriş Yap
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Hesabınıza giriş yapın
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
            E-posta
          </label>
          <input
            {...register('email', { required: 'E-posta zorunlu' })}
            type="email"
            placeholder="ornek@email.com"
            style={inputStyle}
          />
          {errors.email && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
            Şifre
          </label>
          <input
            {...register('password', { required: 'Şifre zorunlu' })}
            type="password"
            placeholder="••••••••"
            style={inputStyle}
          />
          {errors.password && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary)',
            color: '#0f1117',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
            marginBottom: '1.25rem',
          }}
        >
          {isSubmitting ? 'Giriş yapılıyor…' : 'Giriş Yap'}
        </button>
      </form>

      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
        Hesabınız yok mu?{' '}
        <Link to="/kayit" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
          Kayıt Ol
        </Link>
      </p>
    </div>
  )
}
