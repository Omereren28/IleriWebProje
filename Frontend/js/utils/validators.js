/**
 * HomeOfEmlak — Form Validators
 */

export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} zorunludur`;
  }
  return null;
}

export function validateEmail(value) {
  if (!value) return 'E-posta adresi zorunludur';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) return 'Geçerli bir e-posta adresi giriniz';
  return null;
}

export function validatePhone(value) {
  if (!value) return 'Telefon numarası zorunludur';
  const cleaned = value.replace(/[\s\-\(\)]/g, '');
  if (!/^(\+90|0)?[5]\d{9}$/.test(cleaned)) return 'Geçerli bir telefon numarası giriniz';
  return null;
}

export function validateMinMax(min, max, label) {
  if (min && max && Number(min) > Number(max)) {
    return `Minimum ${label} maksimumdan büyük olamaz`;
  }
  return null;
}

export function validatePrice(value) {
  if (!value) return 'Fiyat zorunludur';
  if (isNaN(value) || Number(value) <= 0) return 'Geçerli bir fiyat giriniz';
  return null;
}

export function showFieldError(input, message) {
  clearFieldError(input);
  input.classList.add('input--error');
  const error = document.createElement('span');
  error.className = 'field-error';
  error.textContent = message;
  input.parentNode.appendChild(error);
}

export function clearFieldError(input) {
  input.classList.remove('input--error');
  const existing = input.parentNode.querySelector('.field-error');
  if (existing) existing.remove();
}

export function clearAllErrors(form) {
  form.querySelectorAll('.input--error').forEach(el => el.classList.remove('input--error'));
  form.querySelectorAll('.field-error').forEach(el => el.remove());
}
