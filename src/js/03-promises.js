import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formBlock = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

const onCreatePromises = e => {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget;

  let firstDelay = Number(delay.value);
  const promisesAmount = Number(amount.value);
  const delayStep = Number(step.value);

  // let firstDelay = Number(e.currentTarget.delay.value);
  // const promisesAmount = Number(e.currentTarget.amount.value);
  // const delayStep = Number(e.currentTarget.delay.value);

  for (let i = 1; i <= promisesAmount; i += 1) {
    createPromise(i, firstDelay);
    firstDelay += delayStep;
  }
};

formBlock.addEventListener('submit', onCreatePromises);