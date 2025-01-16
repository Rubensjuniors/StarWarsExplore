import { createdCard } from "./modules/createCard.js";
import { emitter } from "./modules/eventEmitter.js";
import { starWarsExplore } from "./modules/starWarsExplore.js";

const radioInputs = document.querySelectorAll('#radio-input')
const searchInput = document.getElementById('search-input')
const divCards = document.querySelector('#cards')
const currentRadio = document.querySelector('#radio-input:checked');
const emptyState = document.getElementById('empty-state');

const endpoints = {
  people: () => starWarsExplore.fetchPeople(),
  planets: () => starWarsExplore.fetchPlanets(),
  starships: () => starWarsExplore.fetchStarships(),
}

function displayItems(items) {
  divCards.innerHTML = '';
  emptyState.classList.add('hidden');

  items.forEach(item => {
    createdCard(item?.name, divCards);
  });
}

async function getData(event) {
  divCards.innerHTML = '';
  searchInput.value = ''

  const fetchData = endpoints[event.target.value];

  if (fetchData) {
    await fetchData();

    displayItems(starWarsExplore.getLoadedItems());
  }
}

radioInputs.forEach(item => {
  item.addEventListener('click', getData)
})

searchInput.addEventListener('input', async event => {
  const value = event.currentTarget.value;
  divCards.innerHTML = '';

  starWarsExplore.search(value);
  const filteredItems = starWarsExplore.getSearchItem();

  if (value.length <= 0) {
    emptyState.classList.add('hidden');
    return getData({ target: currentRadio });
  }

  if (value && filteredItems.length <= 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  return displayItems(filteredItems);
}
)

if (currentRadio) {
  getData({ target: currentRadio });
}

emitter.on('mensagem', (data) => {
  console.log(`Recebido: ${data}`);
})