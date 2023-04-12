/**
 * function to search for a pokemon by clicking on the search-input
 */
function searchPokemon() {
  let search = document.getElementById('search').value;
  if (search) {
    document.getElementById('deleteSearch').classList.remove('d-none');
  } else {
    document.getElementById('deleteSearch').classList.add('d-none');
    document.getElementById('buttonLoadMore').classList.remove('d-none');
  }
  search = search.toLowerCase();
  showSearchedPokemon(search);
  document.getElementById('buttonLoadMore').classList.add('d-none');
}


/**
 * function to show only the pokemons which names contain the value of the search-input
 * 
 * @param {String} search - value of the input-field
 */
function showSearchedPokemon(search) {
  for (let i = 0; i < allPokemons.length; i++) {
    let pokemonName = allPokemons[i]['name'];
    let pokemonNumber = allPokemons[i]['id'];
    let pokemonTypes = [];
    allPokemons[i]['types'].forEach(type => {
      pokemonTypes += (type['type']['name'] + ' ');
    });
    document.getElementById('onePokemon'+i).classList.add('d-none');
    if (pokemonName.toLowerCase().includes(search) || pokemonNumber == search || pokemonTypes.toLowerCase().includes(search)) {
      document.getElementById('onePokemon'+i).classList.remove('d-none');
    }
  }
  searchFailed(search);
}


/**
 * function to show a text if nothing could be found
 * 
 * @param {String} search - value of the input-field
 */
function searchFailed(search) {
  for (let i = 0; i < allPokemons.length; i++) {
    if (!document.getElementById('onePokemon' + i).classList.contains('d-none')) {
      document.getElementById('searchFailed').classList.add('d-none');
      break;
    } else {
      document.getElementById('searchFailed').classList.remove('d-none');
      document.getElementById('searchFailed').innerHTML=`no loaded pokemon matched your search "${search}"! <br> Try to search for type, name or id!`;
    }
  }
}