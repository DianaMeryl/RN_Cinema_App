import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FavoritesStore {
  favorites = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }
  async saveFavorites() {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(this.favorites));
    } catch (error) {
      console.error("Error saving favorites", error);
    }
  }

  // Метод для завантаження фільмів з AsyncStorage
  async loadFavorites() {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites);
      }
    } catch (error) {
      console.error("Error loading favorites", error);
    }
  }

  // Додаємо фільм до списку улюблених
  addToFavorites(movie) {
    if (!this.favorites.some((m) => m.id === movie.id)) {
      this.favorites.push(movie);
      this.saveFavorites(); // Зберігаємо в AsyncStorage після зміни
    }
  }

  // Видаляємо фільм з улюблених
  removeFromFavorites(id) {
    this.favorites = this.favorites.filter((m) => m.id !== id);
    this.saveFavorites(); // Зберігаємо в AsyncStorage після зміни
  }

  // Перевіряємо, чи є фільм в списку улюблених
  isFavorite(id) {
    return this.favorites.some((m) => m.id === id);
  }
}

export const favoritesStore = new FavoritesStore();

