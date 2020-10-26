const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoConnect } = require('./util/database');
const UserData = require('./models/userData');
const { getRegisteredUsers } = require('./controller/user');

const app = express();

let port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  // origin: 'http://localhost:3000',
  // uncomment the line before hosting
  origin:'https://frado-academy.herokuapp.com',
  //comment before hosting
  // origin: ['http://localhost:3000', 'https://frado-academy.herokuapp.com'],
  credentials: true,
};
app.use(cors(corsOptions));

// app.use((req, res, next) => {
// //   res.setHeader('Access-Contorl-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
//   next();
// });

app.get('/register', (req, res) => {
  console.log('asddsa', req);

  res.send('get req');
  // next();
});
app.post('/register', (req, res) => {
  // res.header('Access-Control-Allow-Headers','Content-Type,Authorization');

  // res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  console.log(req.body.name);

  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const mobile = req.body.mobile.trim();
  const place = req.body.place.trim();
  const courses = req.body.courses.split(',');

  const userData = new UserData(name, email, mobile, place, courses);
  userData
    .save()
    .then((result) => {
      console.log('User Registration Success');
      res.status(200).send('success');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('failed');
    });

  // next();
});

app.get('/fetchAllUserData58fdbf5c0ef8a50b4cdd9a8b', (req, res) => {
  const result = getRegisteredUsers();
  result.toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
     
    });
  // console.log(JSON.stringify(result));
  // getRegisteredUsers()
});
const server = http.createServer(app);

mongoConnect(() => {
  console.log(port);
  server.listen(port);
});
