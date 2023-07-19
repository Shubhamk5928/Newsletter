const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const { Server } = require("http");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  console.log(firstname + " " + lastname + " " + email);

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us13.api.mailchimp.com/3.0/lists/acd1bc1fa3";
  const options = {
    method:"POST",
    auth : "shubhamk5928:a4e49132b881a6537d40ac6cffedb7ed-us13"
  }
  const request = https.request(url , options,function(response){
     if(response.statusCode === 200){
        console.log("Sucessfully Subscribed");
        res.sendFile(__dirname+"/sucess.html");
     }else{
        res.sendFile(__dirname+"/failure.html");
        console.log("Error with status code "+response.statusCode)

     }
     response.on("data",function(data){
        console.log(JSON.parse(data));
     })
  })

  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("server started at port 3000");
});

// e83478a87c387c29e49f114eefebea4a-us13
// acd1bc1fa3.
