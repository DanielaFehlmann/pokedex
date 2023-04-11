let movesSorted = [];
let allPokemons=[];
let start = 0;
let limit = 20;
let number;
let hearts = [];


/**
 * function to load 20 pokemons
 */
async function loadPokemon() {
  document.getElementById('loadingScreen').classList.remove('d-none');
  dNone();
  load();
  for (let i = start; i < limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
    let response = await fetch(url);
    allPokemons.push(await response.json());
    let pokemon = allPokemons[i];
    renderAllPokemons(pokemon,i);
  }
  document.getElementById('loadingScreen').classList.add('d-none');
  start += 20;
  limit += 20;
}


/**
 * function to add and remove "display: none"
 */
function dNone () {
  document.getElementById('refresh').classList.add('d-none');
  document.getElementById('buttonLoadMore').classList.remove('d-none');
}


/**
 * function to show all loaded pokemons
 * 
 * @param {json} pokemon - contains all informations about the pokemon
 * @param {number} i - number to get the correct ID
 */
function renderAllPokemons (pokemon,i) {
  let nameUpperCase = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
  let id2 = 'pokemonTypesSmall'+i;
  let id1 = 'onePokemon'+i;
  let types = pokemon['types'];
  let firstType = types[0]['type']['name'];
  numberCorrection(pokemon);
  document.getElementById('allPokemons').innerHTML+= showPokedex(i,id1,id2,nameUpperCase,number,pokemon);
  showTypes (types,id2);
  changeBgColorPokedex(firstType, id1);
}


/**
 * function to change the format of the pokemon-number
 * 
 * @param {json} pokemon - contains all informations about the pokemon
 */
function numberCorrection (pokemon){
  number = pokemon['id'];
  if (number < 10) {
    number = '#00'+pokemon['id'];
  } else if (number < 100) {
    number = '#0'+pokemon['id'];
  } else if (number < 1000) {
    number = '#'+pokemon['id'];
  };
}


/**
 * function to show the pokemon on the page
 * 
 * @param {number} i - number to get the correct pokemon
 * @param {String} id1 - ID of the pokemon
 * @param {String} id2 - ID of the pokemon-types
 * @param {String} nameUpperCase - name of pokemon changed, that the name begins with an uppercase letter
 * @param {number} number - number of the pokemon
 * @param {json} pokemon - contains all informations about the pokemon
 */
function showPokedex(i,id1,id2,nameUpperCase,number,pokemon) {
  return `
  <div id='${id1}' class="onePokemon" onclick="openPokemon(${i})">
    <div>
      <h2>${nameUpperCase}</h2>
      <div id='${id2}' class="under"></div>
    </div>
    <div class="right">
      <span>${number}</span>
      <img src="${pokemon['sprites']['other']['official-artwork']['front_default']}" class="pokedexImage">
    </div>
  </div>
  `;
}


/**
 * function to show the types of the pokemon
 * 
 * @param {array} types - contains the types of the pokemon
 * @param {String} id2 - ID of the pokemon-types
 */
function showTypes (types,id2) {
  for (let x = 0; x < types.length; x++) {
    let type = types[x]['type']['name'];
    document.getElementById(id2).innerHTML += `<span class="pokemonType">${type}</span>`;
  }
}


/**
 * function to change the background-colors in dependence of the first type which the pokemon has
 * 
 * @param {String} firstType - the first type which the pokemon has
 * @param {String} id1 - ID of the pokemon
 */
function changeBgColorPokedex (firstType, id1) {
  let onePokemon= document.getElementById(id1);
  changeBgColor(firstType, onePokemon);
}


/**
 * function to change the background-colors in dependence of the first type which the pokemon has
 * 
 * @param {String} firstType - the first type which the pokemon has
 * @param {*} onePokemon - one pokemon
 */
function changeBgColor (firstType, onePokemon) {
  if (firstType == 'water') onePokemon.style.backgroundColor='#6390f0';
  else if (firstType == 'grass') onePokemon.style.backgroundColor='#7ac74c';
  else if (firstType == 'fire') onePokemon.style.backgroundColor='#EE8130';
  else if (firstType == 'bug') onePokemon.style.backgroundColor='#A6B91A';
  else if (firstType == 'poison') onePokemon.style.backgroundColor='#A33EA1';
  else if (firstType == 'electric') onePokemon.style.backgroundColor='#F7D02C';
  else if (firstType == 'fairy') onePokemon.style.backgroundColor='#D685AD';
  else if (firstType == 'normal') onePokemon.style.backgroundColor='#A8A77A';
  else if (firstType == 'ground') onePokemon.style.backgroundColor='#E2BF65';
  else if (firstType == 'fighting') onePokemon.style.backgroundColor='#C22E28';
  else if (firstType == 'psychic') onePokemon.style.backgroundColor='#F95587';
  else if (firstType == 'rock') onePokemon.style.backgroundColor='#B6A136';
  else if (firstType == 'ghost') onePokemon.style.backgroundColor='#735797';
  else if (firstType == 'ice') onePokemon.style.backgroundColor='#96D9D6';
  else if (firstType == 'dragon') onePokemon.style.backgroundColor='#6F35FC';
  else if (firstType == 'dark') onePokemon.style.backgroundColor='#705746';
  else if (firstType == 'steel') onePokemon.style.backgroundColor='#B7B7CE';
}

/**
 * function to go back to the pokedex by clicking on the heading
 */
function backToPokedex () {
  dNone();
  for (let i = 0; i < allPokemons.length; i++) {
    document.getElementById('onePokemon'+i).classList.remove('d-none'); 
  }
}




