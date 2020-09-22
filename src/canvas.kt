package hello

import kotlinx.browser.document
import kotlinx.browser.window
import org.w3c.dom.*
import kotlin.math.roundToInt

const val MAP_WIDTH: Double = 800.0
const val MAP_HEIGHT: Double = 777.6

var mapOriginX: Double = 0.0
var mapOriginY: Double = 0.0

val canvas = initializeCanvas()
fun initializeCanvas(): HTMLCanvasElement {
    val canvas = document.createElement("canvas") as HTMLCanvasElement
    val context = canvas.getContext("2d") as CanvasRenderingContext2D
    context.canvas.width  = window.innerWidth
    context.canvas.height = window.innerHeight
    document.body!!.appendChild(canvas)
    return canvas
}

val context: CanvasRenderingContext2D
    get() {
        return canvas.getContext("2d") as CanvasRenderingContext2D
    }

val width: Int
    get() {
        return canvas.width
    }

val height: Int
    get() {
        return canvas.height
    }

fun renderBackground(bgImage: HTMLImageElement) {
    context.save()
    context.fillStyle = "#ffffff"
    context.fillRect(0.0, 0.0, width.toDouble(), height.toDouble())
    mapOriginX = window.innerWidth / 2 - MAP_WIDTH / 2
    mapOriginY = 0.0
    context.drawImage(bgImage, mapOriginX, mapOriginY, MAP_WIDTH, MAP_HEIGHT)
    context.restore()
}

fun renderCanvas(cities: MutableList<City>, bgImage: HTMLImageElement) {
    renderBackground(bgImage)
    for(city in cities) {
        city.draw()
    }
    Load.loadCitiesWeather(cities)
}

fun startRendering(cities: MutableList<City>, bgImage: HTMLImageElement) {
    renderCanvas(cities, bgImage)
    Load.loadCitiesWeather(cities)
    window.setInterval({
        renderCanvas(cities, bgImage)
        Load.loadCitiesWeather(cities)
    },30000000)
}

fun toCelcius(kelvin: String?) : String {
    if(kelvin != null) {
        return (kelvin.toDouble() - 273.15).roundToInt().toString()
    } else {
        return ""
    }
}

fun isWithinCityBoundingBox(x: Double, y: Double, city: City): Boolean {
    val margin = 30
    var cityX: Double = city.x + mapOriginX - city.textWidthInPixels / 2
    var cityY: Double = city.y + mapOriginY + margin

    if(x >= cityX && x <= cityX + city.textWidthInPixels + margin) {
        if(y >= cityY && y <= cityY + city.textHeightInPixels + margin * 1.5) {
            return true
        }
    }

    return false
}

fun main() {

    var cities: MutableList<City> = mutableListOf<City>()
    cities.add(City("Warszawa", 542.4, 343.2))
    cities.add(City("Łódź", 426.4, 416.0))
    cities.add(City("Gdańsk", 351.6, 120.0))
    cities.add(City("Szczecin", 79.2, 208.8))
    cities.add(City("Bydgoszcz", 340.8, 240.8))
    cities.add(City("Gorzów Wielkopolski", 100.8, 296.0))
    cities.add(City("Zielona Góra", 120.0, 400.0))
    cities.add(City("Wrocław", 203.2, 476.0))
    cities.add(City("Katowice", 392.0, 592.0))
    cities.add(City("Kraków", 476.8, 660.8))
    cities.add(City("Rzeszów", 621.2, 621.6))
    cities.add(City("Lublin", 660.0, 490.4))
    cities.add(City("Poznań", 236.0, 340.0))
    cities.add(City("Olsztyn", 500.8, 176.0))
    cities.add(City("Suwałki", 688.4, 144.0))
    cities.add(City("Białystok", 692.8, 264.4))
    cities.add(City("Opole", 305.2, 513.6))
    cities.add(City("Kielce", 520.0, 533.6))

    var bgImage = Image();
    bgImage.src = "img/map_white.png";
    bgImage.onload =
    {
        startRendering(cities, bgImage)
    }

    canvas.onmousedown =
    {
        mouseEvent ->

        for (city in cities) {
            if (isWithinCityBoundingBox(mouseEvent.pageX, mouseEvent.pageY, city)) {

                window.alert("Prognoza pogody dla " + city.name +"\n"+ "Temperatura: " + toCelcius(city.weather?.main?.temp) + " ℃ \n" +
                        "Temperatura odczuwalna: " + toCelcius(city.weather?.main?.feels_like) + " ℃ \n" + "Minimalna temperatura: " + toCelcius(city.weather?.main?.temp_min) + " ℃ \n" +
                        "Maksymalna temperatura: " + toCelcius(city.weather?.main?.temp_max) + " ℃ \n" + "Ciśnienie: " + city.weather?.main?.pressure + " hPa \n"+ "Wilgotność:" + city.weather?.main?.humidity + "%\n")

            }
        }

    }
}
