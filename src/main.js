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
  const button = e.target.closest(".suggestion-item");
  const clickedInsideList = list.contains(e.target);
  const hasSuggestions = list.textContent.trim();

  // Open suggestions when clicking the search input
  if (e.target.id === "weatherSearch" && hasSuggestions) {
    suggestions.classList.add("open");
    return;
  }

  // Handle suggestion selection (click anywhere inside the button)
  if (button && clickedInsideList) {
    suggestions.classList.remove("open");
    // search.value = "";
    console.log(button.dataset.url);
    return;
  }

  // Close suggestions when clicking outside the suggestions list
  if (!clickedInsideList) {
    suggestions.classList.remove("open");
    return;
  }
});
