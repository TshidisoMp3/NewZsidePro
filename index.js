const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

//Country were we fetch
const country = "za";

const options = [
   "general",
   "sports",
   "entertainment",
   "technology"
]

let requestURL;

const generateUI = (articles) => {
  for (let item of articles){
    let card = document.createElement("div");
    //card.cardList.add("news-card");
    card.innerHTML = `<div class = "news-image-container">
    <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
      container.appendChild(card);
  }
};

const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
      alert("Data unavailable at the moment. Please try again later");
      return false;
    }
    let data = await response.json();
    generateUI(data.articles);
  };

  const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
      element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=za&apiKey=9bdd6592910f4b8688accfa376cf9537`;
    e.target.classList.add("active");
    getNews();
  };

  const createOptions = () => {
    for (let i of options) {
      optionsContainer.innerHTML += `<button class="option ${
        i == "general" ? "active" : ""
      }" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
  };

  const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
  };

  window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=za&apiKey=9bdd6592910f4b8688accfa376cf9537`;
    init();
  };
  