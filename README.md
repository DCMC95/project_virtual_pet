# VIRTUAL PET DEFENCE
## CONTENTS
1. [ABOUT](#ABOUT)
2. [DESCRIPTION](#DESCRIPTION)
3. [GAME CATEGORY](#GAME-CATEGORY)
4. [CHALLENGES](#CHALLENGES)
5. [FEATURES](#FEATURES)
6. [CURRENT FEATURES](#CURRENT-FEATURES)
7. [FUTURE FEATURES](#FUTURE-FEATURES)
8. [INSTALLATION](#INSTALLATION)
9. [HOW TO PLAY](#HOW-TO-PLAY)
10. [START INSTRUCTIONS](#START-INSTRUCTIONS)
11. [LOAD INSTRUCTIONS](#LOAD-INSTRUCTIONS)
12. [REFERENCES](#REFERENCES)

## ABOUT
### DESCRIPTION
This is the first-ever web app game that I have created through code. I was given the assignment of creating my own virtual pet during my time at University, studying Software Engineering.

When I completed the assignment, I decided to add an additional game to it, inspired by an old game I used to play in school:
[Defend Your Castle](https://www.crazygames.com/game/defend-your-castle).

In this game, you will find that, once you create your pet, you have to manage your pet's Health, Mood, Energy, Hunger, Hygiene, and Bladder, whilst also fighting off a horde of enemies before they get too close.

#### GAME CATEGORY
- Virtual Pet
- Macro Management
- Defence

### CHALLENGES
During this assignment, I encountered many challenges, two of which are listed below
1. I had a problem with the detection system, as the position where the enemy starts getting detected was in different places depending on the browser used, so I found out that you could code for different browsers by using:

`navigator.userAgent.includes('Firefox')`.

2. I had an issue with the restart function, and then I realized that, as that the restart function would do exactly the same as reloading the page would do, to make the restart function reload the page, using this code:

`await location.reload({
	info: { animation: 'fade-in' },
	state: { infoPaneOpen: true },
  });`

## FEATURES
### CURRENT FEATURES
* A web server that this web application is hosted on.

* A pet is displayed in the app.

* The user can name the pet.

* The pet has six core attributes that are listed below, which are also displayed on the screen, with each of them gradually decreasing or increasing, as well as impacting each other.

	1. Health - This gradually decreases, when the pet takes damage. When it reaches 0% the pet dies.

	2. Mood - This gradually decreases, signalling how happy the pet is. When it reaches 0% the Health starts to decrease.

	3. Energy - This gradually decreases over time, and decreases by 10% every time an Enemy is exterminated. This signals how energetic the pet is, when it reaches 0% the Hunger starts to decrease. But when Energy is below 100%, Hunger donates 1% to Energy every second, until Energy is at 100%.

	4. Hunger - This gradually decreases, signalling how full the pet is. When it reaches 0% the Health starts to decrease.

	5. Hygiene - This gradually decreases, signalling how clean the pet is. When it reaches 0% the health starts to decrease.

	6. Bladder - This gradually increases, signalling how full the pet's bladder is. When it reaches 100% the health starts to decrease.

* The user can interact with the pet to increase the value of these attributes, by pressing the buttons that are listed below.

	1. Heal - This increases Health and Mood in proportion to how much Health is missing. With the maximum amount being, a 20% increase in Health and a 10% increase in Mood.

	2. Euphoria - This increases Mood in proportion to how much Mood is missing. With the maximum amount being, a 20% increase in Mood.

	3. Energize - This increases Energy and Mood in proportion to how much Energy is missing. With the maximum amount being, a 20% increase in Energy and a 10% increase in Mood.

	4. Feed - This increases Hunger and Mood in proportion to how much Hunger is missing. With the maximum amount being, a 20% increase in Hunger and a 10% increase in Mood.

	5. Clean - This increases Hygiene and Mood and decreases Energy in proportion to how much Hygiene is missing. With the maximum amount being, a 20% increase in Hygiene and a 10% increase in Mood, with a minimum decrease of 10% in Energy.

	6. Use Toilet - This increases Mood and decreases Bladder, Hygiene, and Hunger in proportion to how full the Bladder is. With the maximum amount being, a 10% increase in Mood, with a minimum decrease of 32% in Bladder, 10% in Hygiene, and 20% in Hunger.

* The pet can die, due to Health being too low, Mood, Energy, Hunger, and Hygiene being too low for too long, or Bladder being too high for too long.

* A time of how long the pet has survived is displayed during the gameplay, and when the pet dies, the application displays how long the pet survived.

* The user can choose the colour of the pet from three options.

* Too much Energy, Hygiene, or Hunger decreases Health by 5%.

* When an Enemy is exterminated, the Mood increases by 5%.

* Pets exist on the server, and the app is only a means of interacting with them.

* Upon creation of the pet, the pet is added to a server database, and during the gameplay you can save your game, allowing you to reload your progress at any moment, even if you turn off your device or close your browser, you can load your progress, but when the pet dies, it is deleted from the server database.

* The pet's size changes depending on its Hunger.

* The user can own multiple pets, so long as they enter a unique number each time.

### FUTURE FEATURES
* The pet ages and has different requirements in each growth phase (e.g. baby sleeps more and eats less).

* The user can pick different types of pets.

* The user is the only one to be able to access their pets.

* The user can trade pets with friends.

* Historical user statistics (e.g. a total number of poops shovelled).

* Different types of pets and means to interact with the pet will be unlocked as you play.

* High scoreboard.

* More animations.

* Different backgrounds.

* Different Enemies and Enemy types.

## INSTALLATION
1. Click: [Project Virtual Pet](https://github.com/DCMC95/project_virtual_pet), or go to: https://github.com/DCMC95/project_virtual_pet
2. Download or import the project
3. Open with Visual Code
4. Open Terminal
5. Type `npm i` or `npm install`, to install all of the packages
6. Then type `npm start`, to start the server
7. Then click: [VIRTUAL PET DEFENCE](http://127.0.0.1:8080/), or go to: http://127.0.0.1:8080/
8. Enjoy the game!

## HOW TO PLAY
### START INSTRUCTIONS
1. Load the game
2. Enter a memorable 10-digit number for your Pets ID
3. Click 'CONFIRM'
4. Choose the colour of your pet
5. Enter the name of your pet
6. Click 'CONFIRM'
7. You can click 'SAVE' at any point during the game, whilst your pet is still alive
8. Enjoy!

### LOAD INSTRUCTIONS
1. Load the game
2. Enter the 10-digit number of the Pets ID, that you want to load
3. Click 'CONFIRM'
4. Then click 'LOAD'
5. Enjoy!

_NOTE: You can not load the game during the game, only before_

## REFERENCES
[MDN](https://developer.mozilla.org/en-US/)
