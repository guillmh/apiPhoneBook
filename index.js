const express = require("express");
const app = express();

app.use(express.json());

let persons = [
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

//Obtiene todo los recursos de persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//Obtiene un solo recurso por medio de un identificador
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

//Elimina un solo recurso por medio de un identificador
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

//Funcion para generar un id
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

//Agrega un recurso a persons
app.post("/api/persons", (request, response) => {
  const body = request.body;
  //Verifica si el campo name o number estan vacios, si lo estan devulve un mensaje de error
  if (!body.name || !body.number) {
    return response.status(404).json({ error: "You need to add any fields" });
  }
  //Verifica si almenos un elemento cumple con la condicion en este casi si es igual el nombre y devuelve true
  const nameExists = persons.some(
    (p) => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase()
  );
  //si es true responde con un mensaje de error
  if (nameExists) {
    return response
      .status(404)
      .json({ error: "The name is already registered" });
  }
  //El cuerpo con los campos person
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  console.log(person);
  //Une el array persons con el nuveo recurso person
  persons = persons.concat(person);
  response.status(201).json(person);
});

//Declara una variabel con el puerto
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
