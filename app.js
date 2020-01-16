const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.get("/", function(req, res){

  res.sendFile(__dirname+"/signup.html");

});

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data ={
    members:[
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/8bed3c8a42",
    method:"POST",
    headers: {
      "Authorization": "fifi a023c44b1cfa942165344bc586bf5c00-us4"
    },
    // body: jsonData
  };

  app.post("/failure", function(req, res){
    res.redirect("/");
  });

  request(options, function(error, response, body){
    if(error){
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }else if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
  });

  console.log(firstName, lastName, email);
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

//id: 8bed3c8a42

// a023c44b1cfa942165344bc586bf5c00-us4
