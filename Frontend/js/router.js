/**
 * HomeOfEmlak — Hash-Based SPA Router
 */

const routes = {};
let notFoundHandler = null;

export function addRoute(path, handler) {
  routes[path] = handler;
}

export function setNotFound(handler) {
  notFoundHandler = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

function matchRoute(hash) {
  const fullPath = hash.replace('#', '') || '/';
  const path = fullPath.split('?')[0];

  // Exact match
  if (routes[path]) return { handler: routes[path], params: {} };

  // Parameterized routes — e.g. /ilan/:id
  for (const [pattern, handler] of Object.entries(routes)) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) continue;

    const params = {};
    let match = true;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
      } else if (patternParts[i] !== pathParts[i]) {
        match = false;
        break;
      }
    }

    if (match) return { handler, params };
  }

  return null;
}

async function handleRouteChange() {
  const hash = window.location.hash || '#/';
  const result = matchRoute(hash);

  const main = document.getElementById('main-content');
  if (!main) return;

  // Page exit
  main.classList.remove('page-enter');

  // Clear and render
  main.innerHTML = '';

  if (result) {
    await result.handler(main, result.params);
  } else if (notFoundHandler) {
    notFoundHandler(main);
  } else {
    main.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <h2 class="empty-state__title">Sayfa Bulunamadı</h2>
        <p class="empty-state__desc">Aradığınız sayfa mevcut değil.</p>
        <a href="#/" class="btn btn--primary">Ana Sayfaya Dön</a>
      </div>
    `;
  }

  // Page enter animation
  requestAnimationFrame(() => {
    main.classList.add('page-enter');
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('nav-link--active', href === hash || (hash === '#/' && href === '#/'));
  });
}

export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}
