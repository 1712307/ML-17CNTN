var express = require('express');
var router = require('express').Router;
let {createNewUser,loadUser} = require("./model");

require("dotenv").config();
// App setup
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

let port=process.env.PORT||3000;

app.post("/user", function(req, res) {
  console.log('In load'); 
  let { name, phone,address } = req.body;
  createNewUser({name, phone, address})
    .then((row) => {
      res.send(row);
        }
      )
  });
app.get("/user", function(req, res) {
  console.log("In");
  loadUser()
    .then((row) => {
      res.send(row);
        }
      )
    });

app.get("/", function(req, res) {
  console.log("In");
  res.send('Hello');
}
);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
})


app.listen(port, function() {
  console.log('listening for requests');
});


