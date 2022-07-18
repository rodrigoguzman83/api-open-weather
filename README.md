# Backend Api Open Weather
Preferentemente desarrollar sobre NodeJS.
Se requiere implementar una API que provea en formato JSON el estado del tiempo basado en
diferentes endpoints.
Se requiere realizar tests con las librerías antes mencionadas o con equivalentes.
A continuación se detallan los endpoints que deben ser implementados
### Ruta base
* /v1
### Endpoints
* /location
 Devuelve los datos de ubicación city según ip-api.
* /current[/city]
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
ip-api y el estado del tiempo actual.
* /forecast[/city]
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
ip-api y el estado del tiempo a 5 días
