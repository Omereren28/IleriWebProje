/**
 * HomeOfEmlak — Modal Component
 */

export function openModal(content, options = {}) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  const { title = '', onClose = null, size = 'md' } = options;

  overlay.innerHTML = `
    <div class="modal modal--${size} modal-enter">
      ${title ? `<div class="modal__header"><h3 class="modal__title">${title}</h3><button class="modal__close" aria-label="Kapat">✕</button></div>` : '<button class="modal__close modal__close--abs" aria-label="Kapat">✕</button>'}
      <div class="modal__body">${typeof content === 'string' ? content : ''}</div>
    </div>
  `;

  if (typeof content !== 'string' && content instanceof HTMLElement) {
    overlay.querySelector('.modal__body').appendChild(content);
  }

  overlay.classList.add('modal-overlay--active', 'modal-overlay-enter');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Close handlers
  const closeBtn = overlay.querySelector('.modal__close');
  const handleClose = () => {
    closeModal();
    if (onClose) onClose();
  };
  closeBtn.addEventListener('click', handleClose);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) handleClose();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      handleClose();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

export function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('modal-overlay--active', 'modal-overlay-enter');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { overlay.innerHTML = ''; }, 300);
}
