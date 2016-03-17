var express = require('express');
var path = require('path');
var hbs = require('hbs');
var expressHbs = require('express3-handlebars');
var bodyParser = require('body-parser');

var config = require('./config');
var login = require('./login');
var data = require('./data-interaction');

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('static'));
app.use('/static', express.static(__dirname + '/static_resources'));

// view engine setup to use Handlebars templates
app.set('views', path.join(__dirname, 'views'));
//Set .hbs as the default extension to be used in view engine for the app
app.engine('hbs', expressHbs({extname:'hbs'}));
app.set('view engine', 'hbs');


//Use register partials to get partial templates from the specific partials directory "partials"
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', function (req, res) {
    //Sets a string as a response to get '/'
    //res.send('Hello World!');
    //Renders main.hbs from views/layouts folder
    //res.render(app.get('views') + '/layouts/'+ 'main');
    //Renders static html file stored under static folder when appending '/static' to path
    //res.sendFile(path.join('/static/views/landing.html'));
    res.redirect('/login');
});

app.get('/login', function (req, res) {
    //Renders login.hbs from views/layouts folder
    res.render(app.get('views') + '/layouts/'+ 'login');
    var query = req.query;

    //Insert registered user if not already present
    login.insertRegisteredUser(query);
});


app.get('/main', function (req, res) {
    //Renders main.hbs from views/layouts folder
    res.render(app.get('views') + '/layouts/'+ 'main');
});

app.listen(config.http_port, function () {
  console.log('App listening on port : '+config.http_port);
  console.log('Please access app at http://localhost:'+config.http_port);
  //console.log(config.root);
  //console.log("Variable __dirname : "+__dirname);
});


// POST method for main
app.post('/login', function (req, res) {
    //console.log("POSTBODY: " + JSON.stringify(req.body));
    login.authenticateCredentials(req, function(err, redirectLink) {
        if(redirectLink) {
            res.redirect(redirectLink);
        }
        else {
            console.log(err);
        }
    });
});

// POST method for the AJAX entry-point
app.post('/saveUserData', function (req, res) {
    console.log("in POST in db");
    console.log("POSTBODY: " + JSON.stringify(req.body));
});

module.exports = app;