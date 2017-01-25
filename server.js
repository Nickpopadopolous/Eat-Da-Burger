var express = require('express');
var body_parser = require('body-parser');
var method = require('method-override');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(body_parser.json({ type: 'application/*+json' }));
app.use(body_parser.raw({ type: 'application/vnd.custom-type' }));
app.use(body_parser.text({ type: 'text/html' }));

app.use(method('_method'));

var exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

app.listen(PORT, function(){
	console.log('Listening on PORT:' + PORT);
})