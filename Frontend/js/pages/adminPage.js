/**
 * HomeOfEmlak — Admin Panel Page
 */
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';
import { isLoggedIn, getUser, getToken } from '../services/api.js';

const API_BASE = '/api';

async function adminRequest(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`, ...options.headers };
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function renderAdminPage(container) {
  const user = getUser();
  if (!isLoggedIn() || !user || user.role !== 'admin') {
    showToast('Bu sayfaya erişim yetkiniz yok.', 'error');
    navigate('/'); return;
  }

  container.innerHTML = `
    <div class="admin-page" style="padding:var(--space-8) 0">
      <div class="container">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-8)">
          <div>
            <h1 class="heading-2" style="margin-bottom:4px">⚙️ Admin Panel</h1>
            <p class="text-body" style="color:var(--text-muted)">Platform yönetimi</p>
          </div>
        </div>

        <!-- Stats -->
        <div id="admin-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-4);margin-bottom:var(--space-8)">
          <div class="form-card" style="text-align:center;padding:var(--space-6)"><div style="font-size:32px;font-weight:700;color:var(--primary)" id="stat-users">-</div><p class="text-small" style="color:var(--text-muted);margin-top:4px">Kullanıcılar</p></div>
          <div class="form-card" style="text-align:center;padding:var(--space-6)"><div style="font-size:32px;font-weight:700;color:var(--success)" id="stat-properties">-</div><p class="text-small" style="color:var(--text-muted);margin-top:4px">İlanlar</p></div>
          <div class="form-card" style="text-align:center;padding:var(--space-6)"><div style="font-size:32px;font-weight:700;color:var(--warning)" id="stat-messages">-</div><p class="text-small" style="color:var(--text-muted);margin-top:4px">Mesajlar</p></div>
          <div class="form-card" style="text-align:center;padding:var(--space-6)"><div style="font-size:32px;font-weight:700;color:var(--danger)" id="stat-unread">-</div><p class="text-small" style="color:var(--text-muted);margin-top:4px">Okunmamış</p></div>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:4px;margin-bottom:var(--space-6);border-bottom:2px solid var(--border);padding-bottom:0">
          <button class="admin-tab admin-tab--active" data-tab="users" style="padding:10px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:600;color:var(--primary);border-bottom:2px solid var(--primary);margin-bottom:-2px">👥 Kullanıcılar</button>
          <button class="admin-tab" data-tab="messages" style="padding:10px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:500;color:var(--text-muted);border-bottom:2px solid transparent;margin-bottom:-2px">📬 Mesajlar</button>
        </div>

        <div id="admin-content"></div>
      </div>
    </div>
  `;

  // Load stats
  try {
    const r = await adminRequest('/admin/stats');
    document.getElementById('stat-users').textContent = r.data.totalUsers;
    document.getElementById('stat-properties').textContent = r.data.totalProperties;
    document.getElementById('stat-messages').textContent = r.data.totalMessages;
    document.getElementById('stat-unread').textContent = r.data.unreadMessages;
  } catch(e) { console.error('Stats error:', e); }

  // Tabs
  container.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.admin-tab').forEach(t => { t.classList.remove('admin-tab--active'); t.style.color='var(--text-muted)'; t.style.borderBottomColor='transparent'; });
      tab.classList.add('admin-tab--active'); tab.style.color='var(--primary)'; tab.style.borderBottomColor='var(--primary)';
      loadTab(tab.dataset.tab);
    });
  });

  async function loadTab(tab) {
    const content = document.getElementById('admin-content');
    if (tab === 'users') await loadUsers(content);
    else if (tab === 'messages') await loadMessages(content);
  }

  async function loadUsers(el) {
    el.innerHTML = '<p style="text-align:center;padding:var(--space-8)">Yükleniyor...</p>';
    try {
      const r = await adminRequest('/admin/users');
      const users = r.data.users;
      el.innerHTML = `
        <div class="form-card" style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <thead>
              <tr style="border-bottom:2px solid var(--border)">
                <th style="padding:12px 16px;text-align:left;color:var(--text-muted);font-weight:600">ID</th>
                <th style="padding:12px 16px;text-align:left;color:var(--text-muted);font-weight:600">Ad Soyad</th>
                <th style="padding:12px 16px;text-align:left;color:var(--text-muted);font-weight:600">E-posta</th>
                <th style="padding:12px 16px;text-align:left;color:var(--text-muted);font-weight:600">Rol</th>
                <th style="padding:12px 16px;text-align:left;color:var(--text-muted);font-weight:600">Doğrulanmış</th>
                <th style="padding:12px 16px;text-align:left;color:var(--text-muted);font-weight:600">Kayıt</th>
                <th style="padding:12px 16px;text-align:left;color:var(--text-muted);font-weight:600">İşlem</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr style="border-bottom:1px solid var(--border)" data-user-id="${u.id}">
                  <td style="padding:12px 16px">${u.id}</td>
                  <td style="padding:12px 16px;font-weight:500">${u.firstName} ${u.lastName}</td>
                  <td style="padding:12px 16px;color:var(--text-muted)">${u.email}</td>
                  <td style="padding:12px 16px"><span style="padding:2px 8px;border-radius:12px;font-size:12px;font-weight:600;background:${u.role==='admin'?'var(--danger)':u.role==='agent'?'var(--primary)':'var(--text-muted)'};color:white">${u.role}</span></td>
                  <td style="padding:12px 16px">${u.isVerified ? '✅' : '❌'}</td>
                  <td style="padding:12px 16px;color:var(--text-muted);font-size:12px">${new Date(u.createdAt).toLocaleDateString('tr-TR')}</td>
                  <td style="padding:12px 16px">${u.role!=='admin'?`<button class="delete-user-btn" data-id="${u.id}" style="padding:4px 12px;border:1px solid var(--danger);color:var(--danger);background:none;border-radius:6px;cursor:pointer;font-size:12px">Sil</button>`:''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      el.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
          try {
            await adminRequest(`/admin/users/${btn.dataset.id}`, { method: 'DELETE' });
            showToast('Kullanıcı silindi', 'success');
            loadUsers(el);
          } catch(err) { showToast(err.message || 'Silinemedi', 'error'); }
        });
      });
    } catch(e) { el.innerHTML = `<p style="color:var(--danger);padding:var(--space-4)">Hata: ${e.message}</p>`; }
  }

  async function loadMessages(el) {
    el.innerHTML = '<p style="text-align:center;padding:var(--space-8)">Yükleniyor...</p>';
    try {
      const r = await adminRequest('/admin/messages');
      const msgs = r.data.messages;
      if (!msgs.length) { el.innerHTML = '<div class="empty-state" style="padding:var(--space-8)"><p>Henüz mesaj yok.</p></div>'; return; }
      el.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          ${msgs.map(m => `
            <div class="form-card" style="padding:var(--space-4) var(--space-6);border-left:4px solid ${m.isRead?'var(--border)':'var(--primary)'}">
              <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">
                <div>
                  <strong style="font-size:15px">${m.name}</strong>
                  <span style="color:var(--text-muted);font-size:13px;margin-left:8px">${m.email}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:12px;color:var(--text-muted)">${new Date(m.createdAt).toLocaleString('tr-TR')}</span>
                  ${!m.isRead?`<button class="mark-read-btn" data-id="${m.id}" style="padding:2px 8px;border:1px solid var(--primary);color:var(--primary);background:none;border-radius:4px;cursor:pointer;font-size:11px">Okundu</button>`:'<span style="font-size:11px;color:var(--success)">✓ Okundu</span>'}
                </div>
              </div>
              <p style="font-weight:600;font-size:14px;margin-bottom:4px">${m.subject}</p>
              <p style="color:var(--text-secondary);font-size:13px;line-height:1.5">${m.message}</p>
            </div>
          `).join('')}
        </div>
      `;

      el.querySelectorAll('.mark-read-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            await adminRequest(`/admin/messages/${btn.dataset.id}/read`, { method: 'PUT' });
            showToast('Okundu işaretlendi', 'success');
            loadMessages(el);
          } catch(err) { showToast(err.message || 'Hata', 'error'); }
        });
      });
    } catch(e) { el.innerHTML = `<p style="color:var(--danger);padding:var(--space-4)">Hata: ${e.message}</p>`; }
  }

  // Initial load
  loadTab('users');
}
