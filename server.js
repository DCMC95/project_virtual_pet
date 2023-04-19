import express from 'express';
import { create, update, load, remove } from './db_api/manager.js';


const app = express();
app.use(express.static('client'));
app.use(express.json());

// This parses the pets DATABASE in to an IMPORTED function, allowing for a new pet with a new id to be CREATED within the pets DATABASE
function createPet(req, res) {
  const newPet = create(req.body);
  res.json(newPet);
}

// This parses the pets DATABASE and the pet ID in to a function, allowing for the pet with the ID to be UPDATED within the pets DATABASE
function updatePet(req, res) {
  const pet = update(req.params.id, req.body);
  res.json(pet);
}

// This parses the pet ID in to a function, allowing for the pet with the ID to be LOADED from the pets DATABASE
function getPet(req, res) {
  const pet = load(req.params.id);
  res.json(pet);
}

// This parses the pet ID in to a function, allowing for the pet with the ID to be DELETED from the pets DATABASE
function deletePet(req, res) {
  const pet = remove(req.params.id);
  res.json(pet);
}

// Specifies the routes needed, in order to obtain specific data
app.post('/pets', createPet);
app.put('/pets/:id', updatePet);
app.get('/pets/:id', getPet);
app.delete('/pets/:id', deletePet);

// Listens to port: 8080, for any POST, PUT, GET, and DELETE requests
app.listen(8080);
