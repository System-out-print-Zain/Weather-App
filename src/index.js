"strict mode";
import "../styles.css";
fetch(
  "https://api.weatherapi.com/v1/current.json?key=ed7aaa10e35a452280c205506230808&q=Tokyo"
);

const DOM = {};

const weatherDisplayer = {
  display: function (city, temp) {},
};

// Event Listeners

function ActivateUI() {}

document.addEventListener("DOMContentLoaded", () => {});
