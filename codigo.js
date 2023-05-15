import ciudades from "./ciudades.js";

/* if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(mostrarClima, navigatorError, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 5000,
  });
}

function navigatorError(error) {
  console.log(error);
}
 */

let ciudad = "Montevideo";
const apikey_1 = "cc5b3fb29e5be635baf92245e475e7d3";
const apikey_2 = "bf1f8fc72c05dcd3131ca5ac89438eef";
const apikey = apikey_1;

//Elementos
let divClima = document.querySelector("#clima");
let selectCiudad = document.querySelector("#selectCiudad");

let lugares = document.querySelector(".lugares");

//EVENTOS
selectCiudad.addEventListener("change", mostrarClima);

function mostrarClima() {
  let ciudadElegida = selectCiudad.value;
  if (ciudadElegida != "") {
    ciudad = ciudadElegida;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apikey}&units=metric&lang=es`
  )
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
      mostrarDatosClima(datos);

      //---------------------------------------
      let latitud = datos.coord.lat;
      let longitud = datos.coord.lon;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${longitud}&exclude=hourly&units=metric&lang=es&appid=${apikey}`
      )
        .then((respuesta) => respuesta.json())
        .then((datosPronostico) => {
          console.log(datosPronostico);
        });
    });
}

function mostrarDatosClima(d) {
  let tempMax = Math.round(d.main.temp_max);
  let tempMin = Math.round(d.main.temp_min);
  let horaPuestaSol = new Date(d.sys.sunset * 1000);
  let horaSalidaSol = new Date(d.sys.sunrise * 1000);
  let hora = horaPuestaSol.getHours().toString().padStart(2, "0");
  let hora2 = horaSalidaSol.getHours().toString().padStart(2, "0");
  let minutos = horaPuestaSol.getMinutes().toString().padStart(2, "0");
  let minutos2 = horaSalidaSol.getMinutes().toString().padStart(2, "0");
  let puestaSol = `${hora}:${minutos}`;
  let salidaSol = `${hora2}:${minutos2}`;
  let descriptionPrimera = d.weather[0].description.charAt().toUpperCase();
  let descriptionResto = d.weather[0].description.slice(1);
  let icon = d.weather[0].icon;
  
  
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const dias_semana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const fecha = new Date(); 
  mostrarVisitar(d);

  divClima.innerHTML = `<h1 class="fw-light text-white mb-4">Clima de hoy ${(dias_semana[fecha.getDay()] + ' ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear())} en ${ciudad}</h1>
  <img src="iconos/${icon}.png">
    <h3 class="fw-light text-white">${descriptionPrimera}${descriptionResto}</h3>
    
  <div class="row py-lg-5">
    <div class="card col-lg-6 col-md-8 mx-auto" style="width: 40%;">
      <div class="card-body">
        <h5 class="card-title"><img src="iconos/sunset.png"></h5>
        <h6 class="card-subtitle mb-2 lead text-muted">Hora de puesta del sol: ${puestaSol}</h6>
      </div>
    </div>
    
    <div class="card col-lg-6 col-md-8 mx-auto" style="width: 40%;">
      <div class="card-body">
        <h5 class="card-title"><img src="iconos/sunrise.png"></h5>
        <h6 class="card-subtitle mb-2 lead text-muted">Hora de salida del sol: ${salidaSol}</h6>
      </div>
    </div>
  </div>  

    <p class="lead text-white">Temperatura minima ${tempMin}°</p>
    <p class="lead text-white">Temperatura maxima ${tempMax}°</p>`;
}

function mostrarVisitar(i) {
  lugares.innerHTML = "";
  let icon = i.weather[0].icon;

  console.log(ciudades);
  let ciudadVisitar = ciudades.find((e) => e.nombre === i.name);
  if (
    icon === "01d" ||
    icon === "02d" ||
    icon === "03d" ||
    icon === "01n" ||
    icon === "02n" ||
    icon === "03n"
  ) {
    ciudadVisitar.soleado.forEach((i) => {
      lugares.innerHTML += `
    <div class="col">
        <div class="card shadow-sm">
            <img src="${i.img}" class="bd-placeholder-img card-img-top" alt="${i.lugar}"
                width="100%" height="225" preserveAspectRatio="xMidYMid slice" focusable="false">
            <div class="card-body">
                <h5 class="card-title">${i.lugar}</h5>
                <p class="card-text">${i.descripcion}</p>
                <a href="${i.verMas}" class="btn btn-primary"  target="_blank">Ver
                    más
                    info</a>
                <a href="${i.review}"
                    class="btn btn-primary"  target="_blank">Review</a>
            </div>
        </div>
    </div>`;
    });
  } else if (
    icon === "04d" ||
    icon === "04n" ||
    icon === "09d" ||
    icon === "09n" ||
    icon === "10d" ||
    icon === "10n" ||
    icon === "50d" ||
    icon === "50n"
  ) {
    ciudadVisitar.lluvioso.forEach((i) => {
      lugares.innerHTML += `
     
    <div class="col">
        <div class="card shadow-sm">
            <img src="${i.img}" class="bd-placeholder-img card-img-top" alt="${i.lugar}"
                width="100%" height="225" preserveAspectRatio="xMidYMid slice" focusable="false">
            <div class="card-body">
                <h5 class="card-title">${i.lugar}</h5>
                <p class="card-text">${i.descripcion}</p>
                <a href="${i.verMas}" class="btn btn-primary target="_blank">Ver
                    más
                    info</a>
                <a href="${i.review}"
                    class="btn btn-primary" target="_blank">Review</a>
            </div>
        </div>
    </div>`;
    });
  } else {
    lugares.innerHTML += `<h1 class="fw-light">Puede que haya una gran tormenta hoy. Te recomendamos quedarte en un lugar seguro!</h1>`;
  }
}
