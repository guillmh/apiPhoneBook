const express = require("express");
const app = express();

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//Obtiene informacion de la api(hora, cantidad de recursos)
app.get("/info", (request, response) => {
  const fech = new Date();
  const personsTotal = `Phonebook has info for ${
    persons.length
  } people <br/> ${fech.toString()}`;
  response.send(personsTotal).end();
});

//Obtiene todo los revcursos de persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//Declara una variabel con el puerto
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
