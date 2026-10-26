
import {
  getUserProfile,
  watchGroceries,
  watchExpenses,
  watchIncome,
  formatTaka
} from "./firebase.js";

export const DashboardAPI = {
  getProfile: () => getUserProfile(),

  getGroceries: (callback, onError) =>
    watchGroceries(callback, onError),

  getExpenses: (callback, onError) =>
    watchExpenses(callback, onError),

  getIncome: (callback, onError) =>
    watchIncome(callback, onError),

  formatMoney: (amount) => formatTaka(amount)
};
