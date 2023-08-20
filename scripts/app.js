const searchForm = document.querySelector(".searchForm");
const details = document.querySelector(".details");
const cardWrapper = document.querySelector(".card-wrapper");
const timeImg = document.querySelector(".timeImg");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
  //   const cityDets = data.cityDets;
  //   const weather = data.weather;
  //   desturcturing
  const { cityDets, weather } = data;

  details.innerHTML = `
        <h3 class="fs-3 mb-2">${cityDets.EnglishName} / ${cityDets.Country.EnglishName}</h3>
        <h3 class="fs-4 mb-2">${cityDets.Region.EnglishName}</h3>
        <p class="card-text fs-6 mb-3 text-white-50">${weather.WeatherText}
        </p>
        
        <div class="deg display-6 fw-semibold mb-3">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

  if (cardWrapper.classList.contains("d-none")) {
    cardWrapper.classList.remove("d-none");
  }

  // SETTING UP DAY/NIGHT IMAGE
  weather.IsDayTime
    ? timeImg.setAttribute("src", "img/day.svg")
    : timeImg.setAttribute("src", "img/night.svg");

  // Weather Icon according to Weather condition
  icon.setAttribute("src", `img/icons/${weather.WeatherIcon}.svg`);
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchForm.city.value.trim();

  // updating city details
  forecast
    .updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => console.log(err.message));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => console.log(err.message));
}
