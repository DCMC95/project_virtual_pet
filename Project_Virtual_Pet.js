'use strict';

window.addEventListener('load', main);

let time = 100;
let feedTimer = 600;
let energyTimer = 3600;
let happiness = 100;
let health = 100;
let emotion = 100;
let hunger = 100;
let energy = 100;
let cleanliness = 100;

const vPet = {
    // This creates an object called pet, that the
    // user can name through the 'petsName' function.

    health: health,
    emotion: emotion,
    energy: energy,
    hunger: hunger,
    cleanliness: cleanliness,

    printIntroduction: function() {
        const out = document.querySelector("#out");
        out.textContent = `Your pets name is: ${this.name}`;
    }
};
const pet = Object.create(vPet);

function petsName () {
    // This function asks the user what they want
    // to name their pet, and shifts the name to
    // uppercase.
    
    const nameinput = document.querySelector("#nameinput");
    pet.name = nameinput.value.toLocaleUpperCase();
    pet.printIntroduction();
}

function mood() {
    if (happiness == -100) {
        console.log(`${pet.name} DESPISES YOU!!!`);
    } else if (happiness <= -75) {
        console.log(`${pet.name} HATES YOU!`);
    } else if (happiness <= -50) {
        console.log(`${pet.name} greatly dislikes you!`);
    } else if (happiness <= -25) {
        console.log(`${pet.name} dislikes you`);
    } else if (happiness <= 0) {
        console.log(`${pet.name} tolerates you`);
    } else if (happiness <= 25) {
        console.log(`${pet.name} likes you`);
    } else if (happiness <= 50) {
        console.log(`${pet.name} really likes`)
    } else if (happiness <= 75) {
        console.log(`${pet.name} LOVES YOU!!!`);
    } else if (happiness <= 100) {
        console.log(`${pet.name} ABSOLUTELY LOVES YOU!!!`);
    }
}

function hp() {
    // This function displays the status of the pets
    // health according to the percentage of its health.

    

    if (health <= 0) {
        console.log(`${(pet.name).toUpperCase()} IS DEAD!!!`);
    } else if (health <= 25) {
        console.log(`${(pet.name).toUpperCase()} NEEDS HEALING!`);
    } else if (health <= 50) {
        console.log(`${pet.name} should be healed!`);
    } else if (health <= 75) {
        console.log(`${pet.name} could use some healing`);
    } else if (health <= 100) {
        console.log(`${(pet.name).toUpperCase()} is fully healed!`);
    }

    //console.log(health);
}

function feed() {
    // This function sets a time interval inbetween feeding
    // that will gradually decrease, which will also decrease
    // the percentage of the pets hunger, changing the status
    // of its hunger within a function called 'hungerTextStatus'.
    //
    // If the pets health is below 100% it will cause the hunger
    // to decrease, thus increasing its health.
    //
    // The commented out section would increase the pets hunger
    // by 20 when the user presses 'f' and would call a function
    // to increase the timer.

    //console.log(feedTimer);
    const hungerout = document.querySelector("#hungerout");
    const hungerstatus = document.querySelector("#hungerstatus");
    if (feedTimer > 0) {
        setTimeout(feed, 1000);
    }

    hungerout.textContent = hunger;

    hungerTextStatus();
    function hungerTextStatus() {
        if (hunger <= 0) {
            hungerstatus.textContent = 'IM STARVING TO DEATH!!!';
            health--;
        } else if (hunger <= 12.5) {
            hungerstatus.textContent = 'IM STARVING!';
        } else if (hunger <= 25) {
            hungerstatus.textContent = 'Im very hungry!';
        } else if (hunger <= 37.5) {
            hungerstatus.textContent = 'Im pretty hungry';
        } else if (hunger <= 50) {
            hungerstatus.textContent = 'Im satisfied';
        } else if (hunger <= 62.5) {
            hungerstatus.textContent = 'Im pretty full';
        } else if (hunger <= 75) {
            hungerstatus.textContent = 'Im very full!';
        } else if (hunger <= 87.5) {
            hungerstatus.textContent = 'IM STUFFED!';
        } else if (hunger <= 100) {
            hungerstatus.textContent = "I CAN'T EAT ANY MORE!!!";
        }
    }

    if (health < 100 && hunger > 0) {
        hunger--;
        health++;
    }

    if (Number.isInteger(feedTimer / 6)) {
        hunger--;
    }
    feedTimer--;

    //console.log(hunger);

//    document.onkeydown = function(event) {
//        if (event.keyCode == f && hunger < 100) {
//            hunger = hunger + 20;
//            setTimeout(increaseTime, 1000);
//            if (hunger == 100) {
//                feedTimer = 100;
//            }
//        }
//    }
}

function rest() {
    // This function sets a time interval inbetween rests
    // that will gradually decrease, which will also decrease
    // the percentage of the pets energy, changing the status
    // of its energy within a function called 'energyTextStatus'.
    //
    // If the pets energy is below 100% it will cause the hunger
    // to decrease, thus increasing its energy.
    //
    // The commented out section would increase the pets energy
    // by 20 when the user presses 'e' and would call a function
    // to increase the timer.

    //console.log(energyTimer);
    const energyout = document.querySelector("#energyout");
    const energystatus = document.querySelector("#energystatus");
    if (energyTimer > 0) {
        setTimeout(rest, 1000);
    }

    energyout.textContent = energy;

    energyTextStatus();
    function energyTextStatus() {
        if (energy <= 0) {
            energystatus.textContent = 'ZOMBIE!!!';
            hunger--;
        } else if (energy <= 7.25) {
            energystatus.textContent = 'ENERGY EMERGENCY!!';
        } else if (energy <= 12.5) {
            energystatus.textContent = 'Struggling to stay awake!';
        } else if (energy <= 25) {
            energystatus.textContent = 'Too tired';
        } else if (energy <= 50) {
            energystatus.textContent = 'Drowsy';
        } else if (energy <= 100) {
            energystatus.textContent = 'FULL OF ENERGY!';
        }
    }

    if (energy < 100 && hunger > 0) {
        hunger--;
        energy++;
    }

    if (Number.isInteger(energyTimer / 36) && hunger > 0) {
        energy--;
    }
    energyTimer--;

    //console.log(energy);

//    document.onkeydown = function(event) {
//        if (event.keyCode == e && energy < 100) {
//            energy = energy + 20;
//            setTimeout(increaseTime, 1000);
//            if (energy == 100) {
//                energyTimer = 100;
//            }
//        }
//    }
}

function hygiene() {}

function timer() {
    // This function starts a timer, and would display a string
    // when the timer reaches 0.

    const timerout = document.querySelector("#timerout")
    timerout.textContent = time;
    time--;
    if (time > 0) {
        setTimeout(timer, 1000);
    } else {
        setTimeout(() => {timerout.textContent = 'TIMER HAS ENDED!'}, 1000);
    }
}

function increaseTime(val = 70) {
// This function increases the timer in the function 'timer'.

    time = val;
}

// const namebutton = document.querySelector('#namebutton');
// namebutton.addEventListener('onclick', petsName);

//main();
function main() {
    const namebutton = document.querySelector('#namebutton');
    namebutton.addEventListener('click', petsName);

    // timer();
    // hp();
    // feed();
    // rest();

    setTimeout(timer, 1000);
    //setTimeout(mood, 1000);
    //setTimeout(hp, 1000);
    setTimeout(feed, 1000);
    setTimeout(rest, 1000);
    //setTimeout(hygiene, 1000);
}