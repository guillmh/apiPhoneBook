const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const Person = require("./models/numbers");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

//Creamos un nuevo token personalizado de morgan, el cual nos devulve le contenido del cuerpo en formato JSON
morgan.token("body", (req) => JSON.stringify(req.body));
//Indicamos que queremos usar a morgan como middleware, indicamos la infromacion que se muestre, al ultimo usamos nuestro token personalizado 'body'
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//Obtiene informacion de la api(hora, cantidad de recursos)
app.get("/info", (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const fech = new Date();
      const personsTotal = `Phonebook has info for ${count} people <br/> ${fech.toString()}`;
      response.send(personsTotal);
    })
    .catch((error) => next(error));
});

//Obtiene todo los recursos de persons
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

//Obtiene un solo recurso por medio de un identificador
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//Elimina un solo recurso por medio de un identificador
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

//Agrega un recurso a persons
app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  //Verifica si el campo name o number estan vacios, si lo estan devulve un mensaje de error
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const number = new Person({
    name: body.name,
    number: body.number,
  });

  number
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

//Actualiza un solo recurso pormedio de su id
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  //Verifica que el body tenga los campos necesarios
  if (!name || !number) {
    return response.status(404).json({ error: "Name or number missing" });
  }

  //Busca el indice del contacto a actualizar
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatePerson) => {
      if (updatePerson) {
        response.json(updatePerson);
      } else {
        response.status(400).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

//Declara una variabel con el puerto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
