
class Idea {
  constructor(title, body) {
    this.title = title; //string
    this.body = body; //string
    this.starred = false;
    this.id = Date.now();

  }
  saveToStorage(this) {
    var stringifiedIdea = JSON.stringify(this);
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
