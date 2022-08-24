import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
  dateTimePIcker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysCounter: document.querySelector('span[data-days]'),
  hoursCounter: document.querySelector('span[data-hours]'),
  minutesCounter: document.querySelector('span[data-minutes]'),
  secondsCounter: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;
let timer = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      return Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
  },
};

const fp = flatpickr(refs.dateTimePIcker, options);

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.dateTimePIcker.disabled = true;

  timer = setInterval(onTimerStart, 1000);
});

function onTimerStart() {
  let deadlineTime = fp.selectedDates[0] - Date.now();
  const { days, hours, minutes, seconds } = convertMs(deadlineTime);

  refs.daysCounter.textContent = addLeadingZero(days);
  refs.hoursCounter.textContent = addLeadingZero(hours);
  refs.minutesCounter.textContent = addLeadingZero(minutes);
  refs.secondsCounter.textContent = addLeadingZero(seconds);

  if (deadlineTime < 1000) {
    Notify.success('Time is Up');
    clearInterval(timer);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}