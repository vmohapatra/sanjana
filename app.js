var express = require('express');
var path = require('path');
var hbs = require('hbs');
var expressHbs = require('express3-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./config');
var login = require('./dbutils/login');
var data = require('./dbutils/data-interaction');

var app = express();

app.use(express.static('static'));
app.use('/static', express.static(__dirname + '/static_resources'));

// view engine setup to use Handlebars templates
app.set('views', path.join(__dirname, 'views'));
//Set .hbs as the default extension to be used in view engine for the app
app.engine('hbs', expressHbs({extname:'hbs'}));
app.set('view engine', 'hbs');

//Use register partials to get partial templates from the specific partials directory "partials"
hbs.registerPartials(__dirname + '/views/partials');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Use a session
app.use(session({
    secret: "qwerty987dfg878Q6sdfwe34dsfgh", 
    resave: false, 
    saveUninitialized: true
}));

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
    if(req.session.user) {
        //If logged in
        console.log("Valid session. User logged in.");
        login.getUserInfo(req, function(err, user){
            if(user) {
                //Renders main.hbs from views/layouts folder
                res.render(
                    app.get('views') + '/layouts/'+ 'main', 
                    {userInfo : user}
                );
            }
            else {
                console.log(err);
            }
        });
    }
    else {
        //if not logged in
        console.log("Invalid session. User is not logged in");
        res.redirect('/login');
    }
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

// POST method to save form data to db
app.post('/saveFormData', function (req, res) {
    data.saveForm(req);
});

// GET method to fetch form data from db
app.get('/fetchFormData', function(req, res) {
    data.fetchForm(req);
});

module.exports = app;