import { main as statsmain, vPet } from './pvp-stats.mjs';
import { addListeners } from './pvp-stats_buttons.mjs';
import { createParticle } from './particles.mjs';

const screen = {
  x: window.innerWidth - 20,
  y: window.innerHeight - 15,
};

window.addEventListener('load', main);

function petsName() {
  const statstime = document.querySelector('.statstime');
  const statsmeters = document.querySelector('.statsmeters');
  const statsbuttons = document.querySelector('.statsbuttons');
  const petname = document.querySelector('.petname');
  const nameinput = document.querySelector('#nameinput');
  const out = document.querySelector('#out');

  vPet.name = nameinput.value.toUpperCase();
  out.textContent = `Your pets name is: ${vPet.name}`;
  petname.classList.add('hide');

  statstime.classList.remove('hide');
  statsmeters.classList.remove('hide');
  statsbuttons.classList.remove('hide');
}

function main() {
  const body = document.body;
  setInterval(createParticle, 50, 5000, screen, body);

  // const statstime = document.querySelector('.statstime');
  // const statsmeters = document.querySelector('.statsmeters');
  // const statsbuttons = document.querySelector('.statsbuttons');
  // statstime.classList.add('hide');
  // statsmeters.classList.add('hide');
  // statsbuttons.classList.add('hide');

  const namebutton = document.querySelector('#namebutton');
  namebutton.addEventListener('click', petsName);
  namebutton.addEventListener('click', statsmain);
  namebutton.addEventListener('click', addListeners);
}
