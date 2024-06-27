//Mostrar los datos en el DOM
function showStats(obj) {
  const activities = document.querySelector(".dashboard-activities");
  const cards = obj
    .map((card) => {
      return `
      <article class="card">
        <div class="card-background">
          <div class="card-container">
            <div class="card-content">
              <h4 class="card-title">${card.title}</h4>
              <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div class="card-content">
              <h3 class="card-current">${card.current}hrs</h3>
              <p class="card-previous">${
                card.type === "daily"
                  ? "Yesterday"
                  : card.type === "weekly"
                  ? "Last Week"
                  : "Last Month"
              } - ${card.previous}hrs</p>
            </div>
          </div>
        </div>
      </article>  
    `;
    })
    .join("");
  console.log(obj);
  console.log(cards);
  activities.innerHTML = cards;
}

// Obtener datos del JSON
function getData(type) {
  const url = "../data.json";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const newObj = data.map((el) => ({
        type,
        title: el.title,
        current: el.timeframes[type].current,
        previous: el.timeframes[type].previous,
      }));
      return newObj;
    })
    .then((obj) => showStats(obj));
}

//Event Listener
document.querySelector(".stats").addEventListener("click", (e) => {
  //Llamar a la funcion getData dependiendo el caso
  if (e.target.id === "daily") {
    getData("daily");
  } else if (e.target.id === "weekly") {
    getData("weekly");
  } else if (e.target.id === "monthly") {
    getData("monthly");
  } else {
    return;
  }

  //Quitar y añadir estado active a las estadisticas
  e.currentTarget.querySelectorAll(".stats-item").forEach((li) => {
    li.classList.remove("stats-item--active");
  });
  document.getElementById(e.target.id).classList.add("stats-item--active");
});
