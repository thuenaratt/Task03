const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');



/*
In the postman use the following URL
localhost:5001/registration

{
  "firstname":"Joe",
  "email":"a@gmail.com",
  "password":"abc",
  "mobile": 12345678,
  "role": "student"
}

*/

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}
app.post("/login", (req, res) => {
  // console.log(req.body.email)
  // console.log(req.body.password)
  // console.log(req.body.role)

  PersonModel.find({ "emailid": req.body.email, "pass": req.body.password, "role" : req.body.role})
    .then(getsearchdocument => {
      console.log(getsearchdocument)
      if (getsearchdocument.length > 0) {
        return res.send("Valid User")
      }
      else {
        res.status(400).send("Invalid user")
      }
    }) //CLOSE THEN
}//CLOSE CALLBACK FUNCTION BODY
)
//REG API
// app.post('/registration', (req, res) => {
//   console.log("REG API EXECUTED")
//   const pobj = new PersonModel({
//     id: uniqueid(1000, 9999),
//     name: req.body.firstname,
//     emailid: req.body.email,
//     pass: req.body.password,
//     mobile: req.body.mobile,
//     role: req.body.role
//   });//CLOSE PersonModel
  
//   //INSERT/SAVE THE RECORD/DOCUMENT
//   pobj.save()
//     .then(inserteddocument => {
//       res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
//     })//CLOSE THEN
//     .catch(err => {
//       res.status(500).send({ message: err.message || 'Error in Employee Save ' })
//     });//CLOSE CATCH
// }//CLOSE CALLBACK FUNCTION BODY
// );//CLOSE POST METHOD

app.get('/search/:semail', (req, res) => {
    console.log("INSIDE SEARCH STUDENT API")
    PersonModel.find({ "emailid": req.params.semail, "role" : "student"})
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Not found with that Email Id " + req.params.semail });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE GET METHOD


// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5001, () => console.log('EXPRESS Server Started at Port No: 5001'));
