'use strict';

let timeLived;
let death = false;

export let vPet = {
  health: 100,
  emotion: 100,
  energy: 100,
  hunger: 100,
  cleanliness: 100,
  latrine: 0,
  time: 0,
};

function status(selector, value) {
  const elem = document.querySelector(selector);
  elem.value = value;
}

function hp() {
  status('#healthstatus', vPet.health);

  if (vPet.health >= 100) {
    vPet.health = 100;
  } else if (vPet.health <= 0) {
    vPet.health = 0;
  }
}

function mood() {
  status('#moodstatus', vPet.emotion);

  if (vPet.emotion <= 0) {
    vPet.health -= 1;
    vPet.emotion = 0;
  } else if (vPet.emotion >= 100) {
    vPet.emotion = 100;
  }

  if (Number.isInteger(vPet.time / 2) && vPet.health > 0) {
    vPet.emotion--;
  }
}

function feed() {
  status('#hungerstatus', vPet.hunger);

  if (vPet.health < 100 && vPet.hunger > 0 && vPet.health > 0) {
    vPet.hunger--;
  } else if (vPet.hunger >= 100) {
    vPet.hunger = 100;
  } else if (vPet.hunger <= 0) {
    vPet.hunger = 0;
    vPet.health--;
  }

  if (Number.isInteger(vPet.time / 0.6) && vPet.health > 0) {
    vPet.hunger--;
  }
}

function rest() {
  status('#energystatus', vPet.energy);

  if (vPet.energy < 100 && vPet.hunger > 0 && vPet.health > 0) {
    vPet.hunger--;
    vPet.energy++;
  } else if (vPet.cleanliness <= 0) {
    vPet.cleanliness = 0;
  } else if (vPet.cleanliness >= 100) {
    vPet.cleanliness = 100;
  }

  if (Number.isInteger(vPet.time / 3.6) && vPet.health > 0) {
    vPet.energy--;
  }
}

function hygiene() {
  status('#hygienestatus', vPet.cleanliness);

  if (vPet.cleanliness <= 0) {
    vPet.cleanliness = 0;
    vPet.health--;
  } else if (vPet.cleanliness >= 100) {
    vPet.cleanliness = 100;
  }

  if (Number.isInteger(vPet.time / 4) && vPet.health > 0) {
    vPet.cleanliness--;
  }
}

function toilet() {
  status('#toiletstatus', vPet.latrine);

  if (vPet.latrine <= 0) {
    vPet.latrine = 0;
  } else if (vPet.latrine >= 100) {
    vPet.latrine = 100;
    vPet.health--;
  }

  if (vPet.hunger > 0 && Number.isInteger(vPet.time / 1.5) && vPet.health > 0) {
    vPet.latrine++;
  }
}

function timer() {
  const timerout = document.querySelector('#timerout');

  let seconds;
  let minutes;
  let hours;
  let days;
  let weeks;
  let years;

  if (vPet.health <= 0 && death === false) {
    timerout.textContent = `Your pet survived for: ${timerout.textContent}`;
    death = true;
  } else if (death === false) {
    const now = new Date();
    const timeDiff = now.getTime() - timeLived.getTime();
    seconds = Math.floor(timeDiff / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);
    weeks = Math.floor(days / 7);
    years = Math.floor(weeks / 365);
    timerout.textContent = `${years > 0 ? years + ' yrs' : ''} ${weeks > 0 ? (weeks - (52 * years)) + ' wks' : ''} ${days > 0 ? (days - (7 * weeks)) + ' days' : ''} ${hours > 0 ? (hours - (24 * days)) + ' hrs' : ''} ${minutes > 0 ? (minutes - (60 * hours)) + ' mins' : ''} ${(seconds - (60 * minutes))} seconds`;
    vPet.time = seconds;
  }
}

export function save() {
  localStorage.setItem('pet', JSON.stringify(vPet));
  console.log(localStorage);
}

export function load() {
  vPet = JSON.parse(localStorage.pet);
  console.log(localStorage);
}

export function main() {
  timeLived = new Date();

  setInterval(timer, 1000);
  setInterval(mood, 1000);
  setInterval(hp, 1000);
  setInterval(feed, 1000);
  setInterval(rest, 1000);
  setInterval(hygiene, 1000);
  setInterval(toilet, 1000);
}
