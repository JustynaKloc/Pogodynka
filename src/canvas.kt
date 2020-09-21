package hello

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import kotlinx.browser.document
import kotlinx.browser.window
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.Image
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
    Loader.loadCitiesWeather(cities)
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

fun startRendering(cities: MutableList<City>, bgImage: HTMLImageElement) {
    renderCanvas(cities, bgImage)

    window.setInterval({
        renderCanvas(cities, bgImage)
        Loader.loadCitiesWeather(cities)
    },300000)
}

fun clearPopUp(popUpBaseX: Double, popUpBaseY: Double) {
    context.fillStyle = "rgb(255,255,255)"
    context.fillRect(popUpBaseX, popUpBaseY, 10.0, MAP_HEIGHT)
}

fun main() {

    var cities: MutableList<City> = mutableListOf<City>()
    cities.add(City("Warszawa", 542.4, 343.2))
    cities.add(City("Łódź", 426.4, 416.0))
    cities.add(City("Gdańsk", 351.6, 120.0))
    cities.add(City("Szczecin", 79.2, 208.8))
    cities.add(City("Bydgoszcz", 340.8, 240.8))
    cities.add(City("Gorzów Wlkp.", 100.8, 296.0))
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

    canvas.onmousemove =
    {
        mouseEvent ->
        var popUpSet: Boolean = false
        var margin: Double = 16.0
        var popUpBaseX: Double = mapOriginX + MAP_WIDTH + margin
        var popUpBaseY: Double = mapOriginY + margin

        for (city in cities) {
            if (isWithinCityBoundingBox(mouseEvent.pageX, mouseEvent.pageY, city)) {

                clearPopUp(popUpBaseX - margin, popUpBaseY - margin)

                var cloudiness = city.weather?.clouds?.all
                if (cloudiness !== undefined) {
                    cloudiness += "%"
                } else {
                    cloudiness = "N/A"
                }

                val textHeightInPixels = 16
                context.fillStyle = "rgb(0,0,0)"
                context.font = "bold ${textHeightInPixels}px Georgia, serif"

                context.fillText("Prognoza pogody dla " + city.name, popUpBaseX, popUpBaseY)
                popUpBaseY += textHeightInPixels + margin
                context.fillText("Temperatura: " + toCelcius(city.weather?.main?.temp) + " ℃", popUpBaseX, popUpBaseY)
                popUpBaseY += textHeightInPixels + margin
                context.fillText("Temperatura odczuwalna: " + toCelcius(city.weather?.main?.feels_like) + " ℃", popUpBaseX, popUpBaseY)
                popUpBaseY += textHeightInPixels + margin
                context.fillText("Minimalna temperatura: " + toCelcius(city.weather?.main?.temp_min) + " ℃", popUpBaseX, popUpBaseY)
                popUpBaseY += textHeightInPixels + margin
                context.fillText("Maksymalna temperatura: " + toCelcius(city.weather?.main?.temp_max) + " ℃", popUpBaseX, popUpBaseY)
                popUpBaseY += textHeightInPixels + margin
                context.fillText("Ciśnienie: " + city.weather?.main?.pressure + " hPa", popUpBaseX, popUpBaseY)
                popUpBaseY += textHeightInPixels + margin
                context.fillText("Wilgotność: " + city.weather?.main?.humidity + "%", popUpBaseX, popUpBaseY)
                popUpBaseY += textHeightInPixels + margin
                context.fillText("Zachmurzenie: " + cloudiness.orEmpty(), popUpBaseX, popUpBaseY)
                popUpBaseY += textHeightInPixels + margin
                context.fillText("Prędkość wiatru: " + city.weather?.wind?.speed + " m/s, " , popUpBaseX, popUpBaseY)
                popUpSet = true
                break
            }
        }

        if (!popUpSet) {
            clearPopUp(popUpBaseX - margin, popUpBaseY - margin)
        }

    }
}
