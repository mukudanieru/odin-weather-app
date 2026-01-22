import "./style.css";

const list = document.querySelector("#location");

function getLocation(data) {
  console.log(data);

  list.replaceChildren();

  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name}, ${item.region} from ${item.country}.`;
    list.appendChild(li);
  });
}

let timeoutID;
const search = document.querySelector("#search-weather");

search.addEventListener("input", (e) => {
  clearTimeout(timeoutID);

  const input = e.target.value;
  const url = `http://api.weatherapi.com/v1/search.json?key=185f9080f22643cd89d35208262001&q=${input}`;

  timeoutID = setTimeout(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        getLocation(data);
      })
      .catch((err) => {
        console.error(err);
        list.replaceChildren();

        const li = document.createElement("li");
        li.textContent = "No location found.";
        list.appendChild(li);
      });
  }, 500);
});
