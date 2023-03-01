let heart;


/**
 * function to open the pokemon by clicking on it
 * 
 * @param {number} i - number to open the correct pokemon
 */
function openPokemon (i) {
  document.getElementById('pokedex-bg').classList.remove('d-none');
  document.getElementById('body').style.overflow='hidden';
  renderPokemonInfo(i);
}


/**
 * function to show all informations of the pokemon
 * 
 * @param {number} i - number to open the correct pokemon
 */
function renderPokemonInfo(i) {
  let pokemon = allPokemons[i];
  let nameUpperCase = pokemon['name'].charAt(0).toUpperCase() + allPokemons[i]['name'].slice(1); //1
  let types = pokemon['types'];
  let firstType = types[0]['type']['name'];
  numberCorrection(pokemon);
  changeHeart(i);
  showIcons (i);
  document.getElementById('pokemonName').innerHTML = nameUpperCase;
  document.getElementById('pokemonNumber').innerHTML = number;
  showTypesOpened(types);
  document.getElementById('pokemonImage').src = `${pokemon['sprites']['other']['official-artwork']['front_default']}`;
  changeBgColorOpened(firstType);
  showInfos(i);
}


/**
 * function to check if the pokemon is liked and to change the heart
 * 
 * @param {number} i - number to change the heart of the correct pokemon
 */
function changeHeart(i) {
  heart = 'img/heart.svg';
  if (hearts.indexOf(i) > -1) {
    heart = 'img/heart_filled.svg';
  }
}


/**
 * function to show the icons "back" and "like"
 * 
 * @param {number} i - number to like the heart of the correct pokemon
 */
function showIcons (i) {
  document.getElementById('icons').innerHTML= `
  <img src="img/arrow.svg" onclick="closePokemon()">
  <img src=${heart} id="heart${i}" onclick="like(${i})">
  `;
}


/**
 * function to show the types of the pokemon
 * 
 * @param {array} types - contains all types of the pokemon
 */
function showTypesOpened(types) {
  document.getElementById('pokemonTypes').innerHTML = '';
  for (let i = 0; i < types.length; i++) {
    let type = types[i]['type']['name'];
    document.getElementById('pokemonTypes').innerHTML += `<div class="pokemonTypeOpened">${type}</div>`;
  }
}


/**
 * function to show the informations below
 * 
 * @param {number} i - number to show the informations about the correct pokemon
 */
function showInfos(i) {
  showAbout(i);
  showStats(i);
  showMoves(i);
}


/**
 * function to change the background-colors in dependence of the first type which the pokemon has
 * 
 * @param {String} firstType - the first type which the pokemon has
 */
function changeBgColorOpened (firstType) {
  let onePokemon = document.getElementById('pokedex');
  changeBgColor(firstType,onePokemon);
}

/**
 * function to close the opened pokemon
 */
function closePokemon () {
  document.getElementById('pokedex-bg').classList.add('d-none');
  document.getElementById('body').style.overflow='visible';
}

/**
 * function to prevent to close the opened pokemon
 */
function doNotClosePokemon (event) {
  event.stopPropagation();
}


