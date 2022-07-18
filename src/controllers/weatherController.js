import axios from 'axios'

const API_KEY = "5153b3dabbf30d72fe92dd8980ac770c"
const API_LOCATION = 'https://ipapi.co/json'
const API_URL = 'https://api.openweathermap.org/data/2.5/'

export default class WeatherController {
    static getData(url, req, res, next) {
        axios.get(url)
            .then(response => {
                if (next) {
                    req.params.city = response.data.city;
                    next();
                } else {
                    return res.status(200).json(response.data);
                }
            })
            .catch(error => {
                return res.status(500).json({ "error": "City not found." });
            });
    }
    static getLocation(req, res) {
        WeatherController.getData(API_LOCATION, req, res)
    }
    static findLocation(req, res, next) {
        WeatherController.getData(API_LOCATION, req, res, next);
    }
    static getWeatherUrl(city, service) {
        return API_URL + service + "?q=" + encodeURI(city) + "&appid=" + API_KEY + "&units=metric";
    }
    static getCurrent(req, res) {
        const url = WeatherController.getWeatherUrl(req.params.city, 'weather');
        WeatherController.getData(url, req, res);
    }
    static getForecast(req, res) {
        const url = WeatherController.getWeatherUrl(req.params.city, 'forecast');
        WeatherController.getData(url, req, res);
    }
}