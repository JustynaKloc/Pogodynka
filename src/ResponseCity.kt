package hello


data class ResponseObject(val list: Array<ResponseCity>)

data class ResponseCity(val name: String, val sys: Country?, val weather: Array<WeatherEntity>, val main: Temperature, val clouds: Cloudiness, val wind: Wind)

data class WeatherEntity(val main: String, val icon: String)

data class Temperature(val temp: String, val feels_like: String, val temp_min: String, val temp_max: String, val pressure: String, val humidity: String)

data class Country(val country: String)

data class Cloudiness(val all: String)

data class Wind(val speed: String)
