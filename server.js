// OUR "BBDD" 
var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
];

// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.urlencoded({
    extended: true
  }))

app.get('/', function(req, res) {

    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
});

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/newpet', function(req, res) {
    res.render('pages/newPet');

});

app.post('/newpet', function(req, res, next) {
    res.send('pages/newPet');
    const {name, organization, year} = req.body; 
    if(name.length > 3 && organization.length > 3 && +year){
       mascots.push({
           name,
           organization,
           birth_year: year
       })
       res.redirect('/');
       next();
    }

});


app.listen(8080);
console.log('8080 is the magic port');
