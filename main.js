var saveButton = document.querySelector(".save-button");
var showStarredButton = document.querySelector(".show-starred-ideas");
var searchButton = document.querySelector(".search-button");
var deleteButton = document.querySelector(".delete-button");
var whiteStarButton = document.querySelector('#whiteStar')
var redStarButton = document.querySelector('#redStar')
var titleInput = document.querySelector(".idea-title-input");
var bodyInput = document.querySelector(".idea-body-input");
var searchInput = document.querySelector("#searchBar");
var ideaGrid = document.querySelector("#ideaGrid");
var ideaCard = document.querySelector('#ideaCard');
var ideaCardTop = document.querySelector('#ideaCardTop');

var ideas = [];

window.addEventListener("load", loadCards);
saveButton.addEventListener('click', addIdeas)
titleInput.addEventListener('keyup', enableButton)
bodyInput.addEventListener('keyup', enableButton)
ideaGrid.addEventListener("click", favoriteAndDeleteCard)
window.addEventListener("load", loadCards);

function addIdeas() {
  createIdea();
  clearOnSave();
  render();
  disableButton();
};

function createIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  ideas.push(newIdea);
  newIdea.saveToStorage();
};

function clearOnSave() {
  titleInput.value = "";
  bodyInput.value = "";
};

function enableButton() {
  if (titleInput.value != "" && bodyInput.value != "") {
    saveButton.disabled = false;
  };
};

function disableButton() {
  saveButton.disabled = true;
};

function favoriteAndDeleteCard(event) {
  if (event.target.classList.contains('star-button')) {
    checkStarId(event);
  }
  if (event.target.classList.contains('delete-button')) {
    deleteAndRender();
  };
};

function deleteCard() {
  for (var i = 0; i < ideas.length; i++) {
  if (ideas[i].id === parseInt(event.target.parentNode.parentNode.id)) {
           ideas.splice(i, 1);
      };
    };
  };

  function deleteAndRender() {
    deleteCard();
    render();
  };

function checkStarId(event) {
  var target = event.target;
  var containerId = parseInt(event.target.parentNode.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === containerId) {
    changeStar(ideas[i], target);
      };
    };
  };

function changeStar(idea, target) {
  if (idea.isStarred === false) {
    idea.isStarred = true;
    target.src = "assets/star-active.svg";
    target.alt = "Red Star";
  } else if (idea.isStarred === true) {
    idea.isStarred = false;
    target.src = "assets/star.svg";
    target.alt = "White star";
  };
};

function loadCards() {
  ideas = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var storedCard = JSON.parse(localStorage.getItem(key));
    var displayedCard = new Idea(storedCard.title, storedCard.body, storedCard.star, storedCard.id);
    ideas.push(displayedCard)
    render();
  };
};

function render() {
  ideaGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    ideaGrid.innerHTML += `
    <section class="idea-card" id="${ideas[i].id}">
      <div class="idea-card-top dark-purple" id="ideaCardTop">
        <img src="assets/star.svg" alt="White star" class="star-button">
        <img src="assets/delete.svg" alt="delete" id="deleteButton" class="delete-button">
      </div>
      <div class="idea-card-main">
        <h3 class="idea-title bold">${ideas[i].title}</h3>
        <p>${ideas[i].body} </p>
      </div>
      <button class="comment-button">
        <img class="comment-icon" src="assets/comment.svg" alt="comment">
        <h3 class="bold comment">Comment</h3>
      </button>
    </section>`
  };
};
