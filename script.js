const WHATSAPP_NUMBER = '916263478403';
const WHATSAPP_MSG = 'Hello MBD Solutions, I need a free demo.';

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 80 ? '0 4px 24px rgba(0, 0, 0, 0.3)' : 'none';
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.querySelector('.counter')) {
          animateCounters(entry.target);
        }
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

function animateCounters(container) {
  container.querySelectorAll('.counter').forEach((counter) => {
    if (counter.dataset.animated) return;
    counter.dataset.animated = 'true';
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    }

    requestAnimationFrame(update);
  });
}

const leadForm = document.getElementById('lead-form');

leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(leadForm);
  const name = data.get('name');
  const mobile = data.get('mobile');
  const email = data.get('email') || 'Not provided';
  const businessType = data.get('business-type');
  const requirement = data.get('requirement');
  const budget = data.get('budget') || 'Not specified';

  const message = [
    'Hello MBD Solutions, I need a free consultation.',
    '',
    `Name: ${name}`,
    `Mobile: ${mobile}`,
    `Email: ${email}`,
    `Business Type: ${businessType}`,
    `Requirement: ${requirement}`,
    `Budget: ${budget}`,
  ].join('\n');

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
  leadForm.reset();
});

const leadPopup = document.getElementById('lead-popup');
const popupClose = document.getElementById('popup-close');
const popupDismiss = document.getElementById('popup-dismiss');
const popupOverlay = document.getElementById('popup-overlay');
const popupCta = document.getElementById('popup-cta');

function closePopup() {
  leadPopup.hidden = true;
  sessionStorage.setItem('mbd-popup-dismissed', '1');
}

function showPopup() {
  if (sessionStorage.getItem('mbd-popup-dismissed')) return;
  leadPopup.hidden = false;
}

setTimeout(showPopup, 10000);

popupClose.addEventListener('click', closePopup);
popupDismiss.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);

popupCta.addEventListener('click', () => {
  closePopup();
});

document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item').forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});
