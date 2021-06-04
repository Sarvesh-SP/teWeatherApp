const path = require('path')
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs');
const port = 3000;
const app = express();

//Define paths for Express config
const public = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

//setting handlebars engine and views location.
app.set('views', views)
app.set('view engine', 'hbs')
hbs.registerPartials(partials)

//Setup static directory to serve
app.use(express.static(public));



app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Sarvesh SP'
  })
})



app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    about: 'https://avatars.githubusercontent.com/u/40694430?v=4',
    name: 'Sarvesh'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: "Stuck?..why don't you get some help.",
    title: "Help",
    name: "Sarvesh SP"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } else {
    geocode(req.query.address, (error, data) => {
      if (error) {
        return res.send(error)
      } else {
        const {lat, lon} = data
        forecast(lat, lon, (error, fd) => {
          if (error) {
            return res.send(error)
          } else {
            const {temp, des} = fd;
            return res.send({
              foreCast: des,
              temperature: temp,
              location: req.query.address
            })
          }
        })
      }
    })
  }

})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found.'
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Page not found'
  })
})
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})

