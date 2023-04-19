import { enemy, cat, wall, castle, svg, enemies } from './global.mjs';
import { vPet } from './stats.mjs';

// Adds the different SVGs to there own class to display them
fetch('./svgs/cat.svg').then(r => r.text()).then(text => { cat.innerHTML = text; });
fetch('./svgs/enemy.svg').then(r => r.text()).then(text => { enemy.innerHTML = text; });
fetch('./svgs/wall.svg').then(r => r.text()).then(text => { wall.innerHTML = text; });
fetch('./svgs/castle.svg').then(r => r.text()).then(text => { castle.innerHTML = text; });

let enemyList = [];
let enemyPresent;
let detect;

function enemiesCreation() {
  // If there are no classes within the SVG element, it clears the enemy array
  if (enemyPresent !== true && vPet.health > 0) {
    enemyList = [];
  }

  // If a randomly generated number is less than the predetermined number and the pets health is 0, nothing happens
  // This creates a random interval for enemies to appear, whilst the pets health is above 0
  if (Math.random() >= 0.88 && vPet.health > 0) {
    const colours = ['white', 'red', 'green', 'blue', 'orange', 'purple'];
    if (vPet.health > 0) {
      // Creates a clone of the enemy svg
      const newEnemy = enemy.cloneNode(true);
      newEnemy.class = 'clone';
      // Randomly selects the color of the enemy svg and adds an animation to it, whilst setting its new postion
      const colour = Math.floor(Math.random() * (Math.floor(6)));
      newEnemy.classList.add(`${colours[colour]}LightDark`);
      newEnemy.classList.add('slider');
      newEnemy.classList.add('newEnemyPosition');
      enemies.appendChild(newEnemy);
      newEnemy.addEventListener('click', () => {
        // If there are more than 0 enemies and the pets energy is above 10, it removes an enemy and reduce the pets energy by 10
        if (enemyList.length > 0 && vPet.energy > 10) {
          newEnemy.remove();
          vPet.energy -= 10;
          vPet.emotion += 5;
          enemyList.splice(enemyList[enemyList.length] - 1, 1);
        }
      });
      setInterval(onCollision, 1000, newEnemy);
    }
  }
}

function onCollision(newEnemy) {
  // Sets a boolean to false, and adds a 'newEnemy' to the 'enemyList'
  enemyPresent = false;
  enemyList.push(newEnemy);
  enemyList.forEach((enemy) => {
    screenWidth();

    // Sets and updates each of the enemies X coordinate
    const enemyPosition = enemy.getBoundingClientRect().x;

    // For each enemy parsed the predetermined X coordinate, the pet takes 0.25 damage, and changes a boolean to true
    if (enemyPosition >= detect & vPet.health > 0) {
      vPet.health -= 0.05;
      enemyPresent = true;
    }
  });

  // Toggles the 'Warn' animation on the SVG, based in the conditions
  svg.classList.toggle('warn', enemyPresent === true && vPet.health > 0);
}

function screenWidth() {
  // Sets the walls X coordinate
  let wallPostion = wall.getBoundingClientRect().x;
  // Makes sure that the 'wallPosition' is a negative number
  if (wallPostion < 0) {
    wallPostion = wallPostion * -1;
  }

  // Sets the position of the detect, based on the size of the screen and which browser is used
  if (navigator.userAgent.includes('Firefox')) {
    if (window.innerWidth > 600) {
      detect = (0 - wallPostion) * -0.5;
    } else {
      detect = (0 - wallPostion) * 1.7;
    }
  } else {
    if (window.innerWidth > 600) {
      detect = (0 - wallPostion) * -0.57;
    } else {
      detect = wallPostion * 0.5;
    }
  }
}

export function svgMain() {
  setInterval(enemiesCreation, 400);
}
