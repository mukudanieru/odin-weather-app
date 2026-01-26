import "./style.css";
import { weatherSearch, fetchJSON } from "./modules/api";
import { createLocationItem } from "./modules/ui";

const API_KEY = "185f9080f22643cd89d35208262001";

const list = document.querySelector("#suggestions");
const search = document.querySelector("#weatherSearch");
let timeoutID;

function handleSearchInput(e) {
  clearTimeout(timeoutID);

  timeoutID = setTimeout(() => {
    const input = e.target?.value ?? "";

    if (input === "") {
      list.replaceChildren();
      suggestions.classList.remove("open");

      return;
    }

    const url = weatherSearch(API_KEY, input); // For location
    console.log(url);

    fetchJSON(url)
      .then((data) => {
        console.log(data);
        list.replaceChildren();

        if (data.length === 0) {
          suggestions.classList.remove("open");
          return;
        }

        suggestions.classList.add("open");

        data.forEach((item) => {
          const li = createLocationItem(item);
          list.appendChild(li);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, 500);
}

// Search Input Event
search.addEventListener("input", handleSearchInput);

document.addEventListener("click", (e) => {
  console.log(e.target);

  // Implement when clicking outside the wrapper

  // Implement when clicking the button
});
