const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Chris'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help message',
        name: 'Chris'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Add search an address query'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'Add search an address'
            })
        } else {
            weather(latitude,longitude, (error, weatherData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                return res.send({
                    location: location,
                    forecast: weatherData,
                    address: req.query.address
                })
            }) 
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Add search term'
        })
    }
    req.query
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Chris',
        errorMessage: 'This is a Help error message'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris',
        errorMessage: 'This is an error message'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})