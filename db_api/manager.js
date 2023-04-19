import { read, write } from "./read_write.js";

const petDb = await read();

export function create(petsObject) {
  // Checks if the pet ID exists
  if (petsObject.owner in petDb) {
    return {};
  }

  // Sets the required attributes, to be written to the DATABASE
  const newPet = {
    owner: petsObject.owner,
    name: petsObject.name,
    type: petsObject.type,
    health: 100,
    emotion: 100,
    energy: 100,
    hunger: 100,
    cleanliness: 100,
    latrine: 0,
    time: 0,
  };

  // Creates a new pet within the DATABASE with the pet ID
  petDb[newPet.owner] = newPet;
  write(petDb);

  return newPet;
}

// Updates the pet with the chosen pet ID
export function update(ownerId, petsObject) {
    const pet = petDb[ownerId];
    const updatePet = {
        ...pet,
        ...petsObject,
    }

    petDb[updatePet.owner] = updatePet;
    write(petDb);
  
    return updatePet;
}

// Deletes the pet with the current pet ID from the DATABASE
export function remove(ownerId) {
  const deletedPet = petDb[ownerId];
  delete petDb[ownerId];

  write(petDb)
  return deletedPet;
}

// Loads the pet with the chosen pet ID from the pets DATABASE
export function load(ownerId) {
  const pet = petDb[ownerId];

  if (!pet) {
    return 0;
  } else {
    return pet;
  }
}
