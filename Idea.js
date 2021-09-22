
class Idea {
  constructor(titleInput, bodyInput) {
    this.title = titleInput;
    this.body = bodyInput;
    this.isStarred = false;
    this.id = Date.now();
  };
  saveToStorage() {
    var stringifiedIdea = JSON.stringify(this);
    localStorage.setItem(`${this.id}`, stringifiedIdea);
  };
  updateIdea() {
    var getItem = localStorage.getItem(`${this.id}`);
    var parsedIdea = JSON.parse(getItem);
    parsedIdea.starred = true;
  };
};
