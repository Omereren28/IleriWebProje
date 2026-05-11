/**
 * HomeOfEmlak — Application Entry Point
 */
import { addRoute, initRouter } from './router.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage } from './pages/homePage.js';
import { renderListingPage } from './pages/listingPage.js';
import { renderDetailPage } from './pages/detailPage.js';
import { renderCreateListingPage } from './pages/createListingPage.js';
import { renderFavoritesPage } from './pages/favoritesPage.js';
import { renderComparePage } from './pages/comparePage.js';
import { renderAboutPage } from './pages/aboutPage.js';
import { renderContactPage } from './pages/contactPage.js';
import { renderLoginPage } from './pages/loginPage.js';
import { renderRegisterPage } from './pages/registerPage.js';
import { initTheme } from './utils/storage.js';

function init() {
  // Initialize theme
  initTheme();

  // Render persistent components
  renderHeader();
  renderFooter();

  // Register routes
  addRoute('/', renderHomePage);
  addRoute('/ilanlar', renderListingPage);
  addRoute('/ilan/:id', renderDetailPage);
  addRoute('/ilan-ver', renderCreateListingPage);
  addRoute('/favorilerim', renderFavoritesPage);
  addRoute('/karsilastir', renderComparePage);
  addRoute('/hakkimizda', renderAboutPage);
  addRoute('/iletisim', renderContactPage);
  addRoute('/giris', renderLoginPage);
  addRoute('/uye-ol', renderRegisterPage);

  // Start router
  initRouter();

  console.log('🏠 HomeOfEmlak initialized');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
