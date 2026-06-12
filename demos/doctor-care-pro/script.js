const ALL_SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'];
const BOOKED_SLOTS = ['10:00 AM', '11:30 AM', '5:00 PM'];
let selectedSlot = null;

const dateInput = document.getElementById('appt-date');
const slotsContainer = document.getElementById('time-slots');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
dateInput.value = today;

function renderSlots() {
  slotsContainer.innerHTML = '';
  selectedSlot = null;
  ALL_SLOTS.forEach((slot) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'time-slot' + (BOOKED_SLOTS.includes(slot) ? ' booked' : '');
    btn.textContent = slot;
    if (!BOOKED_SLOTS.includes(slot)) {
      btn.addEventListener('click', () => {
        slotsContainer.querySelectorAll('.time-slot').forEach((s) => s.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSlot = slot;
      });
    }
    slotsContainer.appendChild(btn);
  });
}

renderSlots();

document.getElementById('appointment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!selectedSlot) {
    showToast('Please select an available time slot.');
    return;
  }
  const name = document.getElementById('appt-name').value;
  const phone = document.getElementById('appt-phone').value;
  const date = document.getElementById('appt-date').value;
  showToast(`✅ Appointment confirmed for ${name} on ${date} at ${selectedSlot}!`);
  document.getElementById('stat-appointments').textContent = String(parseInt(document.getElementById('stat-appointments').textContent) + 1);
  document.getElementById('stat-available').textContent = String(Math.max(0, parseInt(document.getElementById('stat-available').textContent) - 1));
  e.target.reset();
  dateInput.value = today;
  renderSlots();
});

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  showToast(`✅ Patient ${name} registered successfully! ID: DCP-${Math.floor(1000 + Math.random() * 9000)}`);
  document.getElementById('stat-patients').textContent = String(parseInt(document.getElementById('stat-patients').textContent.replace(',', '')) + 1).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  e.target.reset();
});

function bookWhatsApp() {
  const name = document.getElementById('appt-name').value || 'Patient';
  const phone = document.getElementById('appt-phone').value || '';
  const date = document.getElementById('appt-date').value || today;
  const slot = selectedSlot || 'Any available slot';
  openWhatsApp(`Hello DoctorCare Pro, I want to book an appointment.\n\nName: ${name}\nMobile: ${phone}\nDate: ${date}\nTime: ${slot}`);
}

document.getElementById('wa-booking').addEventListener('click', bookWhatsApp);
document.getElementById('hero-wa').addEventListener('click', (e) => { e.preventDefault(); bookWhatsApp(); });
document.getElementById('float-wa').addEventListener('click', (e) => { e.preventDefault(); openWhatsApp('Hello DoctorCare Pro, I need an appointment with Dr. Rajesh Sharma.'); });
