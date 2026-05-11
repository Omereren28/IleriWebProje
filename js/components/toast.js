/**
 * HomeOfEmlak — Toast Notification Component
 */

let toastTimeout = null;

export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Remove existing
  container.innerHTML = '';
  clearTimeout(toastTimeout);

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type} toast-enter`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || icons.info}</span>
    <span class="toast__message">${message}</span>
    <button class="toast__close" aria-label="Kapat">✕</button>
  `;

  container.appendChild(toast);

  toast.querySelector('.toast__close').addEventListener('click', () => dismissToast(toast));

  toastTimeout = setTimeout(() => dismissToast(toast), duration);
}

function dismissToast(toast) {
  toast.classList.remove('toast-enter');
  toast.classList.add('toast-exit');
  setTimeout(() => toast.remove(), 300);
}
