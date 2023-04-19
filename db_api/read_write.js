import fs from 'fs/promises';

// Reads a JSON file, then parses it out of the function
export async function read() {
  const petsJson = await fs.readFile('./database/pets.json', 'utf-8');
  return JSON.parse(petsJson);
}

// Writes a JSON file to the pets DATABASE
export async function write(petsObject) {
  const petsJson = JSON.stringify(petsObject);
  await fs.writeFile('./database/pets.json', petsJson, 'utf-8');
}
