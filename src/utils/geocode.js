const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=09863e26663062211387c1cf93e50bb8&limit=1&query=' + encodeURIComponent(address)

    request({ url: url , json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocoding service!')
        } else if (body.data.length < 1) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                latitude : body.data[0].latitude,
                longitude : body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode