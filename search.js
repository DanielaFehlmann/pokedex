/**
 * function to search for a pokemon by clicking on the search-input
 */
function searchPokemon() {
  let search = document.getElementById('search').value;
  search = search.toLowerCase();
  showSearchedPokemon(search);
  document.getElementById('buttonLoadMore').classList.add('d-none');
  if (search == '') {
    document.getElementById('buttonLoadMore').classList.remove('d-none');
  }
}


/**
 * function to show only the pokemons which names contain the value of the search-input
 * 
 * @param {String} search - value of the input-field
 */
function showSearchedPokemon(search) {
  for (let i = 0; i < allPokemons.length; i++) {
    let pokemon = allPokemons[i]['name'];
    document.getElementById('onePokemon'+i).classList.add('d-none');
    if (pokemon.toLowerCase().includes(search)) {
      document.getElementById('onePokemon'+i).classList.remove('d-none');
    };
  }
}


/**
 * function to reset the value of the search-input by clicking anywhere on the body
 */
function resetValue() {
  document.getElementById('search').value = '';
}
