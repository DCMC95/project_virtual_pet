'use strict';

import { deletePet } from './db_controls.js';
import { cleanliness, emotion, energy, health, hunger, latrine, nameInput, timerOut } from './global.mjs';
import { restart } from './buttons.mjs';

let loadTime;
let timeLived;
let death = false;
let timeInterval;
let moodInterval;
let hpInterval;
let feedInterval;
let restInterval;
let hygieneInterval;
let toiletInterval;

// Creates the pet object
export let vPet = {
  owner: '',
  name: '',
  type: '',
  health: 100,
  emotion: 100,
  energy: 100,
  hunger: 100,
  cleanliness: 100,
  latrine: 0,
  time: 0,
};

// Loads all of the stored stats of the chosen pet ID from the pets DATABASE
export function setVPet(data) {
  vPet = data;
  nameInput.value = data.name;
  health.value = data.health;
  emotion.value = data.emotion;
  hunger.value = data.hunger;
  energy.value = data.energy;
  cleanliness.value = data.cleanliness;
  latrine.value = data.latrine;
  loadTime = data.time;
}

function hp() {
  // Sets the pets health
  health.value = vPet.health;

  if (vPet.health >= 100) {
    // Sets the upper limit of health to 100
    vPet.health = 100;
  } else if (vPet.health <= 0) {
    // Sets the lower limit of health to 0, whilst calls 2 functions, and removing intervals
    vPet.health = 0;
    restart();
    deletePet(vPet);
    clearInterval(timeInterval);
    clearInterval(moodInterval);
    clearInterval(hpInterval);
    clearInterval(feedInterval);
    clearInterval(restInterval);
    clearInterval(hygieneInterval);
    clearInterval(toiletInterval);
  }
}

function mood() {
  // sets the pets mood
  emotion.value = vPet.emotion;

  if (vPet.emotion <= 0) {
    // Makes it so that if emotion is at 0, the health will decrease, whilst setting the lower limt of emotion to 0
    vPet.health -= 1;
    vPet.emotion = 0;
  } else if (vPet.emotion >= 100) {
    // Sets the upper limt of emotion to 100
    vPet.emotion = 100;
  }

  // The function below, causes emotion to decrease if certain requirements are met
  if (Number.isInteger(vPet.time / 2) && vPet.health > 0) {
    vPet.emotion--;
  }
}

function feed() {
  // Sets the pets hunger
  hunger.value = vPet.hunger;
  const catHead = document.querySelector('#catHead');

  if (vPet.hunger >= 100) {
    // Sets the upper limit of hunger to 100
    vPet.hunger = 100;
  } else if (vPet.hunger <= 0) {
    // sets the lower limit of hunger to 0, whilst decreasing health if hunger is at 0
    vPet.hunger = 0;
    vPet.health--;
  }

  // Removes classes
  function removeClasses() {
    catHead.classList.remove('fatCat');
    catHead.classList.remove('fatteningCat');
    catHead.classList.remove('normalCat');
    catHead.classList.remove('thinnigCat');
    catHead.classList.remove('thinCat');
  }

  // Changes the width of the pet based of of its hunger
  if (vPet.hunger > 80) {
    removeClasses();
    catHead.classList.add('fatCat');
  } else if (vPet.hunger > 60) {
    removeClasses();
    catHead.classList.add('fatteningCat');
  } else if (vPet.hunger > 40) {
    removeClasses();
    catHead.classList.add('normalCat');
  } else if (vPet.hunger > 20) {
    removeClasses();
    catHead.classList.add('thinnigCat');
  } else if (vPet.hunger >= 0) {
    removeClasses();
    catHead.classList.add('thinCat');
  }

  // Causes the hunger stat to decrease if certain requirements are met
  if (Number.isInteger(vPet.time / 0.6) && vPet.health > 0) {
    vPet.hunger--;
  }
}

function rest() {
  // Sets the pets energy
  energy.value = vPet.energy;

  if (vPet.energy < 100 && vPet.hunger > 0 && vPet.health > 0) {
    // Causes energy to increase if hunger is above 0, making hunger decrease at the same rate, until energy reaches 100
    vPet.hunger--;
    vPet.energy++;
  } else if (vPet.energy <= 0) {
    // Sets the lower limit of energy to 0
    vPet.energy = 0;
  } else if (vPet.energy >= 100) {
    // Sets the upper limit of energy to 100
    vPet.energy = 100;
  }

  // Causes the energy stat to decrease if certain requirements are met
  if (Number.isInteger(vPet.time / 3.6) && vPet.health > 0) {
    vPet.energy--;
  }
}

function hygiene() {
  // Sets the pets cleanliness
  cleanliness.value = vPet.cleanliness;

  if (vPet.cleanliness <= 0) {
    // Sets the lower limit of cleanliness to 0, whilst decreaseing health if cleanliness is at 0
    vPet.cleanliness = 0;
    vPet.health--;
  } else if (vPet.cleanliness >= 100) {
    // Sets the upper limit of cleanliness to 100
    vPet.cleanliness = 100;
  }

  // Causes the cleanliness stat to decrease if certain requirements are met
  if (Number.isInteger(vPet.time / 4) && vPet.health > 0) {
    vPet.cleanliness--;
  }
}

function toilet() {
  // Sets the pets latrine
  latrine.value = vPet.latrine;

  if (vPet.latrine <= 0) {
    // Sets the lower limit of latrine to 0
    vPet.latrine = 0;
  } else if (vPet.latrine >= 100) {
    // Sets the upper limit of latrine to 100, whilst decreasing health if latrine is at 100
    vPet.latrine = 100;
    vPet.health--;
  }

  // Causes the latrine stat to increase if certain requirements are met
  if (vPet.hunger > 0 && Number.isInteger(vPet.time / 1.5) && vPet.health > 0) {
    vPet.latrine++;
  }
}

function timer() {
  let now;
  let timeDiff;
  let seconds;
  let minutes;
  let hours;
  let days;
  let weeks;
  let years;

  if (vPet.health <= 0 && death === false) {
    // Causes a death message to appear if pet dies
    timerOut.textContent = `Your pet survived for: ${timerOut.textContent}`;
    death = true;
  } else if (death === false) {
    // Increases the timer to accurately display how long the pet has survived for
    now = new Date();
    timeDiff = now.getTime() - timeLived;
    seconds = Math.floor(timeDiff / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);
    weeks = Math.floor(days / 7);
    years = Math.floor(weeks / 52);
    // Formats the time according to the amountof time passed, by seconds, minutes, hours, days, weeks, and years
    timerOut.textContent = `${years > 0 ? years + ' yrs' : ''} ${weeks > 0 ? (weeks - (52 * years)) + ' wks' : ''} ${days > 0 ? (days - (7 * weeks)) + ' days' : ''} ${hours > 0 ? (hours - (24 * days)) + ' hrs' : ''} ${minutes > 0 ? (minutes - (60 * hours)) + ' mins' : ''} ${(seconds - (60 * minutes))} seconds`;

    // Sets the pets time
    vPet.time = seconds;
  }
}

export function statsMain() {
  // Sets timeLived to current date and time, according to when the pet was created
  timeLived = new Date();
  if (loadTime > 0) {
    timeLived -= loadTime * 1000;
  }

  // Creates intervals
  timeInterval = setInterval(timer, 1000);
  moodInterval = setInterval(mood, 1000);
  hpInterval = setInterval(hp, 1000);
  feedInterval = setInterval(feed, 1000);
  restInterval = setInterval(rest, 1000);
  hygieneInterval = setInterval(hygiene, 1000);
  toiletInterval = setInterval(toilet, 1000);
}
