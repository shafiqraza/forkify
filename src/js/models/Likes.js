export default class Likes {
  constructor() {
    this.likes = []
  }

  addLike(id, title, publisher, img) {
    const like = {id, title, publisher, img};
    this.likes.push(like);
    this.updateStorage();
    return like;
  }

  removeLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
    this.updateStorage();
  }
  
  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  likesLength() {
    return this.likes.length;
  }

  updateStorage() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const data = JSON.parse(localStorage.getItem('likes'))
    if(data) this.likes = data;
  }
}