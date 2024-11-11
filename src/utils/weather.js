const request = require('request')

const weather = (lat, long, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=e70aaa35b29615f5976c279c1cd03135&query=' + lat + ',' + long
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')

        }
    })
}

module.exports = weather