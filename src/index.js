"strict mode";
import "../styles.css";

const DOM = {
  cityNameDOM: document.querySelector(".city-name"),
  temperatureDOM: document.querySelector(".temp"),
  errorMessageDOM: document.querySelector(".error"),

  displayWeather: function (data, unit) {
    this.errorMessageDOM.textContent = "";
    this.cityNameDOM.textContent = data.location.name;
    if (unit === "celcius")
      this.temperatureDOM.textContent = `${data.current.temp_c}°C`;
    else this.temperatureDOM.textContent = `${data.current.temp_f}°F`;
  },

  displayError: function () {
    this.errorMessageDOM.textContent =
      "Please enter the name of an existing city";
  },
};

const WeatherAPI = {
  baseURL:
    "https://api.weatherapi.com/v1/current.json?key=ed7aaa10e35a452280c205506230808&q=",

  getWeatherInfo: async function (query) {
    const fullURL = `${this.baseURL}${query}`;
    const response = await fetch(fullURL);
    const data = await response.json();

    if (Object.hasOwn(data, "error")) return "Invalid Query";
    else return data;
  },
};

// Event Listeners

function activateUI() {
  const searchForm = document.querySelector(".search");

  let unit = "celcius";

  const celcBtn = document.querySelector(".celc");
  const farBtn = document.querySelector(".far");

  celcBtn.addEventListener("click", () => {
    if (unit !== "celcius") {
      farBtn.classList.remove("selected");
      celcBtn.classList.add("selected");
      unit = "celcius";
    }
  });

  farBtn.addEventListener("click", () => {
    if (unit !== "fahrenheit") {
      celcBtn.classList.remove("selected");
      farBtn.classList.add("selected");
      unit = "fahrenheit";
    }
  });

  searchForm.addEventListener("submit", async (e) => {
    // Prevent page from refreshing
    e.preventDefault();

    const searchBar = document.querySelector("#location-input");

    let query = searchBar.value;

    // Make API request with user's query

    const apiResponse = await WeatherAPI.getWeatherInfo(query);

    // Tell the DOM object to the perform the appropriate action

    if (apiResponse === "Invalid Query") DOM.displayError();
    else DOM.displayWeather(apiResponse, unit);
  });
}

document.addEventListener("DOMContentLoaded", activateUI);
