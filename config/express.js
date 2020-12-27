
let express = require('express');
let consign = require('consign'); 
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

let app = express();


app.use('/css',express.static('./app/public/css'));
app.use('/lib',express.static('./app/public/lib'));
app.use('/images',express.static('./app/public/images'));
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({extended: true} ));
app.use(expressValidator() );

consign({cwd:'app'})
   .include('rotas') 
   
   .then('infra')
   .then('repositorio')
   .into(app);

module.exports = function() {
    return app;
}

 