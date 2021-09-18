var titleInput = document.querySelector(".idea-title-input");
var bodyInput = document.querySelector(".idea-body-input");
var saveButton = document.querySelector(".save-button");
var searchInput = document.querySelector("#searchBar");
var searchButton = document.querySelector(".search-button");
var showStarredButton = document.querySelector(".show-starred-ideas");
var whiteStarButton = document.querySelector("#whiteStar");
var redStarButton = document.querySelector("#redStar")
var deleteButton = document.querySelector(".delete-button");
var ideaGrid = document.querySelector("#ideaGrid");
var ideaCard = document.querySelector('#ideaCard');
var ideaCardTop = document.querySelector('#ideaCardTop');
var ideas = [];

saveButton.addEventListener('click', addIdeas)
titleInput.addEventListener('keyup', enableButton)
bodyInput.addEventListener('keyup', enableButton)
ideaGrid.addEventListener("click", deleteAndRender);
whiteStarButton.addEventListener("click", favoriteCard)

function deleteAndRender() {
  deleteCard()
  render()
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

function saveIdea() {
  var stringifiedArray = JSON.stringify(ideas);
  localStorage.setItem('savedArray', stringifiedArray);
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

function deleteCard() {
  if (event.target.classList.contains('delete-button')) {
    for (var i = 0; i < ideas.length; i++) {
   (ideas[i].id === parseInt(event.target.parentNode.id))
         ideas.splice(i, 1)
    }
  }
}


//Make the star clickable (x)
// When star clicked
  //Update targeted card id (starred=true)
  //When starred===true
  //replace star with activeStar

function favoriteCard() {
  if (event.target.parentNode.parentNode.isStarred === false) {
    whiteStarButton.classList.replace('whiteStarButton', 'redStarButton')
  }
}



function render() {
  ideaGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    ideaGrid.innerHTML += `
    <section class="idea-card" id="${ideas[i].id}">
      <div class="idea-card-top dark-purple" id="ideaCardTop">
        <img src="assets/star.svg" alt="star" id="whiteStar" class="white-star">
        <img src="assets/delete.svg" alt="delete" id="deleteButton" class="delete-button">
        <img src="assets/star-active.svg" alt="red star" id="redStar" class="red-star">
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
