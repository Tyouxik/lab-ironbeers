const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req,res)=> {
  const allBeers = punkAPI.getBeers()
  allBeers.then(allBeers => {
    res.render('beers.hbs', {allBeers: allBeers})})
  .catch(error => console.log(error));
  
});

app.get('/random-beers', (req,res) => {
  const randomBeer = punkAPI.getRandom()
  console.log('I get it')
  randomBeer.then(randomBeer => {
    console.log(randomBeer);
    res.render('random-beer.hbs', {randomBeer: randomBeer})})
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
