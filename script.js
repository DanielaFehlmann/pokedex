let currentPokemon;
let movesSorted = [];
let pokemons = ['bulbasaur', 'ivysaur','venusaur','charmander','charmeleon','charizard',
'squirtle','wartortle','blastoise','caterpie','metapod','butterfree','weedle','kakuna','beedrill',
'pidgey','pidgeotto','pidgeot','rattata','raticate','spearow','fearow','ekans','arbok','pikachu',
'raichu','sandshrew','sandslash','nidorina','nidoqueen','nidoking','clefairy','clefable','vulpix',
'ninetales','jigglypuff','wigglytuff','zubat','golbat','oddish','gloom','vileplume','paras','parasect',
'venonat','venomoth','diglett','dugtrio','meowth','persian','psyduck','golduck','mankey','primeape',
'growlithe','arcanine','poliwag','poliwhirl','poliwrath','abra','kadabra','alakazam','machop','machoke',
'machamp','bellsprout','weepinbell','victreebel','tentacool','tentacruel','geodude','graveler','golem',
'ponyta','rapidash','slowpoke','slowbro','magnemite','magneton','doduo','dodrio','seel','dewgong','grimer','muk','shellder','cloyster','gastly','haunter','gengar','onix','drowzee','hypno','krabby','kingler'];

let allPokemons=[];
let hearts = [];


async function loadPokemon() {
  document.getElementById('allPokemons').innerHTML = '';
  load();
  for (let i = 0; i < 100; i++) {
    let pokemonLink = pokemons[i];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonLink}`;
    let response = await fetch(url); //url herunterladen
    currentPokemon = await response.json(); //text in json umwandeln
    console.log(currentPokemon);
    renderAllPokemons(currentPokemon,i);
    allPokemons.push(currentPokemon);
  }
  
}
//! ab hier: ganzer Pokedex sichtbar (alle Pokemons)
function renderAllPokemons (currentPokemon,i) {
  let nameUpperCase = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
  let id2 = 'pokemonTypesSmall'+i;
  let id1 = 'onePokemon'+i;
  let types = currentPokemon['types'];
  let firstType = types[0]['type']['name'];
  let number = currentPokemon['id'];
  if (number < 10) {
    number = '#00'+currentPokemon['id'];
  } else {
    number = '#0'+currentPokemon['id'];
  }
  
    document.getElementById('allPokemons').innerHTML+= `<div id='${id1}' class="onePokemon" onclick="openPokemon(${i})">
    <div>
    <h2>${nameUpperCase}</h2>
    <div id='${id2}' class="under"></div>
    </div>
    <div class="right">
    <span>${number}</span>
    <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    </div>
    </div>`;
    for (let x = 0; x < types.length; x++) {
      let type = types[x]['type']['name'];
      document.getElementById(id2).innerHTML += `<span class="pokemonType">${type}</span>`;
    }
    bgColorChange(firstType, id1);
}

//Hintergrundfarbe der Pokemons verändern
function bgColorChange (firstType, id1) {
  if (firstType == 'water') {
    document.getElementById(id1).style.backgroundColor='#6390F0';
    } else if (firstType == 'grass') {
      document.getElementById(id1).style.backgroundColor='#7AC74C';
    } else if (firstType == 'fire') {
      document.getElementById(id1).style.backgroundColor='#EE8130';
    } else if (firstType == 'bug') {
      document.getElementById(id1).style.backgroundColor='#A6B91A';
    } else if (firstType == 'poison') {
      document.getElementById(id1).style.backgroundColor='#A33EA1';
    } else if (firstType == 'electric') {
      document.getElementById(id1).style.backgroundColor='#F7D02C';
    } else if (firstType == 'fairy') {
      document.getElementById(id1).style.backgroundColor='#D685AD';
    } else if (firstType == 'normal') {
      document.getElementById(id1).style.backgroundColor='#A8A77A';
    } else if (firstType == 'ground') {
      document.getElementById(id1).style.backgroundColor='#E2BF65';
    } else if (firstType == 'fighting') {
      document.getElementById(id1).style.backgroundColor='#C22E28';
    } else if (firstType == 'psychic') {
      document.getElementById(id1).style.backgroundColor='#F95587';
    } else if (firstType == 'rock') {
      document.getElementById(id1).style.backgroundColor='#B6A136';
    } else if (firstType == 'ghost') {
      document.getElementById(id1).style.backgroundColor='#735797';
    }
}


//!ab hier: einzelnes Pokemon geöffnet
function openPokemon (i) {
  document.getElementById('pokedex-bg').classList.remove('d-none');
  document.getElementById('body').style.overflow='hidden';
  renderPokemonInfo(i);
}


function renderPokemonInfo(i) { //zeigt Infos von Pokemon an
  let heart = 'img/heart.svg';
  if (!hearts.indexOf(i)) {
    heart = 'img/heart_filled.svg';
  }
  document.getElementById('icons').innerHTML= `
  <img src="img/arrow.svg" onclick="closePokemon()">
  <img src=${heart} id="heart${i}" onclick="like(${i})">
  `;
  let nameUpperCase = allPokemons[i]['name'].charAt(0).toUpperCase() + allPokemons[i]['name'].slice(1); //1
  document.getElementById('pokemonName').innerHTML = nameUpperCase;
  let number = allPokemons[i]['id'];
  if (number < 10) {
    number = '#00'+allPokemons[i]['id'];
  } else {
    number = '#0'+allPokemons[i]['id'];
  }
  document.getElementById('pokemonNumber').innerHTML = number;
  let types = allPokemons[i]['types'];
  let firstType = types[0]['type']['name'];
  document.getElementById('pokemonTypes').innerHTML = '';
  for (let i = 0; i < types.length; i++) {
    let type = types[i]['type']['name'];
    document.getElementById('pokemonTypes').innerHTML += `<div class="pokemonType">${type}</div>`;
  }
  document.getElementById('pokemonImage').src = `${allPokemons[i]['sprites']['other']['official-artwork']['front_default']}`;
  bgColorChangeOpened(firstType);
  showAbout(i);
  showStats(i);
  showMoves(i);
}
//1 - der Buchstabe an der Stelle 0 (also der 1. Buchstabe) vom Namen wird hergenommen und zu einem Großbuchstaben konvertiert
//danach wird der Pokemon-Namen an den Großbuchstaben hinzugefügt, nur wird mit .slice(1) der 1. Buchstabe gelöscht
//geöffnetes Pokemon - about


function bgColorChangeOpened (firstType) {
  if (firstType == 'water') {
    document.getElementById('pokedex').style.backgroundColor='#6390F0';
    } else if (firstType == 'grass') {
      document.getElementById('pokedex').style.backgroundColor='#7AC74C';
    } else if (firstType == 'fire') {
      document.getElementById('pokedex').style.backgroundColor='#EE8130';
    } else if (firstType == 'bug') {
      document.getElementById('pokedex').style.backgroundColor='#A6B91A';
    } else if (firstType == 'poison') {
      document.getElementById('pokedex').style.backgroundColor='#A33EA1';
    } else if (firstType == 'electric') {
      document.getElementById('pokedex').style.backgroundColor='#F7D02C';
    } else if (firstType == 'fairy') {
      document.getElementById('pokedex').style.backgroundColor='#D685AD';
    } else if (firstType == 'normal') {
      document.getElementById('pokedex').style.backgroundColor='#A8A77A';
    } else if (firstType == 'ground') {
      document.getElementById('pokedex').style.backgroundColor='#E2BF65';
    } else if (firstType == 'fighting') {
      document.getElementById('pokedex').style.backgroundColor='#C22E28';
    } else if (firstType == 'psychic') {
      document.getElementById('pokedex').style.backgroundColor='#F95587';
    } else if (firstType == 'rock') {
      document.getElementById('pokedex').style.backgroundColor='#B6A136';
    } else if (firstType == 'ghost') {
      document.getElementById('pokedex').style.backgroundColor='#735797';
    }
}


function showAbout(i) {
  document.getElementById('pokemonAbilities').innerHTML = '';
  document.getElementById('pokemonBaseExperience').innerHTML = allPokemons[i]['base_experience'];
  document.getElementById('pokemonHeight').innerHTML = allPokemons[i]['height'];
  document.getElementById('pokemonWeight').innerHTML = allPokemons[i]['weight'];
  let abilities = allPokemons[i]['abilities'];
  for (let i = 0; i < abilities.length; i++) {
    const ability = abilities[i]['ability']['name'];
    if (i == abilities.length - 1) {
      document.getElementById('pokemonAbilities').innerHTML += ability;
    } else {
      document.getElementById('pokemonAbilities').innerHTML += ability + ', ';
    }
  }
}


function showStats(i) {
  let stats = allPokemons[i]['stats'];
  document.getElementById('stats').innerHTML = '';
  for (let i = 0; i < stats.length; i++) {
    let stat = stats[i]['stat']['name'];
    let statUpperCase = stat.charAt(0).toUpperCase() + stat.slice(1); //1. Buchstabe wird groß
    let value = stats[i]['base_stat'];
    
    document.getElementById('stats').innerHTML += returnStats (statUpperCase, value, i);
    if (statUpperCase == 'Attack' || statUpperCase == 'Special-attack' || statUpperCase == 'Special-defense') {
      document.getElementById('progressBarFilled' + i).style.backgroundColor = 'rgb(73,208,176)'; //Änderung zu bg-color green
    }
  }
}


function returnStats (statUpperCase, value, i) {
  return `
  <tr>
    <td class="tableHeadings">${statUpperCase}</td>
    <td>${value}</td>
    <td><div class="progressBar"><div id="progressBarFilled${i}" class="progressBarFilled" style="width: calc(0.${value} * 100%);"></div></div></td>
  </tr>
`;
}


function showMoves(i) {
  let moves = allPokemons[i]['moves'];
  document.getElementById('move').innerHTML= '';
  movesSorted = [];
  for (let i = 0; i < moves.length; i++) {
    let move = moves[i]['move']['name'];
   movesSorted.push(move + ' '); 
  }
  movesSorted.sort();
  for (let x = 0; x < movesSorted.length; x++) {
    let moveSorted = movesSorted[x];
    document.getElementById('move').innerHTML+= `<li>${moveSorted}</li>`;
  }
}


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


function openStats() {
  document.getElementById('about').classList.add('d-none');
  document.getElementById('baseStats').classList.remove('d-none');
  document.getElementById('moves').classList.add('d-none');
  document.getElementById('buttonStats').classList.add('buttonSelected');
  document.getElementById('buttonAbout').classList.remove('buttonSelected');
  document.getElementById('buttonMoves').classList.remove('buttonSelected');
  document.getElementById('selectionBarFilled').style.width='80px';
  document.getElementById('selectionBarFilled').style.left='calc(50% - 40px)';
}


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


function closePokemon () {
  document.getElementById('pokedex-bg').classList.add('d-none');
  document.getElementById('body').style.overflow='visible';
}


function doNotClosePokemon (event) {
  event.stopPropagation();
}




function like (i) {
  let index = hearts.indexOf(i);
  if (index == -1) {
  document.getElementById('heart'+i).src='img/heart_filled.svg';
  hearts.push(i);
  } else {
    document.getElementById('heart'+i).src='img/heart.svg';
    hearts.splice(index,1);
  }
save();
}


function save () {
  let heartsAsText = JSON.stringify(hearts);
  localStorage.setItem('hearts', heartsAsText);
}


function load () {
  let heartsAsText = localStorage.getItem('hearts');
  if (heartsAsText) {
    hearts = JSON.parse(heartsAsText);
  }
}


function filterNames() {
  let search = document.getElementById('search').value;
  search = search.toLowerCase();
  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    document.getElementById('onePokemon'+i).classList.add('d-none');
    if (pokemon.toLowerCase().includes(search)) {
      document.getElementById('onePokemon'+i).classList.remove('d-none');
    }
}
}


function showFavourites () {
  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    let index = hearts.indexOf(i);
    document.getElementById('onePokemon'+i).classList.add('d-none');
    if (index > -1) {
      document.getElementById('onePokemon'+ i).classList.remove('d-none');
    }
  }
}