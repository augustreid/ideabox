var titleInput = document.querySelector(".idea-title-input");
var bodyInput = document.querySelector(".idea-body-input");
var saveButton = document.querySelector(".save-button");
var searchInput = document.querySelector("#searchBar");
var searchButton = document.querySelector(".search-button");
var showStarredButton = document.querySelector(".show-starred-ideas");
var deleteButton = document.querySelector(".delete-button");
var ideaGrid = document.querySelector("#ideaGrid");
var ideaCard = document.querySelector('#ideaCard');
var ideaCardTop = document.querySelector('#ideaCardTop');
var whiteStarButton = document.querySelector('#whiteStar')
var redStarButton = document.querySelector('#redStar')
var ideas = [];

saveButton.addEventListener('click', addIdeas)
titleInput.addEventListener('keyup', enableButton)
bodyInput.addEventListener('keyup', enableButton)
ideaGrid.addEventListener("click", checkStarId);
ideaGrid.addEventListener('click', deleteAndRender)
window.addEventListener("load", loadCards);



function deleteAndRender() {
  deleteCard();
  render();
}

function addIdeas() {
  createIdea()
  clearOnSave()
  render()
  disableButton()
}

function createIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  ideas.push(newIdea);
  newIdea.saveToStorage();
}

function clearOnSave() {
  titleInput.value = "";
  bodyInput.value = "";
}

function enableButton() {
  if (titleInput.value != "" && bodyInput.value != "") {
    saveButton.disabled = false;
  }
}

function deleteCard(event) {
  if (event.target.classList.contains('delete-button')) {
    for (var i = 0; i < ideas.length; i++) {
  if (ideas[i].id === parseInt(event.target.parentNode.parentNode.id)) {
    console.log(ideas[i].id);
    console.log(event.target.parentNode.parentNode.id);
           ideas.splice(i, 1);
         console.log(event.target.parentNode.id)
      }
    }
  }
}

function checkStarId() {
  if (event.target.classList.contains('star-button')){
  var target = event.target;
  var containerId = parseInt(event.target.parentNode.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === containerId) {
    changeStar(ideas[i], target);
      }
    }
  }
}

function changeStar(idea, target) {
  if (idea.isStarred === false) {
    idea.isStarred = true;
    target.src = "assets/star-active.svg";
    target.alt = "Red Star";
    console.log(target.src);
  } else if (idea.isStarred === true) {
    idea.isStarred = false;
    target.src = "assets/star.svg";
    target.alt = "White star";
    console.log(target.src);
  }
}

function loadCards() {
  ideas = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var storedCard = JSON.parse(localStorage.getItem(key));
    var displayedCard = new Idea(storedCard.title, storedCard.body, storedCard.star, storedCard.id);
    ideas.push(displayedCard)
    render();
  }
}


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
  }
}

function disableButton() {
  saveButton.disabled = true;
}
