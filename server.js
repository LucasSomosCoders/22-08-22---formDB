// express
const express = require('express');
const app = express();
const PORT = 3000;

// mongoDB
const mongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://127.0.0.1:27017';

// middleware para interpretar req.body
app.use(express.urlencoded({
  extended: false
}))

// route get home
app.get('/', (req, res) => {
  res.send('<form method="post" action="/submit-form"> <input type="text" name="username" /> <input type="submit" /></form>');
})

// Respuesta al submit del formulario por parte del usuario (Front)
app.post('/submit-form', (req, res) => {
  const username = req.body.username;
  console.log(username);
  res.send(`<h1>Hola ${username}</h1>`);
  mongoClient.connect(
    URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if(err){
        // return console.log(err);
        // Modo de devbolver un error con el objeto Error
        return console.log(new Error('Error en la conexion a la base de datos'));
      }

      console.log(`MongoDB Connected: ${URL}`);

      // obtenemos o creamos la base de datos dataForm
      const db = client.db('dataForm');
      // obtenemos o creamos la coleccion users
      const users = db.collection('users');
      // insertamos un elemento a la colleccion de la base de datos
      users.insertOne({name: username}, (err, result) => {})
      const usersDB = users.find().toArray((err, result) => {
        console.log(result);
        // mostramos el nombre del primer objeto del array de users
        console.log(result[0].name);
    });
      // console.log(usersDB);
    })
})

// server listen
app.listen(PORT, () => {
  console.log(`Servidor corriendo en  http://localhost:${PORT}`);
});
