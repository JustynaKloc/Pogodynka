package hello

import org.w3c.xhr.XMLHttpRequest

object Loader {

    val API_URL_ALL_CITIES : String = "http://api.openweathermap.org/data/2.5/box/city?bbox=17,50,19,53,10&APPID=6628402095e2fe3781628d767972cf55"

    fun loadCitiesWeather(cities: MutableList<City>) {

        for(city in cities) {
            loadCityWeather(city)
        }
    }

    fun loadCityWeather(city: City) {
        var name: String = city.name
        if(name == "Gorzów Wlkp.") {
            name = "Gorzów Wielkopolski"
        }

        val url = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&APPID=6628402095e2fe3781628d767972cf55"
        var responseSingleCity : ResponseCity
        getAsync(url) { response ->
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