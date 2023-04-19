import { statsTime, statsMeters, statsButtons, nameButton, nameInput, petName, out, petSelect, petChoice, petOwner, ownerButton, ownerInput, ownerError, petError, cat, loadButton, restartButton, saveButton } from './global.mjs';
import { setVPet, statsMain, vPet } from './stats.mjs';
import { addListeners } from './buttons.mjs';
import { svgMain } from './svg.mjs';
import { createNewPet, loadPet } from './db_controls.js';

window.addEventListener('load', main);

let pet;
let valid;
let colorInterval;

function validation() {
  // Checks if the data parsed in is 10-digits long and is a number(less than 10,000,000,000)
  // Pretty sure that this is more perfornance efficient than a try catch
  if (ownerInput.value.length !== 10) {
    valid = false;
  } else if (ownerInput.value < 10000000000) {
    valid = true;
  }
}

function handlePet() {
  // Hides and Displays some UI elements
  petOwner.classList.add('hide');
  petSelect.classList.remove('hide');
  petName.classList.remove('hide');
  loadButton.classList.remove('hide');

  // Sets the pet ID
  vPet.owner = ownerInput.value;

  nameButton.addEventListener('click', () => {
    // Checks if the pet already exist within the pets DATABASE, if it does, an error is displayed
    if (pet !== 0) {
      petError.textContent = 'ERROR: Pet ID already registered!';
      // Checks if a name is entered, and if a pet type is seleceted, if they are, a function is called
    } else if (nameInput.value !== '' && petChoice.selectedIndex !== 0) {
      events();
      // Checks if a name is entered, and if a pet type is seleceted, if they aren't, an error is displayed
    } else {
      petError.textContent = 'ERROR: Unselected pet or Invalid input!';
    }
  });

  nameInput.addEventListener('keyup', (e) => {
  // Checks if the ENTER key is pressed, and if the pet ID already exists within the pets DATABASE, if it does, then an error is displayed
    if (e.keyCode === 13 && pet !== 0) {
      petError.textContent = 'ERROR: Pet ID already registered!';
      // Checks if the ENTER key is pressed, if a name is entered, and if a pet type is seleceted, if they are, a function is called
    } else if (e.keyCode === 13 && nameInput.value !== '' && petChoice.selectedIndex !== 0) {
      events();
      // Checks if the ENTER key is pressed, if a name is entered, and if a pet type is seleceted, if they aren't, an error is displayed
    } else if (e.keyCode === 13) {
      petError.textContent = 'ERROR: Unselected pet or Invalid input!';
    }
  });
}

function events() {
  // Calls functions, hides and displays UI elements
  petsName();
  statsMain();
  addListeners();
  svgMain();
  createNewPet(vPet);
  clearInterval(colorInterval);
  loadButton.classList.add('hide');
  saveButton.classList.remove('hide');
}

function petsName() {
  // This sets the pets name and shifts the name to upper case, whilst hiding and displaying some UI elements
  vPet.name = nameInput.value.toUpperCase();
  out.classList.remove('hide');
  out.textContent = `Your pets name is: ${vPet.name}`;
  petSelect.classList.add('hide');
  petName.classList.add('hide');

  // Displays some UI elements
  statsTime.classList.remove('hide');
  statsMeters.classList.remove('hide');
  statsButtons.classList.remove('hide');
}

function petColor(data) {
  const catEars = document.querySelector('#catEars');
  const catHead = document.querySelector('#catHead');

  function removeClasses() {
    // Displays the pet SVG, and removes color tones from it
    cat.classList.remove('hide');
    catHead.classList.remove('redHead');
    catEars.classList.remove('redEars');
    catHead.classList.remove('blueHead');
    catEars.classList.remove('blueEars');
    catHead.classList.remove('greenHead');
    catEars.classList.remove('greenEars');
  }

  // Changes the color or hides the cat SVG, depending on what the number data is
  switch (data) {
    case 0:
      cat.classList.add('hide');
      break;
    case 1:
      removeClasses();
      vPet.type = 1;
      catHead.classList.add('redHead');
      catEars.classList.add('redEars');
      break;
    case 2:
      removeClasses();
      vPet.type = 2;
      catHead.classList.add('greenHead');
      catEars.classList.add('greenEars');
      break;
    case 3:
      removeClasses();
      vPet.type = 3;
      catHead.classList.add('blueHead');
      catEars.classList.add('blueEars');
      break;
  }
}

function loadPetStats() {
  // If the pet ID doesn't exist within the pets DATABASE, an error will be displayed
  if (pet === 0) {
    petError.textContent = "ERROR: Pet ID doesn't exist!";
    // If the pet ID does exist within the pets DATABASE, some UI elements will be hidden and displayed, whilst also calling functions
  } else {
    petOwner.classList.add('hide');
    petSelect.classList.remove('hide');
    petName.classList.remove('hide');
    loadButton.classList.remove('hide');

    petColor(pet.type);
    setVPet(pet);
    events();
  }
}

// Retrieves the chosen pet ID from the pets DATABASE, and adds an event listener to a button
async function setPetStats() {
  pet = await loadPet(vPet);
  loadButton.addEventListener('click', loadPetStats);
}

function main() {
  // Displays and Hides some UI elements
  petOwner.classList.remove('hide');
  cat.classList.add('hide');
  statsTime.classList.add('hide');
  statsMeters.classList.add('hide');
  statsButtons.classList.add('hide');
  petSelect.classList.add('hide');
  petName.classList.add('hide');
  restartButton.classList.add('hide');
  out.classList.add('hide');
  saveButton.classList.add('hide');
  loadButton.classList.add('hide');

  // Calls the petColor function every millisecond, whilst parsing in the option selected within a dropdown
  colorInterval = setInterval(() => {
    petColor(petChoice.selectedIndex);
  }, 1);

  ownerButton.addEventListener('click', () => {
  // Checks if a number is entered, and validates that number, else an error is displayed
    if (ownerInput.value !== '') {
      validation();
      if (valid === true) {
        handlePet();
        setPetStats();
      } else {
        ownerError.textContent = 'ERROR: Input invalid!';
      }
    } else {
      ownerError.textContent = 'ERROR: Input invalid!';
    }
  });

  ownerInput.addEventListener('keyup', (e) => {
  // Checks if the ENTER key is pressed, if a number is entered, and validates that number, else an error is displayed
    if (e.keyCode === 13 && ownerInput.value !== '') {
      validation();
      if (valid === true) {
        handlePet();
        setPetStats();
      } else {
        ownerError.textContent = 'ERROR: Input invalid!';
      }
    }
  });
}
