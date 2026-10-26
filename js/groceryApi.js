
import {
  watchGroceries,
  addGrocery,
  updateGrocery,
  deleteGrocery
} from "./firebase.js";

export const GroceryAPI = {
  getAll: (callback, onError) =>
    watchGroceries(callback, onError),

  add: (name, price = 0, date) =>
    addGrocery({ name, price, date }),

  update: (id, changes) =>
    updateGrocery(id, changes),

  delete: (id) =>
    deleteGrocery(id)
};
