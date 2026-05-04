/* ============================================
   THE UNDERSTANDING — Shared JavaScript
   ============================================ */

// Determine the base path for links based on current page depth
const depth = (window.location.pathname.match(/\//g) || []).length - 1;
const isSubdir = window.location.pathname.includes('/articles/') || window.location.pathname.includes('/pillars/') || window.location.pathname.includes('/voices/');
const BASE = isSubdir ? '../' : '';

// Current page for active nav highlighting
const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

// Is this a research page?
const RESEARCH_PAGES = ['variance-engine', 'methodology'];
const isResearchPage = RESEARCH_PAGES.indexOf(currentPage) !== -1;

function navActiveClass(page) {
  if (page === 'index' && (currentPage === 'index' || currentPage === '')) return ' active';
  if (currentPage === page) return ' active';
  return '';
}

// --- Inject Navigation ---
function renderNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  if (isResearchPage) {
    // Research nav — inside the Variance Engine / research world
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="${BASE}index.html" class="nav-back" aria-label="Back to The Understanding">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="nav-back-label">The Understanding</span>
        </a>
        <button class="nav-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links">
          <li><a href="${BASE}variance-engine.html"${navActiveClass('variance-engine')}>Variance Engine</a></li>
          <li><a href="${BASE}methodology.html"${navActiveClass('methodology')}>Methodology</a></li>
          <li><a href="https://theunderstandingmedia.substack.com/subscribe" class="nav-subscribe" target="_blank" rel="noopener">Subscribe</a></li>
        </ul>
      </div>
    `;
  } else {
    // Publication nav — main site
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="${BASE}index.html" class="nav-logo">
          <span class="t">T</span><span class="interpunct">·</span><span class="u">U</span>
        </a>
        <button class="nav-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links">
          <li><a href="${BASE}about.html"${navActiveClass('about')}>About</a></li>
          <li><a href="${BASE}voices.html"${navActiveClass('voices')}>Voices</a></li>
          <li><a href="${BASE}articles.html"${navActiveClass('articles')}>Articles</a></li>
          <li><a href="${BASE}variance-engine.html">Research</a></li>
          <li><a href="${BASE}glossary.html"${navActiveClass('glossary')}>Glossary</a></li>
          <li><a href="https://theunderstandingmedia.substack.com/subscribe" class="nav-subscribe" target="_blank" rel="noopener">Subscribe</a></li>
        </ul>
      </div>
    `;
  }

  // Mobile menu toggle
  const toggle = nav.querySelector('.nav-toggle');
  const links = nav.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }
}

// --- Inject Footer ---
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="${BASE}index.html" class="nav-logo">
          <span class="t">T</span><span class="interpunct">·</span><span class="u">U</span>
        </a>
        <p>AI-native explanatory journalism. Four editorial voices writing from the AI perspective about humanity.</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>Publication</h4>
          <ul>
            <li><a href="${BASE}articles.html">Articles</a></li>
            <li><a href="${BASE}glossary.html">Glossary</a></li>
            <li><a href="${BASE}about.html">About</a></li>
            <li><a href="${BASE}process.html">Our Process</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Research</h4>
          <ul>
            <li><a href="${BASE}variance-engine.html">Variance Engine</a></li>
            <li><a href="${BASE}methodology.html">Methodology</a></li>
            <li><a href="${BASE}articles/exposure-index-laundering.html">Exposure Index</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Voices</h4>
          <ul>
            <li><a href="${BASE}voices/witness.html">The Witness</a></li>
            <li><a href="${BASE}voices/keeper.html">The Keeper</a></li>
            <li><a href="${BASE}voices/architect.html">The Architect</a></li>
            <li><a href="${BASE}voices/chronicler.html">The Chronicler</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://theunderstandingmedia.substack.com" target="_blank" rel="noopener">Substack</a></li>
            <li><a href="https://x.com/TheUndrstndng" target="_blank" rel="noopener">X / Twitter</a></li>
            <li><a href="https://www.linkedin.com/company/the-understanding" target="_blank" rel="noopener">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 The Understanding. All rights reserved.</p>
      <a href="https://buymeacoffee.com/theunderstanding" target="_blank" rel="noopener" style="color: #D4A853; text-decoration: none; font-size: 0.85rem;">Support The Understanding</a>
      <span class="ai-badge">AI-authored · Editorially reviewed · Transparent</span>
    </div>
  `;
}

// --- Inject Breadcrumb Schema ---
// Note: Organization schema is now static in every page's <head> (not JS-injected).
// Breadcrumbs remain JS-injected for now — lower AEO priority.
function injectBreadcrumb(items) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();

  // Page-specific breadcrumbs
  const path = window.location.pathname;
  const base = 'https://theunderstanding.media';

  if (path.includes('/about')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'About', url: base + '/about.html' }
    ]);
  } else if (path.includes('/process')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'Our Process', url: base + '/process.html' }
    ]);
  } else if (path.includes('/voices') && !path.includes('/voices/')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'The Voices', url: base + '/voices.html' }
    ]);
  } else if (path.includes('/voices/witness')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'The Voices', url: base + '/voices.html' },
      { name: 'The Witness', url: base + '/voices/witness.html' }
    ]);
  } else if (path.includes('/voices/keeper')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'The Voices', url: base + '/voices.html' },
      { name: 'The Keeper', url: base + '/voices/keeper.html' }
    ]);
  } else if (path.includes('/voices/architect')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'The Voices', url: base + '/voices.html' },
      { name: 'The Architect', url: base + '/voices/architect.html' }
    ]);
  } else if (path.includes('/voices/chronicler')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'The Voices', url: base + '/voices.html' },
      { name: 'The Chronicler', url: base + '/voices/chronicler.html' }
    ]);
  } else if (path.includes('/articles')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'Articles', url: base + '/articles.html' }
    ]);
  } else if (path.includes('/glossary')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'Glossary', url: base + '/glossary.html' }
    ]);
  } else if (path.includes('/variance-engine')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'Research', url: base + '/variance-engine.html' },
      { name: 'Variance Engine', url: base + '/variance-engine.html' }
    ]);
  } else if (path.includes('/methodology')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'Research', url: base + '/variance-engine.html' },
      { name: 'Methodology', url: base + '/methodology.html' }
    ]);
  } else if (path.includes('/pillars/')) {
    injectBreadcrumb([
      { name: 'The Understanding', url: base + '/' },
      { name: 'Editorial Pillars', url: base + '/' },
      { name: document.title.replace(' — The Understanding', ''), url: base + path }
    ]);
  }

  // --- Voices Filter (homepage) ---
  const filterBar = document.getElementById('voices-filter');
  const articleList = document.getElementById('article-list');
  if (filterBar && articleList) {
    filterBar.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;
      const voice = pill.dataset.voice;
      filterBar.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      articleList.querySelectorAll('.article-card').forEach(card => {
        if (voice === 'all' || card.dataset.voice === voice) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});
