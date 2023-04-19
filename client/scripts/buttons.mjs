'use strict';

import { updatePet } from './db_controls.js';
import { saveButton, healthButton, moodButton, energyButton, hungerButton, hygieneButton, toiletButton, restartButton } from './global.mjs';
import { vPet } from './stats.mjs';

let healthListener;
let moodListener;
let energyListener;
let hungerListener;
let hygieneListener;
let toiletListener;
let saveListener;
export let restartListener;

// Removes event listeners
export function removeListeners() {
  removeEventListener(healthListener);
  removeEventListener(moodListener);
  removeEventListener(energyListener);
  removeEventListener(hungerListener);
  removeEventListener(hygieneListener);
  removeEventListener(toiletListener);
  removeEventListener(saveListener);
}

function healthIncrease() {
  // Causes the Health and Emotion to increase
  if (vPet.health > 80) {
    vPet.health += (1 * (100 - vPet.health));
    vPet.emotion += (0.5 * (100 - vPet.health));
  } else if (vPet.health > 0) {
    vPet.health += 20;
    vPet.emotion += 10;
  }
}

function moodIncrease() {
  // Causes the motion to increase
  if (vPet.health > 0 && vPet.emotion > 80) {
    vPet.emotion += (1 * (100 - vPet.emotion));
  } else if (vPet.health > 0) {
    vPet.emotion += 20;
  }
}

function energyIncrease() {
  // Causes the Energy and Emotion to increase, and decreases Health if Energy is at 100%
  if (vPet.health > 0 && vPet.energy >= 100) {
    vPet.health -= 5;
  } else if (vPet.health > 0 && vPet.energy > 80) {
    vPet.energy += (1 * (100 - vPet.energy));
    vPet.emotion += (0.5 * (100 - vPet.energy));
  } else if (vPet.health > 0) {
    vPet.energy += 20;
    vPet.emotion += 10;
  }
}

function hungerIncrease() {
  // Causes the Hunger and Emotion to increase, and decreases Health if Hunger is at 100%
  if (vPet.health > 0 && vPet.hunger >= 100) {
    vPet.health -= 5;
  } else if (vPet.health > 0 && vPet.hunger > 80) {
    vPet.hunger += (1 * (100 - vPet.hunger));
    vPet.emotion += (0.5 * (100 - vPet.hunger));
  } else if (vPet.health > 0) {
    vPet.hunger += 20;
    vPet.emotion += 10;
  }
}

function hygieneIncrease() {
  // Causes the Cleanliness and Emotion to increase, whilst decreasing the Energy, and decreases Health if Cleanliness is at 100%
  if (vPet.health > 0 && vPet.cleanliness >= 100) {
    vPet.health -= 5;
  } else if (vPet.health > 0 && vPet.cleanliness > 80) {
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
  // Causes the Emotion to increase, whilst decreasing the Latrine, Cleanliness, and Hunger
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

// Updates the pet with the pet ID within the pets DATABASE
function save() {
  updatePet(vPet);
}

// Refreshes the webpage, resetting everything
async function handleReload() {
  await location.reload({
    info: { animation: 'fade-in' },
    state: { infoPaneOpen: true },
  });
}

// Hides and displays some UI elements, and creates an event listener for a button, which calls a function when pressed
export function restart() {
  saveButton.classList.add('hide');
  restartButton.classList.remove('hide');
  restartButton.addEventListener('click', () => {
    handleReload();
  });
}

// Creates event listeners
export function addListeners() {
  healthListener = healthButton.addEventListener('click', healthIncrease);
  moodListener = moodButton.addEventListener('click', moodIncrease);
  energyListener = energyButton.addEventListener('click', energyIncrease);
  hungerListener = hungerButton.addEventListener('click', hungerIncrease);
  hygieneListener = hygieneButton.addEventListener('click', hygieneIncrease);
  toiletListener = toiletButton.addEventListener('click', useToilet);
  saveListener = saveButton.addEventListener('click', save);
}
