package hello

import org.w3c.xhr.XMLHttpRequest

object Load {

    // "http://api.openweathermap.org/data/2.5/box/city?bbox=17,50,19,53,10&APPID=d024bb6a5c2b3eecfd7d90f9dce6c00a"

    fun loadCitiesWeather(cities: MutableList<City>) {

        for(city in cities) {
            loadCityWeather(city)
        }
    }

    fun loadCityWeather(city: City) {
        var name: String = city.name

        val url = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&APPID=d024bb6a5c2b3eecfd7d90f9dce6c00a"
        var responseSingleCity : ResponseCity
        getAsync(url) {
            response ->
            responseSingleCity = JSON.parse<ResponseCity>(response)
            city.setWeather(responseSingleCity)
        }
    }

    private fun getAsync(url: String, callback: (String) -> Unit) {
        val xmlHttp = XMLHttpRequest()
        xmlHttp.open("GET", url)

        xmlHttp.onload = {
            if (xmlHttp.readyState == 4.toShort() && xmlHttp.status == 200.toShort()) {
                callback.invoke(xmlHttp.responseText)
            }
        }
        xmlHttp.send()
    }
}