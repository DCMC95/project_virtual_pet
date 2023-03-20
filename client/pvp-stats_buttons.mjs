'use strict';

import { vPet } from './pvp-stats.mjs';

function healthIncrease() {
  if (vPet.health > 80) {
    vPet.health += (1 * (100 - vPet.health));
    vPet.emotion += (0.5 * (100 - vPet.health));
  } else if (vPet.health > 0) {
    vPet.health += 20;
    vPet.emotion += 10;
  }
}

function moodIncrease() {
  if (vPet.health > 0 && vPet.emotion > 80) {
    vPet.emotion += (1 * (100 - vPet.emotion));
  } else if (vPet.health > 0) {
    vPet.emotion += 20;
  }
}

function energyIncrease() {
  if (vPet.health > 0 && vPet.energy > 80) {
    vPet.energy += (1 * (100 - vPet.energy));
    vPet.emotion += (0.5 * (100 - vPet.energy));
  } else if (vPet.health > 0) {
    vPet.energy += 20;
    vPet.emotion += 10;
  }
}

function hungerIncrease() {
  if (vPet.health > 0 && vPet.hunger > 80) {
    vPet.hunger += (1 * (100 - vPet.hunger));
    vPet.emotion += (0.5 * (100 - vPet.hunger));
  } else if (vPet.health > 0) {
    vPet.hunger += 20;
    vPet.emotion += 10;
  }
}

function hygieneIncrease() {
  if (vPet.health > 0 && vPet.cleanliness > 80) {
    vPet.cleanliness += (1 * (100 - vPet.cleanliness));
    vPet.energy -= (0.5 * (100 - vPet.cleanliness));
    vPet.emotion += (0.5 * (100 - vPet.cleanliness));
  } else if (vPet.health > 0) {
    vPet.cleanliness += 20;
    vPet.energy -= 10;
    vPet.emotion += 10;
  }
}

function useToilet() {
  if (vPet.health > 0 && vPet.latrine < 32 && vPet.latrine > 0) {
    vPet.latrine -= (1 * (100 - vPet.cleanliness));
    vPet.cleanliness -= (0.3125 * (100 - vPet.cleanliness));
    vPet.hunger -= (0.625 * (100 - vPet.cleanliness));
    vPet.emotion += (0.3125 * (100 - vPet.cleanliness));
  } else if (vPet.health > 0 && vPet.latrine > 0) {
    vPet.latrine -= 32;
    vPet.cleanliness -= 10;
    vPet.hunger -= 20;
    vPet.emotion += 10;
  }
}

function enemies() {
  const enemy = document.querySelector('.enemy');
  enemy.classList.add('hide');
}

export function addListeners() {
  const healthbutton = document.querySelector('#healthbutton');
  const moodbutton = document.querySelector('#moodbutton');
  const energybutton = document.querySelector('#energybutton');
  const hungerbutton = document.querySelector('#hungerbutton');
  const hygienebutton = document.querySelector('#hygienebutton');
  const toiletbutton = document.querySelector('#toiletbutton');
  const enemy = document.querySelector('.enemy');
  healthbutton.addEventListener('click', healthIncrease);
  moodbutton.addEventListener('click', moodIncrease);
  energybutton.addEventListener('click', energyIncrease);
  hungerbutton.addEventListener('click', hungerIncrease);
  hygienebutton.addEventListener('click', hygieneIncrease);
  toiletbutton.addEventListener('click', useToilet);
  enemy.addEventListener('click', enemies);
}
