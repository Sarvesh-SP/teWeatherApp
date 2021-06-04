const request = require('request')



const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f2d4ea7c1d1089c0454aaefffbd16908&query=${lat}, ${lon}`
  request({url: url, json: true} , (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if(body.error) {
      callback('Unable to find location', undefined)
    } else {
      const {temperature, feelslike, weather_descriptions, observation_time} = body.current;
      let data = {
        temp: temperature,
        feels: feelslike,
        des: weather_descriptions[0],
        time: observation_time
      }
      callback(undefined, data)
    }
  })
}


module.exports = forecast
