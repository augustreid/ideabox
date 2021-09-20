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
// ideaGrid.addEventListener("click", deleteAndRender);
ideaGrid.addEventListener("click", checkStarId)

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


function checkStarId() {
  var target = event.target;
  console.log(event.target)
  var containerId = parseInt(event.target.parentNode.parentNode.id);
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === containerId) {
    changeStar(ideas[i], target);
    }
  }
}

function changeStar(idea, target) {
  if (idea.isStarred === false) {
    idea.isStarred = true;
    target.src = "assets/star-active.svg";
    target.alt = "Red Star";
  } else if (idea.isStarred === true) {
    idea.isStarred = false
    target.src = "assets/star.svg";
    target.alt = "White star";
  }
}


function render() {
  ideaGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    ideaGrid.innerHTML += `
    <section class="idea-card" id="${ideas[i].id}">
      <div class="idea-card-top dark-purple" id="ideaCardTop">
        <img src="assets/star.svg" alt="star" id="whiteStar" class="star-button white-star">
        <img src="assets/delete.svg" alt="delete" id="deleteButton" class="delete-button">
        <img src="assets/star-active.svg" alt="red star" id="redStar" class="star-button red-star">
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
