import WeatherController from "../controllers/weatherController.js";
export default (app) => {
    app.get("/api/v1/location", WeatherController.getLocation);
    app.get("/api/v1/current", WeatherController.findLocation, WeatherController.getCurrent);
    app.get("/api/v1/forecast", WeatherController.findLocation, WeatherController.getForecast);
    app.get("/api/v1/current/:city", WeatherController.getCurrent);
    app.get("/api/v1/forecast/:city", WeatherController.getForecast);
}