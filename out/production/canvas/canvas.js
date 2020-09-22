if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'canvas'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'canvas'.");
}var canvas = function (_, Kotlin) {
  'use strict';
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var roundToInt = Kotlin.kotlin.math.roundToInt_yrwdxr$;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var toShort = Kotlin.toShort;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  var ensureNotNull = Kotlin.ensureNotNull;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  function City(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.textHeightInPixels = 20;
    this.textWidthInPixels = get_context().measureText(name).width;
    this.weather = null;
  }
  City.prototype.draw = function () {
    get_context().save();
    get_context().font = 'bold 20px Georgia, serif';
    get_context().shadowColor = '#c0c0c0';
    get_context().shadowBlur = 5.0;
    get_context().shadowOffsetX = -4.0;
    get_context().shadowOffsetY = 4.0;
    get_context().fillStyle = 'rgb(0,0,0)';
    get_context().fillText(this.name, mapOriginX + this.x - this.textWidthInPixels / 2, mapOriginY + this.y - (this.textHeightInPixels / 2 | 0));
    get_context().restore();
  };
  function City$setWeather$lambda(closure$weatherImage, closure$X, closure$Y) {
    return function (it) {
      get_context().drawImage(closure$weatherImage.v, closure$X.v + 20, closure$Y.v - 10);
      return Unit;
    };
  }
  City.prototype.setWeather_5xbg1k$ = function (response) {
    this.weather = response;
    get_context().save();
    var X = {v: mapOriginX + this.x - this.textWidthInPixels / 2};
    var Y = {v: mapOriginY + this.y - (this.textHeightInPixels / 2 | 0) + 30};
    var temp = toDouble(response.main.temp);
    get_context().fillStyle = 'rgb(255,255,0)';
    get_context().font = 'bold 20px Georgia, serif';
    get_context().fillText(roundToInt(temp - 273.15).toString(), X.v, Y.v);
    var weatherImage = {v: new Image()};
    weatherImage.v.src = 'img/' + response.weather[0].icon + '.png';
    weatherImage.v.onload = City$setWeather$lambda(weatherImage, X, Y);
    get_context().restore();
  };
  City.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'City',
    interfaces: []
  };
  function Load() {
    Load_instance = this;
  }
  Load.prototype.loadCitiesWeather_a424vt$ = function (cities) {
    var tmp$;
    tmp$ = cities.iterator();
    while (tmp$.hasNext()) {
      var city = tmp$.next();
      this.loadCityWeather_qcmcwp$(city);
    }
  };
  function Load$loadCityWeather$lambda(closure$responseSingleCity, closure$city) {
    return function (response) {
      closure$responseSingleCity.v = JSON.parse(response);
      closure$city.setWeather_5xbg1k$(closure$responseSingleCity.v);
      return Unit;
    };
  }
  Load.prototype.loadCityWeather_qcmcwp$ = function (city) {
    var name = city.name;
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + name + '&APPID=d024bb6a5c2b3eecfd7d90f9dce6c00a';
    var responseSingleCity = {v: null};
    this.getAsync_0(url, Load$loadCityWeather$lambda(responseSingleCity, city));
  };
  function Load$getAsync$lambda(closure$xmlHttp, closure$callback) {
    return function (it) {
      if (closure$xmlHttp.readyState === toShort(4) && closure$xmlHttp.status === toShort(200)) {
        closure$callback(closure$xmlHttp.responseText);
      }return Unit;
    };
  }
  Load.prototype.getAsync_0 = function (url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url);
    xmlHttp.onload = Load$getAsync$lambda(xmlHttp, callback);
    xmlHttp.send();
  };
  Load.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Load',
    interfaces: []
  };
  var Load_instance = null;
  function Load_getInstance() {
    if (Load_instance === null) {
      new Load();
    }return Load_instance;
  }
  function ResponseObject(list) {
    this.list = list;
  }
  ResponseObject.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ResponseObject',
    interfaces: []
  };
  ResponseObject.prototype.component1 = function () {
    return this.list;
  };
  ResponseObject.prototype.copy_6hzrsq$ = function (list) {
    return new ResponseObject(list === void 0 ? this.list : list);
  };
  ResponseObject.prototype.toString = function () {
    return 'ResponseObject(list=' + Kotlin.toString(this.list) + ')';
  };
  ResponseObject.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.list) | 0;
    return result;
  };
  ResponseObject.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.list, other.list))));
  };
  function ResponseCity(name, weather, main) {
    this.name = name;
    this.weather = weather;
    this.main = main;
  }
  ResponseCity.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ResponseCity',
    interfaces: []
  };
  ResponseCity.prototype.component1 = function () {
    return this.name;
  };
  ResponseCity.prototype.component2 = function () {
    return this.weather;
  };
  ResponseCity.prototype.component3 = function () {
    return this.main;
  };
  ResponseCity.prototype.copy_116d81$ = function (name, weather, main) {
    return new ResponseCity(name === void 0 ? this.name : name, weather === void 0 ? this.weather : weather, main === void 0 ? this.main : main);
  };
  ResponseCity.prototype.toString = function () {
    return 'ResponseCity(name=' + Kotlin.toString(this.name) + (', weather=' + Kotlin.toString(this.weather)) + (', main=' + Kotlin.toString(this.main)) + ')';
  };
  ResponseCity.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.weather) | 0;
    result = result * 31 + Kotlin.hashCode(this.main) | 0;
    return result;
  };
  ResponseCity.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.weather, other.weather) && Kotlin.equals(this.main, other.main)))));
  };
  function WeatherEntity(main, icon) {
    this.main = main;
    this.icon = icon;
  }
  WeatherEntity.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'WeatherEntity',
    interfaces: []
  };
  WeatherEntity.prototype.component1 = function () {
    return this.main;
  };
  WeatherEntity.prototype.component2 = function () {
    return this.icon;
  };
  WeatherEntity.prototype.copy_puj7f4$ = function (main, icon) {
    return new WeatherEntity(main === void 0 ? this.main : main, icon === void 0 ? this.icon : icon);
  };
  WeatherEntity.prototype.toString = function () {
    return 'WeatherEntity(main=' + Kotlin.toString(this.main) + (', icon=' + Kotlin.toString(this.icon)) + ')';
  };
  WeatherEntity.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.main) | 0;
    result = result * 31 + Kotlin.hashCode(this.icon) | 0;
    return result;
  };
  WeatherEntity.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.main, other.main) && Kotlin.equals(this.icon, other.icon)))));
  };
  function Temperature(temp, feels_like, temp_min, temp_max, pressure, humidity) {
    this.temp = temp;
    this.feels_like = feels_like;
    this.temp_min = temp_min;
    this.temp_max = temp_max;
    this.pressure = pressure;
    this.humidity = humidity;
  }
  Temperature.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Temperature',
    interfaces: []
  };
  Temperature.prototype.component1 = function () {
    return this.temp;
  };
  Temperature.prototype.component2 = function () {
    return this.feels_like;
  };
  Temperature.prototype.component3 = function () {
    return this.temp_min;
  };
  Temperature.prototype.component4 = function () {
    return this.temp_max;
  };
  Temperature.prototype.component5 = function () {
    return this.pressure;
  };
  Temperature.prototype.component6 = function () {
    return this.humidity;
  };
  Temperature.prototype.copy_r3y0ew$ = function (temp, feels_like, temp_min, temp_max, pressure, humidity) {
    return new Temperature(temp === void 0 ? this.temp : temp, feels_like === void 0 ? this.feels_like : feels_like, temp_min === void 0 ? this.temp_min : temp_min, temp_max === void 0 ? this.temp_max : temp_max, pressure === void 0 ? this.pressure : pressure, humidity === void 0 ? this.humidity : humidity);
  };
  Temperature.prototype.toString = function () {
    return 'Temperature(temp=' + Kotlin.toString(this.temp) + (', feels_like=' + Kotlin.toString(this.feels_like)) + (', temp_min=' + Kotlin.toString(this.temp_min)) + (', temp_max=' + Kotlin.toString(this.temp_max)) + (', pressure=' + Kotlin.toString(this.pressure)) + (', humidity=' + Kotlin.toString(this.humidity)) + ')';
  };
  Temperature.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.temp) | 0;
    result = result * 31 + Kotlin.hashCode(this.feels_like) | 0;
    result = result * 31 + Kotlin.hashCode(this.temp_min) | 0;
    result = result * 31 + Kotlin.hashCode(this.temp_max) | 0;
    result = result * 31 + Kotlin.hashCode(this.pressure) | 0;
    result = result * 31 + Kotlin.hashCode(this.humidity) | 0;
    return result;
  };
  Temperature.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.temp, other.temp) && Kotlin.equals(this.feels_like, other.feels_like) && Kotlin.equals(this.temp_min, other.temp_min) && Kotlin.equals(this.temp_max, other.temp_max) && Kotlin.equals(this.pressure, other.pressure) && Kotlin.equals(this.humidity, other.humidity)))));
  };
  var MAP_WIDTH;
  var MAP_HEIGHT;
  var mapOriginX;
  var mapOriginY;
  var canvas;
  function initializeCanvas() {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    ensureNotNull(document.body).appendChild(canvas);
    return canvas;
  }
  function get_context() {
    var tmp$;
    return Kotlin.isType(tmp$ = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
  }
  function get_width() {
    return canvas.width;
  }
  function get_height() {
    return canvas.height;
  }
  function renderBackground(bgImage) {
    get_context().save();
    get_context().fillStyle = '#ffffff';
    get_context().fillRect(0.0, 0.0, get_width(), get_height());
    mapOriginX = (window.innerWidth / 2 | 0) - MAP_WIDTH / 2;
    mapOriginY = 0.0;
    get_context().drawImage(bgImage, mapOriginX, mapOriginY, MAP_WIDTH, MAP_HEIGHT);
    get_context().restore();
  }
  function renderCanvas(cities, bgImage) {
    var tmp$;
    renderBackground(bgImage);
    tmp$ = cities.iterator();
    while (tmp$.hasNext()) {
      var city = tmp$.next();
      city.draw();
    }
    Load_getInstance().loadCitiesWeather_a424vt$(cities);
  }
  function startRendering$lambda(closure$cities, closure$bgImage) {
    return function () {
      renderCanvas(closure$cities, closure$bgImage);
      Load_getInstance().loadCitiesWeather_a424vt$(closure$cities);
      return Unit;
    };
  }
  function startRendering(cities, bgImage) {
    renderCanvas(cities, bgImage);
    Load_getInstance().loadCitiesWeather_a424vt$(cities);
    window.setInterval(startRendering$lambda(cities, bgImage), 30000000);
  }
  function toCelcius(kelvin) {
    if (kelvin != null) {
      return roundToInt(toDouble(kelvin) - 273.15).toString();
    } else {
      return '';
    }
  }
  function isWithinCityBoundingBox(x, y, city) {
    var margin = 30;
    var cityX = city.x + mapOriginX - city.textWidthInPixels / 2;
    var cityY = city.y + mapOriginY + margin;
    if (x >= cityX && x <= cityX + city.textWidthInPixels + margin) {
      if (y >= cityY && y <= cityY + city.textHeightInPixels + margin * 1.5) {
        return true;
      }}return false;
  }
  function main$lambda(closure$cities, closure$bgImage) {
    return function (it) {
      startRendering(closure$cities.v, closure$bgImage.v);
      return Unit;
    };
  }
  function main$lambda_0(closure$cities) {
    return function (mouseEvent) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10, tmp$_11, tmp$_12, tmp$_13, tmp$_14, tmp$_15, tmp$_16, tmp$_17, tmp$_18;
      tmp$ = closure$cities.v.iterator();
      while (tmp$.hasNext()) {
        var city = tmp$.next();
        if (isWithinCityBoundingBox(mouseEvent.pageX, mouseEvent.pageY, city)) {
          tmp$_3 = 'Prognoza pogody dla ' + city.name + '\n' + 'Temperatura: ';
          tmp$_2 = toCelcius((tmp$_1 = (tmp$_0 = city.weather) != null ? tmp$_0.main : null) != null ? tmp$_1.temp : null);
          tmp$_6 = toCelcius((tmp$_5 = (tmp$_4 = city.weather) != null ? tmp$_4.main : null) != null ? tmp$_5.feels_like : null);
          tmp$_9 = toCelcius((tmp$_8 = (tmp$_7 = city.weather) != null ? tmp$_7.main : null) != null ? tmp$_8.temp_min : null);
          tmp$_12 = toCelcius((tmp$_11 = (tmp$_10 = city.weather) != null ? tmp$_10.main : null) != null ? tmp$_11.temp_max : null);
          tmp$_15 = (tmp$_14 = (tmp$_13 = city.weather) != null ? tmp$_13.main : null) != null ? tmp$_14.pressure : null;
          tmp$_18 = (tmp$_17 = (tmp$_16 = city.weather) != null ? tmp$_16.main : null) != null ? tmp$_17.humidity : null;
          window.alert(tmp$_3 + tmp$_2 + ' \u2103 \n' + 'Temperatura odczuwalna: ' + tmp$_6 + ' \u2103 \n' + 'Minimalna temperatura: ' + tmp$_9 + ' \u2103 \n' + 'Maksymalna temperatura: ' + tmp$_12 + ' \u2103 \n' + 'Ci\u015Bnienie: ' + tmp$_15 + ' hPa \n' + 'Wilgotno\u015B\u0107:' + tmp$_18 + '%\n');
        }}
      return Unit;
    };
  }
  function main() {
    var cities = {v: ArrayList_init()};
    cities.v.add_11rb$(new City('Warszawa', 542.4, 343.2));
    cities.v.add_11rb$(new City('\u0141\xF3d\u017A', 426.4, 416.0));
    cities.v.add_11rb$(new City('Gda\u0144sk', 351.6, 120.0));
    cities.v.add_11rb$(new City('Szczecin', 79.2, 208.8));
    cities.v.add_11rb$(new City('Bydgoszcz', 340.8, 240.8));
    cities.v.add_11rb$(new City('Gorz\xF3w Wielkopolski', 100.8, 296.0));
    cities.v.add_11rb$(new City('Zielona G\xF3ra', 120.0, 400.0));
    cities.v.add_11rb$(new City('Wroc\u0142aw', 203.2, 476.0));
    cities.v.add_11rb$(new City('Katowice', 392.0, 592.0));
    cities.v.add_11rb$(new City('Krak\xF3w', 476.8, 660.8));
    cities.v.add_11rb$(new City('Rzesz\xF3w', 621.2, 621.6));
    cities.v.add_11rb$(new City('Lublin', 660.0, 490.4));
    cities.v.add_11rb$(new City('Pozna\u0144', 236.0, 340.0));
    cities.v.add_11rb$(new City('Olsztyn', 500.8, 176.0));
    cities.v.add_11rb$(new City('Suwa\u0142ki', 688.4, 144.0));
    cities.v.add_11rb$(new City('Bia\u0142ystok', 692.8, 264.4));
    cities.v.add_11rb$(new City('Opole', 305.2, 513.6));
    cities.v.add_11rb$(new City('Kielce', 520.0, 533.6));
    var bgImage = {v: new Image()};
    bgImage.v.src = 'img/map_white.png';
    bgImage.v.onload = main$lambda(cities, bgImage);
    canvas.onmousedown = main$lambda_0(cities);
  }
  var package$hello = _.hello || (_.hello = {});
  package$hello.City = City;
  Object.defineProperty(package$hello, 'Load', {
    get: Load_getInstance
  });
  package$hello.ResponseObject = ResponseObject;
  package$hello.ResponseCity = ResponseCity;
  package$hello.WeatherEntity = WeatherEntity;
  package$hello.Temperature = Temperature;
  Object.defineProperty(package$hello, 'MAP_WIDTH', {
    get: function () {
      return MAP_WIDTH;
    }
  });
  Object.defineProperty(package$hello, 'MAP_HEIGHT', {
    get: function () {
      return MAP_HEIGHT;
    }
  });
  Object.defineProperty(package$hello, 'mapOriginX', {
    get: function () {
      return mapOriginX;
    },
    set: function (value) {
      mapOriginX = value;
    }
  });
  Object.defineProperty(package$hello, 'mapOriginY', {
    get: function () {
      return mapOriginY;
    },
    set: function (value) {
      mapOriginY = value;
    }
  });
  Object.defineProperty(package$hello, 'canvas', {
    get: function () {
      return canvas;
    }
  });
  package$hello.initializeCanvas = initializeCanvas;
  Object.defineProperty(package$hello, 'context', {
    get: get_context
  });
  Object.defineProperty(package$hello, 'width', {
    get: get_width
  });
  Object.defineProperty(package$hello, 'height', {
    get: get_height
  });
  package$hello.renderBackground_38alav$ = renderBackground;
  package$hello.renderCanvas_eqcfuk$ = renderCanvas;
  package$hello.startRendering_eqcfuk$ = startRendering;
  package$hello.toCelcius_pdl1vj$ = toCelcius;
  package$hello.isWithinCityBoundingBox_x4ovi5$ = isWithinCityBoundingBox;
  package$hello.main = main;
  MAP_WIDTH = 800.0;
  MAP_HEIGHT = 777.6;
  mapOriginX = 0.0;
  mapOriginY = 0.0;
  canvas = initializeCanvas();
  main();
  Kotlin.defineModule('canvas', _);
  return _;
}(typeof canvas === 'undefined' ? {} : canvas, kotlin);
