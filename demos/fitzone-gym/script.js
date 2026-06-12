document.querySelectorAll('.select-plan').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.getElementById('mem-plan').value = btn.dataset.plan;
    showToast(`Selected: ${btn.dataset.plan}`);
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  });
});

document.getElementById('calc-bmi').addEventListener('click', () => {
  const weight = parseFloat(document.getElementById('bmi-weight').value);
  const height = parseFloat(document.getElementById('bmi-height').value) / 100;
  if (!weight || !height) {
    showToast('Please enter valid weight and height.');
    return;
  }
  const bmi = (weight / (height * height)).toFixed(1);
  const result = document.getElementById('bmi-result');
  const category = document.getElementById('bmi-category');
  const advice = document.getElementById('bmi-advice');
  document.getElementById('bmi-value').textContent = bmi;

  if (bmi < 18.5) {
    category.textContent = 'Underweight';
    advice.textContent = 'Consider our Mass Builder diet plan and strength training program.';
  } else if (bmi < 25) {
    category.textContent = 'Normal Weight';
    advice.textContent = 'Great! Maintain with our Balanced Life plan and regular workouts.';
  } else if (bmi < 30) {
    category.textContent = 'Overweight';
    advice.textContent = 'Try our Lean Cut plan with cardio-focused workout program.';
  } else {
    category.textContent = 'Obese';
    advice.textContent = 'We recommend Premium plan with personal trainer for guided weight loss.';
  }
  result.classList.add('show');
});

let checkedIn = false;
let checkInTime = null;
const log = document.getElementById('attendance-log');

document.getElementById('check-in').addEventListener('click', () => {
  if (checkedIn) return;
  checkedIn = true;
  checkInTime = new Date();
  document.getElementById('attendance-status-text').innerHTML = 'Status: <strong style="color: var(--accent-light);">Checked In</strong>';
  document.getElementById('attendance-icon').textContent = '✅';
  document.getElementById('check-in').disabled = true;
  document.getElementById('check-out').disabled = false;
  if (log.querySelector('li')?.textContent === 'No attendance records yet.') log.innerHTML = '';
  const entry = document.createElement('li');
  entry.textContent = `✅ Check In — ${checkInTime.toLocaleTimeString()}`;
  log.prepend(entry);
  showToast('Checked in successfully! 💪');
});

document.getElementById('check-out').addEventListener('click', () => {
  if (!checkedIn) return;
  const checkOutTime = new Date();
  const duration = Math.round((checkOutTime - checkInTime) / 60000);
  checkedIn = false;
  document.getElementById('attendance-status-text').innerHTML = 'Status: <strong>Not Checked In</strong>';
  document.getElementById('attendance-icon').textContent = '⏸️';
  document.getElementById('check-in').disabled = false;
  document.getElementById('check-out').disabled = true;
  const entry = document.createElement('li');
  entry.textContent = `🏁 Check Out — ${checkOutTime.toLocaleTimeString()} (${duration} min)`;
  log.prepend(entry);
  showToast(`Workout complete! Duration: ${duration} minutes.`);
});

document.getElementById('membership-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('mem-name').value;
  const plan = document.getElementById('mem-plan').value;
  showToast(`🎉 Welcome to FitZone, ${name}! Plan: ${plan}. Member ID: FZ-${Math.floor(1000 + Math.random() * 9000)}`);
  e.target.reset();
  document.getElementById('mem-plan').value = 'Premium - ₹1999/month';
});

function joinWhatsApp() {
  const name = document.getElementById('mem-name').value || 'Member';
  const phone = document.getElementById('mem-phone').value || '';
  const plan = document.getElementById('mem-plan').value || 'Premium - ₹1999/month';
  openWhatsApp(`Hello FitZone Gym, I want to join!\n\nName: ${name}\nMobile: ${phone}\nPlan: ${plan}`);
}

document.getElementById('wa-join').addEventListener('click', joinWhatsApp);
document.getElementById('hero-wa').addEventListener('click', (e) => { e.preventDefault(); joinWhatsApp(); });
document.getElementById('float-wa').addEventListener('click', (e) => { e.preventDefault(); openWhatsApp('Hello FitZone Gym, I want to join and start my fitness journey!'); });
