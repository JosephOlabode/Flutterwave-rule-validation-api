const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const cors = require("cors");

const error = require('./middleware/error');
const rule = require('./routes/rule-validation');

const app = express();
const PORT = process.env.PORT || 3000; // Defining your port number.

// this is use to allow cross origin access and server to server communication
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


const server = http.createServer(app); //creating a server with express

//configuring the bodyParser to handle JSON data thereby allowing the application to
//accept json format post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//this shows if the server is up and running
app.use('/', rule);
/*app.use('/',  (req, res, next) =>{
    res.send("Hello from Flutterwave server");
});*/


// this is a central place for handling errors
app.use(error);

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})