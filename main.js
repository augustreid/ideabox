var titleInput = document.querySelector(".idea-title-input");
var bodyInput = document.querySelector(".idea-body-input");
var saveButton = document.querySelector(".save-button");
var searchInput = document.querySelector("#searchBar");
var searchButton = document.querySelector(".search-button");
var showStarredButton = document.querySelector(".show-starred-ideas");
var starButton = document.querySelector(".star-button");
var deleteButton = document.querySelector(".delete-button");
var ideaGrid = document.querySelector("#ideaGrid");

var ideas = [];

saveButton.addEventListener('click' , addIdeas)
titleInput.addEventListener('keyup', enableButton)
bodyInput.addEventListener('keyup', enableButton)
window.addEventListener("load", showCards)

function addIdeas() {
createIdea()
clearOnSave()
}

function createIdea (){
var newIdea = new Idea(titleInput.value, bodyInput.value);

  ideas.push(newIdea);
  ideaGrid.innerHTML += `
  <section class="idea-card">
      <div class="idea-card-top dark-purple">
        <img src="assets/star-active.svg" alt="star">
        <img src="assets/delete.svg" alt="delete">
      </div>
      <div class="idea-card-main">
        <h3 class="idea-title bold">${newIdea.title}</h3>
        <p>${newIdea.body}</p>
      </div>
      <button class="comment-button">
        <img class="comment-icon" src="assets/comment.svg" alt="comment">
        <h3 class="bold comment">Comment</h3>
      </button>
    </section>
  `
  console.log("it works")
newIdea.saveToStorage();

}
function saveIdea (){
var stringifiedArray =  JSON.stringify(ideas);
  localStorage.setItem('savedArray', stringifiedArray);
}

function clearOnSave() {
  titleInput.value = "";
  bodyInput.value = "";
}

function enableButton() {
if (titleInput.value != "" && bodyInput.value != ""){
    saveButton.disabled = false;
  }
}

function showCards() {
  var retrievedArray = [];
  for(var i = 0; i < ideas.length; i++) {
    var retrievedIdea = localStorage.getItem(retrievedArray[i])
    var retrievedParsedIdea = JSON.parse(retrievedIdea)
    retrievedArray.push(retrievedParsedIdea)
    ideaGrid.innerHTML += `
    <section class="idea-card">
        <div class="idea-card-top dark-purple">
          <img src="assets/star-active.svg" alt="star">
          <img src="assets/delete.svg" alt="delete">
        </div>
        <div class="idea-card-main">
          <h3 class="idea-title bold">${retrievedArray[i].title}</h3>
          <p>${retrievedArray[i].body}</p>
        </div>
        <button class="comment-button">
          <img class="comment-icon" src="assets/comment.svg" alt="comment">
          <h3 class="bold comment">Comment</h3>
        </button>
      </section>
    `
  } return retrievedArray;
}


//Get item
//Push it into savedArray
