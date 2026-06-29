const express = require('express');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const PersonModel = require('./person_schema.js');
const dbconnect = require('./dbconnect.js');

/*

In the postman use the following URL

localhost:5003/search/a@gmail.com

*/

//SEARCH STUDENT API
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

app.listen(5003, () => {
    console.log('Authentication Service Server is running on PORT NO: 5003')
})