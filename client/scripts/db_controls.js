export async function createNewPet(vPet) {
  // Creates a new pet with the chosen pet ID for the pets DATABASE
  const result = await fetch('http://127.0.0.1:8080/pets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Sets what attributes to fill in
    body: JSON.stringify({
      owner: vPet.owner,
      name: vPet.name,
      type: vPet.type,
    }),
  });
  return await result.json();
}

export async function updatePet(vPet) {
  // Gets the pet with the current pet ID to be updated for the pets DATABASE
  const result = await fetch(`http://127.0.0.1:8080/pets/${vPet.owner}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    // Sets the attributes to update
    body: JSON.stringify({
      health: vPet.health,
      emotion: vPet.emotion,
      energy: vPet.energy,
      hunger: vPet.hunger,
      cleanliness: vPet.cleanliness,
      latrine: vPet.latrine,
      time: vPet.time,
    }),
  });
  return await result.json();
}

export async function loadPet(vPet) {
  // Loads the pet with the chosen pet ID from the pets DATABASE
  const result = await fetch(`http://127.0.0.1:8080/pets/${vPet.owner}`);
  return await result.json();
}

export async function deletePet(vPet) {
  // Deletes the pet with current pet ID from the pets DATABASE
  const result = await fetch(`http://127.0.0.1:8080/pets/${vPet.owner}`, {
    method: 'DELETE',
  });
  return await result.json();
}
