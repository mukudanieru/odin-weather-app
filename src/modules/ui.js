export function createLocationItem(item) {
  const btn = document.createElement("button");
  btn.dataset.id = item.id;
  btn.dataset.url = item.url;
  btn.className = "suggestion-item";

  const title = document.createElement("div");
  title.className = "suggestion-title";
  title.innerHTML = `${item.name}, ${item.region}`;

  btn.appendChild(title);

  const subtitle = document.createElement("div");
  subtitle.className = " suggestion-subtitle";
  subtitle.innerHTML = `${item.country}`;

  btn.appendChild(subtitle);

  return btn;
}
