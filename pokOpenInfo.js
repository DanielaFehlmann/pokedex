/**
 * function to open the infos by clicking on the "About"-button
 */
function openAbout() {
  document.getElementById('about').classList.remove('d-none');
  document.getElementById('baseStats').classList.add('d-none');
  document.getElementById('moves').classList.add('d-none');
  document.getElementById('buttonAbout').classList.add('buttonSelected');
  document.getElementById('buttonStats').classList.remove('buttonSelected');
  document.getElementById('buttonMoves').classList.remove('buttonSelected');
  document.getElementById('selectionBarFilled').style.width='50px';
  document.getElementById('selectionBarFilled').style.left='0';
}


/**
 * function to show the base-infos about the pokemon
 * 
 * @param {number} i - number to get the correct pokemon
 */
function showAbout(i) {
  document.getElementById('pokemonAbilities').innerHTML = '';
  document.getElementById('pokemonBaseExperience').innerHTML = allPokemons[i]['base_experience'];
  document.getElementById('pokemonHeight').innerHTML = allPokemons[i]['height'];
  document.getElementById('pokemonWeight').innerHTML = allPokemons[i]['weight'];
  showAbilities(i);
}


/**
 * function to show all abilities the pokemon has
 * 
 * @param {number} i - number to get the correct pokemon
 */
function showAbilities(i) {
  let abilities = allPokemons[i]['abilities'];
  for (let x = 0; x < abilities.length; x++) {
    let ability = abilities[x]['ability']['name'];
    if (x == abilities.length - 1) {
      document.getElementById('pokemonAbilities').innerHTML += ability;
    } else {
      document.getElementById('pokemonAbilities').innerHTML += ability + ', ';
    }
  }
}


/**
 * function to open the infos by clicking on the "Base Stats"-button
 */
function openStats() {
  document.getElementById('about').classList.add('d-none');
  document.getElementById('baseStats').classList.remove('d-none');
  document.getElementById('moves').classList.add('d-none');
  document.getElementById('buttonStats').classList.add('buttonSelected');
  document.getElementById('buttonAbout').classList.remove('buttonSelected');
  document.getElementById('buttonMoves').classList.remove('buttonSelected');
  document.getElementById('selectionBarFilled').style.width='80px';
  document.getElementById('selectionBarFilled').style.left='calc(50% - 43px)';
}

/**
 * function to show the stats of the pokemon
 * 
 * @param {number} i - number to get the correct pokemon
 */
function showStats(i) {
  let stats = allPokemons[i]['stats'];
  document.getElementById('stats').innerHTML = '';
  for (let x = 0; x < stats.length; x++) {
    let stat = stats[x]['stat']['name'];
    let statUpperCase = stat.charAt(0).toUpperCase() + stat.slice(1); //1. Buchstabe wird groß
    let value = stats[x]['base_stat'];
    document.getElementById('stats').innerHTML += showStatsHTML (statUpperCase, value, x);
    changeBarColor(statUpperCase, x);
  }
}


/**
 * function to show the stats of the pokemon
 * 
 * @param {String} statUpperCase - name of pokemon changed, that the name begins with an uppercase letter
 * @param {number} value - value of a pokemons' base stat
 * @param {number} x - number to get the correct base stat 
 */
function showStatsHTML (statUpperCase, value, x) {
  return `
  <tr>
    <td class="tableHeadings">${statUpperCase}</td>
    <td>${value}</td>
    <td><div class="progressBar"><div id="progressBarFilled${x}" class="progressBarFilled" style="width: calc(${value}*0.6078px);"></div></div></td>
  </tr>
`;
}


/**
 * function to change the color of the base stats "Attack", "Special-attack" and "Special-defense" to green
 * 
 * @param {String} statUpperCase - name of pokemon changed, that the name begins with an uppercase letter
 * @param {number} x - number to get the correct base stat
 */
function changeBarColor (statUpperCase, x) {
  if (statUpperCase == 'Attack' || statUpperCase == 'Special-attack' || statUpperCase == 'Special-defense') {
    document.getElementById('progressBarFilled' + x).style.backgroundColor = 'rgb(122,199,76)'; //Änderung zu bg-color green
  }
}


/**
 * function to open the infos by clicking on the "Moves"-button
 */
function openMoves() {
  document.getElementById('about').classList.add('d-none');
  document.getElementById('baseStats').classList.add('d-none');
  document.getElementById('moves').classList.remove('d-none');
  document.getElementById('buttonMoves').classList.add('buttonSelected');
  document.getElementById('buttonStats').classList.remove('buttonSelected');
  document.getElementById('buttonAbout').classList.remove('buttonSelected');
  document.getElementById('selectionBarFilled').style.width='50px';
  document.getElementById('selectionBarFilled').style.left='calc(100% - 50px)';
}


/**
 * function to sort and show the moves of the pokemon
 * 
 * @param {number} i - number to get the correct pokemon
 */
function showMoves(i) {
  let moves = allPokemons[i]['moves'];
  document.getElementById('move').innerHTML= '';
  movesSorted = [];
  for (let i = 0; i < moves.length; i++) {
    let move = moves[i]['move']['name'];
   movesSorted.push(move + ' '); 
  }
  movesSorted.sort();
  showSortedMoves(movesSorted);
}


/**
 * function to show the sorted moves of the pokemon
 * 
 * @param {array} movesSorted - contains all moves sorted alphabetically
 */
function showSortedMoves(movesSorted) {
  for (let x = 0; x < movesSorted.length; x++) {
    let moveSorted = movesSorted[x];
    document.getElementById('move').innerHTML+= `<li>${moveSorted}</li>`;
  }
}