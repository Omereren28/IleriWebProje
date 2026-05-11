/**
 * HomeOfEmlak — Email Service (Şablonlar + Gönderim)
 */
const { getTransporter } = require('../config/email');

const BRAND = {
  name: 'HomeOfEmlak',
  color: '#2563eb',
  url: process.env.FRONTEND_URL || 'http://localhost:3000'
};

// ── HTML E-posta Şablonu ─────────────────────────
function emailTemplate(title, content) {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND.color} 0%, #1d4ed8 100%);padding:32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">🏠 ${BRAND.name}</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Güvenilir Gayrimenkul Platformu</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:12px;">
                Bu e-posta ${BRAND.name} tarafından gönderilmiştir.<br>
                © 2026 ${BRAND.name}. Tüm hakları saklıdır.
              </p>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:11px;">
                <a href="${BRAND.url}" style="color:${BRAND.color};text-decoration:none;">${BRAND.url}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── 6 Haneli Doğrulama Kodu E-postası (Kayıt) ───
async function sendVerificationCodeEmail(user, code) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('📧 [MOCK] Doğrulama kodu gönderildi:', user.email, '→ Kod:', code);
    return;
  }

  const content = `
    <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">E-posta Doğrulama 📧</h2>
    <p style="color:#374151;font-size:15px;line-height:1.6;">
      Merhaba <strong>${user.firstName}</strong>,
    </p>
    <p style="color:#374151;font-size:15px;line-height:1.6;">
      <strong>${BRAND.name}</strong>'a hoş geldiniz! Hesabınızı doğrulamak için aşağıdaki kodu kullanın:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <div style="display:inline-block;background:linear-gradient(135deg, ${BRAND.color}, #1d4ed8);color:#ffffff;padding:20px 40px;border-radius:12px;font-size:36px;font-weight:800;letter-spacing:12px;font-family:monospace;">
        ${code}
      </div>
    </div>
    <p style="color:#6b7280;font-size:13px;text-align:center;">
      Bu kod <strong>10 dakika</strong> içinde geçerlidir.
    </p>
    <p style="color:#9ca3af;font-size:12px;margin-top:20px;">
      Bu işlemi siz yapmadıysanız bu e-postayı dikkate almayınız.
    </p>
  `;

  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: `🔐 Doğrulama Kodunuz: ${code} - ${BRAND.name}`,
      html: emailTemplate('E-posta Doğrulama', content)
    });
    console.log('📧 Doğrulama kodu gönderildi:', user.email);
  } catch (error) {
    console.error('📧 E-posta gönderim hatası:', error.message);
    throw error;
  }
}

// ── 6 Haneli Şifre Sıfırlama Kodu E-postası ─────
async function sendResetCodeEmail(user, code) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('📧 [MOCK] Şifre sıfırlama kodu gönderildi:', user.email, '→ Kod:', code);
    return;
  }

  const content = `
    <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Şifre Sıfırlama 🔐</h2>
    <p style="color:#374151;font-size:15px;line-height:1.6;">
      Merhaba <strong>${user.firstName}</strong>,
    </p>
    <p style="color:#374151;font-size:15px;line-height:1.6;">
      Şifrenizi sıfırlamak için aşağıdaki kodu kullanın:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <div style="display:inline-block;background:linear-gradient(135deg, #ef4444, #dc2626);color:#ffffff;padding:20px 40px;border-radius:12px;font-size:36px;font-weight:800;letter-spacing:12px;font-family:monospace;">
        ${code}
      </div>
    </div>
    <p style="color:#6b7280;font-size:13px;text-align:center;">
      Bu kod <strong>10 dakika</strong> içinde geçerlidir.
    </p>
    <p style="color:#9ca3af;font-size:12px;margin-top:20px;">
      Bu işlemi siz yapmadıysanız bu e-postayı dikkate almayınız. Şifreniz değişmez.
    </p>
  `;

  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: `🔐 Şifre Sıfırlama Kodunuz: ${code} - ${BRAND.name}`,
      html: emailTemplate('Şifre Sıfırlama', content)
    });
    console.log('📧 Şifre sıfırlama kodu gönderildi:', user.email);
  } catch (error) {
    console.error('📧 E-posta gönderim hatası:', error.message);
    throw error;
  }
}

// ── Hoş Geldin E-postası (Kayıt Onayından Sonra) ─
async function sendWelcomeEmail(user) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('📧 [MOCK] Hoş geldin e-postası gönderildi:', user.email);
    return;
  }

  const content = `
    <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Merhaba ${user.firstName}! 👋</h2>
    <p style="color:#374151;font-size:15px;line-height:1.6;">
      <strong>${BRAND.name}</strong>'a hoş geldiniz! Hesabınız başarıyla doğrulandı.
    </p>
    <p style="color:#374151;font-size:15px;line-height:1.6;">
      Artık şunları yapabilirsiniz:
    </p>
    <ul style="color:#374151;font-size:15px;line-height:2;">
      <li>🔍 Binlerce ilan arasında arayın</li>
      <li>❤️ Beğendiğiniz ilanları favorilerinize ekleyin</li>
      <li>📝 Kendi ilanlarınızı yayınlayın</li>
      <li>📊 İlanları karşılaştırın</li>
    </ul>
    <div style="text-align:center;margin:28px 0;">
      <a href="${BRAND.url}/#/ilanlar" style="background:${BRAND.color};color:#ffffff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block;">
        İlanları Keşfet →
      </a>
    </div>
    <p style="color:#6b7280;font-size:13px;">
      Herhangi bir sorunuz varsa, <a href="${BRAND.url}/#/iletisim" style="color:${BRAND.color};">iletişim sayfamızdan</a> bize ulaşabilirsiniz.
    </p>
  `;

  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: `🏠 ${BRAND.name}'a Hoş Geldiniz!`,
      html: emailTemplate(`${BRAND.name}'a Hoş Geldiniz`, content)
    });
    console.log('📧 Hoş geldin e-postası gönderildi:', user.email);
  } catch (error) {
    console.error('📧 E-posta gönderim hatası:', error.message);
  }
}

// ── İlan Yayınlandı Bildirimi ────────────────────
async function sendListingPublishedEmail(user, property) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('📧 [MOCK] İlan yayınlandı bildirimi:', user.email, property.title);
    return;
  }

  const content = `
    <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">İlanınız Yayınlandı! 🎉</h2>
    <p style="color:#374151;font-size:15px;line-height:1.6;">
      Merhaba <strong>${user.firstName}</strong>,
    </p>
    <p style="color:#374151;font-size:15px;line-height:1.6;">
      <strong>"${property.title}"</strong> başlıklı ilanınız başarıyla yayınlandı.
    </p>
    <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${BRAND.color};">
      <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Fiyat:</strong> ${Number(property.price).toLocaleString('tr-TR')} ₺</p>
      <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Konum:</strong> ${property.district}, ${property.city}</p>
      <p style="margin:0;font-size:14px;color:#374151;"><strong>Kategori:</strong> ${property.category}</p>
    </div>
    <div style="text-align:center;margin:28px 0;">
      <a href="${BRAND.url}/#/ilan/${property.id}" style="background:${BRAND.color};color:#ffffff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block;">
        İlanınızı Görüntüleyin →
      </a>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: `🎉 İlanınız Yayınlandı - ${BRAND.name}`,
      html: emailTemplate('İlan Yayınlandı', content)
    });
    console.log('📧 İlan yayınlandı bildirimi gönderildi:', user.email);
  } catch (error) {
    console.error('📧 E-posta gönderim hatası:', error.message);
  }
}

// ── İletişim Formu Bildirim (Admin'e) ────────────
async function sendContactNotificationEmail(contactData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('📧 [MOCK] İletişim bildirim e-postası:', contactData.email);
    return;
  }

  const content = `
    <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Yeni İletişim Mesajı 📬</h2>
    <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:16px 0;">
      <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Gönderen:</strong> ${contactData.name}</p>
      <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>E-posta:</strong> ${contactData.email}</p>
      ${contactData.phone ? `<p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Telefon:</strong> ${contactData.phone}</p>` : ''}
      <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Konu:</strong> ${contactData.subject}</p>
    </div>
    <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0;">
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${contactData.message}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `📬 Yeni İletişim: ${contactData.subject} - ${BRAND.name}`,
      html: emailTemplate('Yeni İletişim Mesajı', content)
    });
    console.log('📧 İletişim bildirim e-postası gönderildi');
  } catch (error) {
    console.error('📧 E-posta gönderim hatası:', error.message);
  }
}

module.exports = {
  sendVerificationCodeEmail,
  sendResetCodeEmail,
  sendWelcomeEmail,
  sendListingPublishedEmail,
  sendContactNotificationEmail
};
