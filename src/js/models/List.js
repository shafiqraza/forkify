import uid from "uniqid"
export default class List {
  constructor () {
    this.items = []
  }

  addItem(qty, unit, ingredient) {
    const item  = {
      id: uid(),
      qty,
      unit,
      ingredient
    }
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(item => item.id === id)
    this.items.splice(index, 1)
  }

  updateQty(id, qty) {
    this.items.find(item => item.id === id).qty = qty
  }
}