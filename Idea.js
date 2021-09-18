
class Idea {
  constructor(titleInput, bodyInput) {
    this.title = titleInput;
    this.body = bodyInput;
    this.isStarred = false;
    this.id = Date.now();

  }
  saveToStorage() {
    var saveData = [
      {
      "title": this.title,
      "body": this.body,
      "isStarred": this.isStarred,
      "id": this.id
    }
  ]
    var stringifiedIdea = JSON.stringify(saveData);
    localStorage.setItem(`${this.id}` , stringifiedIdea);
  }
  deleteFromStorage() {
    localStorage.removeItem(`${this.id}`);
  }
  updateIdea() {
    var getItem = localStorage.getItem(`${this.id}`);
    var parsedIdea = JSON.parse(getItem);
    parsedIdea.starred = true;
    //push updatedIdea back into local storage
  }
}

//retrieve var card = JSON.parse(localStorage.getItem('objectId'));
