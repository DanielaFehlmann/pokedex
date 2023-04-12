/**
 * function to like a pokemon
 * 
 * @param {number} i - number to change the correct image
 */
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
  refreshFavourites();
}


/**
 * function to refresh the favourites-page when dislike a pokemon
 */
function refreshFavourites() {
  for (let i = 0; i < allPokemons.length; i++) {
    if (document.getElementById('onePokemon' + i).classList.contains('d-none')) {
      showFavourites();
      break;
    }
  }
}


/**
 * function to show the liked pokemons
 */
function showFavourites () {
  resetValuesFavourites();
  for (let i = 0; i < allPokemons.length; i++) {
    let index = hearts.indexOf(i);
    document.getElementById('onePokemon'+ i).classList.add('d-none');
    if (index > -1) {
      document.getElementById('onePokemon'+ i).classList.remove('d-none');
    }
  }

}


/**
 * function to reset values when going to favourite pokemons
 */
function resetValuesFavourites() {
  document.getElementById('search').value = '';
  document.getElementById('search').disabled = true;
  document.getElementById('goBack').classList.remove('d-none');
  document.getElementById('search').classList.add('v-hidden');
  document.getElementById('deleteSearch').classList.add('d-none');
  document.getElementById('buttonLoadMore').classList.add('d-none');
  document.getElementById('headerHeart').classList.add('d-none');
  document.getElementById('searchFailed').classList.add('d-none');
}
