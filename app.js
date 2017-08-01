var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();

const port = 3000;

const route = require('./routes/route');

//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//On Successful connection
mongoose.connection.on('connected', function(){
    console.log('Connected to database mongodb at port 27017');
});
//On error in connection
mongoose.connection.on('error', function(err){
    if(err){
    console.log('Error in database connection:' +err);
    }
});

app.listen(port, ()=>{
    console.log("Server started at port:" +port);
});

//Testing Server. Creating a home route for port 3000
app.get('/', function(req, res){
    res.send("This app works");
})

app.use('/api', route);

//Adding middleware - cors
app.use(cors());

//body parser - To parse text as json
app.use(bodyparser.json());

//static file
app.use(express.static(path.join(__dirname, 'public')));
