//import module
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const routes = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connect
mongoose.connection.on('connected', ()=>{
	console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error', (err)=>{
	if(err){
		console.log('Error database connection:' + err);
	}
});

//port no 
const port = 4000;

//adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static file
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', routes);

//testing server
app.get('/', (req, res)=> {
	res.send('foobar');
});

app.listen(port, ()=>{
	console.log('Server started at port' + port);
});