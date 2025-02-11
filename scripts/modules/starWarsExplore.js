import { eventEmitter } from "./eventEmitter.js";

class StarWarsExplore {
  #dataLoaded
  #previousPage
  #nextPage
  #total
  #searchItems

  constructor() {
    this.#searchItems = [];
    this.#dataLoaded = [];
    this.#previousPage = false;
    this.#nextPage = false;
    this.#total = 0;
  }

  reset() {
    this.#dataLoaded = [];
    this.#previousPage = false;
    this.#nextPage = false;
    this.#total = 0;
  }

  async fetchData(path, page = 1) {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/${path}?page=${page}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      this.reset();
      this.#dataLoaded = data?.results ?? [];
      this.#previousPage = data?.previous ?? false;
      this.#nextPage = data?.next ?? false;
      this.#total = data?.count ?? 0;

      eventEmitter.emit("dataLoaded", {
        path,
        page,
        total: this.#total,
        data: this.#dataLoaded
      });

    } catch (err) {
      console.error(`Erro ao buscar dados de ${path}: ${err.message}`);

      eventEmitter.emit("fetchError", {
        path,
        page,
        error: err.message
      });
    }
  }

  async fetchPeople(page = 1) {
    await this.fetchData("people", page);
  }
  async fetchPlanets(page = 1) {
    await this.fetchData("planets", page);
  }
  async fetchStarships(page = 1) {
    await this.fetchData("starships", page);
  }

  getLoadedItems() {
    return this.#dataLoaded;
  }

  getNextPage() {
    return this.#nextPage;
  }

  getPreviousPage() {
    return this.#previousPage;
  }

  getTotal() {
    return this.#total;
  }

  getSearchItem() {
    return this.#searchItems;
  }

  search(name) {
    const filtered = this.getLoadedItems().filter(item => item?.name === name);
    this.#searchItems = filtered;

    eventEmitter.emit("searchPerformed", {
      name,
      results: filtered
    });
  }
}

export const starWarsExplore = new StarWarsExplore();
