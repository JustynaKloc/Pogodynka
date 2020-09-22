package hello

import org.w3c.dom.Image
import kotlin.math.roundToInt


class City(name: String, x: Double, y: Double) {

    val name: String = name
    val x: Double = x
    val y: Double = y

    val textHeightInPixels = 20
    val textWidthInPixels = context.measureText(name).width

    var weather: ResponseCity? = null

    fun draw() {
        context.save()
        context.font = "bold ${textHeightInPixels}px Georgia, serif"
        context.shadowColor = "#c0c0c0"
        context.shadowBlur = 5.0
        context.shadowOffsetX = -4.0
        context.shadowOffsetY = 4.0
        context.fillStyle = "rgb(0,0,0)"
        context.fillText(name, mapOriginX + x - textWidthInPixels / 2, mapOriginY + y - textHeightInPixels / 2)
        context.restore()
    }

    fun setWeather(response: ResponseCity) {
        weather = response

        context.save()

        var X: Double = mapOriginX + x - textWidthInPixels / 2
        var Y: Double = mapOriginY + y - textHeightInPixels / 2 + 30

        // Temperature
        var temp: Double = response.main.temp.toDouble()
        context.fillStyle = "rgb(255,255,0)"
        context.font = "bold ${textHeightInPixels}px Georgia, serif"
        context.fillText((temp - 273.15).roundToInt().toString(), X, Y)

        // Icon
        var weatherImage = Image();
        weatherImage.src  = "img/" + response.weather[0].icon + ".png";
        weatherImage.onload = {
            context.drawImage(weatherImage, X + 20, Y - 10)
        }

        context.restore()
    }
}
