import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '@services/authService'
import useAuthStore from '@store/authStore'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await authService.register(data)
      login(res.user, res.token)
      toast.success('Hoş geldiniz!')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Kayıt olunamadı.')
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
      maxWidth: '440px',
    }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Kayıt Ol
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Yeni bir hesap oluşturun
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {[
          { name: 'name', label: 'Ad Soyad', type: 'text', placeholder: 'Adınız Soyadınız', rules: { required: 'Ad zorunlu' } },
          { name: 'email', label: 'E-posta', type: 'email', placeholder: 'ornek@email.com', rules: { required: 'E-posta zorunlu' } },
          { name: 'password', label: 'Şifre', type: 'password', placeholder: '••••••••', rules: { required: 'Şifre zorunlu', minLength: { value: 6, message: 'En az 6 karakter' } } },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
              {field.label}
            </label>
            <input
              {...register(field.name, field.rules)}
              type={field.type}
              placeholder={field.placeholder}
              style={inputStyle}
            />
            {errors[field.name] && (
              <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '4px' }}>
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}

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
            marginTop: '0.5rem',
            marginBottom: '1.25rem',
          }}
        >
          {isSubmitting ? 'Kaydediliyor…' : 'Kayıt Ol'}
        </button>
      </form>

      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
        Zaten hesabınız var mı?{' '}
        <Link to="/giris" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
          Giriş Yap
        </Link>
      </p>
    </div>
  )
}
