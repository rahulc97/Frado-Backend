const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoConnect } = require('./util/database');
const UserData = require('./models/userData');


const app = express();

let port=process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:3000',
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

  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const place = req.body.place;
  const courses = req.body.courses.split(',');

  const userData = new UserData(name, email, mobile,place,courses);
  userData
    .save()
    .then((result) => {
      console.log('User Registration Success');
      res.send('succes');
    })
    .catch((err) => {
      console.log(err);
      res.send('failed');
    });

  // next();
});
const server = http.createServer(app);

mongoConnect(() => {
  console.log(port);
  server.listen(port);
});
