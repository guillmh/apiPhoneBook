// Importa el módulo mongoose para interactuar con MongoDB.
const mongoose = require("mongoose")

// Desactiva el modo estricto para las consultas (strictQuery).
// Esto permite, por ejemplo, que las consultas no fallen si se usan campos no definidos en el esquema.
mongoose.set("strictQuery", false)

// Obtiene la URL de conexión a MongoDB desde las variables de entorno.
const url = process.env.MONGODB_URI

console.log("connecting to", url)

// Establece la conexión con la base de datos MongoDB usando la URL.
mongoose
  .connect(url)
  .then((result) => {
    // Se ejecuta si la conexión es exitosa.
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    // Se ejecuta si hay un error en la conexión.
    console.log("error connecting to MongoDB:", error.message)
  })

// Define el esquema para los contactos en la agenda.
// Especifica que cada contacto tendrá un nombre (name) y un número (number), ambos de tipo String.
const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Define una transformación para cuando el objeto del esquema se convierte a JSON.
numberSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Reemplaza el _id de MongoDB por un campo 'id' más amigable y lo convierte a string.
    returnedObject.id = returnedObject._id.toString()
    // Elimina el campo _id y el campo __v (versión) del objeto resultante.
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Exporta el modelo 'Person' basado en personSchema para que pueda ser utilizado en otras partes de la aplicación.
module.exports = mongoose.model("Number", numberSchema)
