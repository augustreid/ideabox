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

function addIdeas() {
createIdea()
}

function createIdea (){
  var newIdea = {
    title: titleInput.value,
    body: bodyInput.value,
  }
  var instancedIdea = new Idea(newIdea);
  ideas.push(instancedIdea);
  ideaGrid.innerHTML += `
  <section class="idea-card">
      <div class="idea-card-top dark-purple">
        <img src="assets/star-active.svg" alt="star">
        <img src="assets/delete.svg" alt="delete">
      </div>
      <div class="idea-card-main">
        <h3 class="idea-title bold">${instancedIdea.title}</h3>
        <p>${instancedIdea.body}</p>
      </div>
      <button class="comment-button">
        <img class="comment-icon" src="assets/comment.svg" alt="comment">
        <h3 class="bold comment">Comment</h3>
      </button>
    </section>
  `
  console.log("it works")
  saveToStorage(instancedIdea);

}
function saveIdea (){
var stringifiedArray =  JSON.stringify(ideas);
  localStorage.setItem('savedArray', stringifiedArray);
}
