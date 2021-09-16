
class Idea {
  constructor(title, body) {
    this.title = title; //string
    this.body = body; //string
    this.starred = false;
    this.id = Date.now();

  }
  saveToStorage() {
    //save new card to local data
    //localStorage.setItem('objectId', JSON.stringify(object));
  }
  deleteFromStorage() {
    //search local storage for an idea card (by id?)
    //delete existing card from local data
  }
  updateIdea() {
    //search local storage for an idea card (by id?)
    //edit properties of idea card
  }
}

//retrieve var card = JSON.parse(localStorage.getItem('objectId'));
