/* Shared demo utilities */
function initDemoNav() {
  const toggle = document.querySelector('.demo-nav-toggle');
  const links = document.querySelector('.demo-nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function showToast(message, duration = 3500) {
  let toast = document.getElementById('demo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demo-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/916263478403?text=${encoded}`, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  initDemoNav();
  initReveal();
});
