// include required modules
var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

// creates an express application
var app = express();

// creates a ForecatIo object with our API key
var weather = new ForecastIo("552b08d6adea3e1cce34fb460d96a3ad");

// serves static files out of public
app.use(express.static(path.resolve(__dirname, "public")));

// serves views out of a our views folder
app.set("views", path.resolve(__dirname, "views"));

// uses ejs as the view engine
app.set("view engine", "ejs");

// render index view if you hit the homepage
app.get("/", function(req, res) {
  res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
  var zipcode = req.params[0]; // captures specified ZIP code and passes it as req.params[0]
  var location = zipdb.zipcode(zipcode); // grabs location data with the zipcode
  if (!location.zipcode) {
    next();
    return;
  }

  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.forecast(latitude, longitude, function(err, data) {
    if (err) {
      next();
      return;
    }
    res.json({
      zipcode: zipcode,
      temperature: data.currently.temperature
    });
  });
});

app.use(function(req, res){
  res.status(404).render("404");
});

app.listen(3000);
