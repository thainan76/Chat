/*FRAMEWORK EXPRESS do servidor HTTP*/
var express = require('express');
/*MODULO CONSIGN para carregar as rotas/apis*/
var consign = require('consign');
/*MODULO bodyParser para formato JSON*/
var bodyParser = require('body-parser');
/*MODULO EXPRESS-validator p/ formulario*/
var expressValidator = require('express-validator');
/*inciar o objeto*/
var app = express();

/*setar as variaveis 'view engine' e 'views' do express*/
app.set('view engine', 'ejs');
app.set('views', './app/views');

/*configurar o middleware express.static*/
app.use(express.static('./app/public'));

/*configurar o middleware body-parser*/
app.use(bodyParser.urlencoded({extended: true}));

/*configurar o middleware express-validator*/
app.use(expressValidator());

/* efetua o autoload das rotas,models e dos controlerrs no objeto app*/
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/*exportar o objeto app*/
module.exports = app;
