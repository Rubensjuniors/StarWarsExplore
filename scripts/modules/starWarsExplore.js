import { emitter } from "./eventEmitter.js";

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

      this.reset()
      this.#dataLoaded = data?.results ?? [];
      this.#previousPage = data?.previous ?? false;
      this.#nextPage = data?.next ?? false;
      this.#total = data?.count ?? 0;
    } catch (err) {
      console.error(`Erro ao buscar dados de ${endpoint}: ${err.message}`);
    }
  }

  async fetchPeople(page = 1) {
    emitter.emit('message', 'fetch people is completed')
    await this.fetchData("people", page);
  }
  async fetchPlanets(page = 1) {
    emitter.emit('message', 'fetch planets is completed')
    await this.fetchData("planets", page);
  }
  async fetchStarships(page = 1) {
    emitter.emit('message', 'fetch starships is completed')
    await this.fetchData("starships", page);
  }

  getLoadedItems() {
    emitter.emit('message', 'get loadedItems')
    return this.#dataLoaded;
  }

  getNextPage() {
    emitter.emit('message', 'get nextPage')
    return this.#nextPage
  }

  getPreviousPage() {
    emitter.emit('message', 'get previousPage')
    return this.#previousPage
  }

  getTotal() {
    emitter.emit('message', 'get total')
    return this.#total
  }

  getSearchItem() {
    return this.#searchItems
  }

  search(name) {
    const filtered = this.getLoadedItems().filter(item => item?.name === name);
    this.#searchItems = filtered;

    emitter.emit('message', `search: ${name}`)
  }

}

export const starWarsExplore = new StarWarsExplore();
