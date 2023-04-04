

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
}

/**
 * function to show the liked pokemons
 */
function showFavourites () {
  document.getElementById('buttonLoadMore').classList.add('d-none');
  document.getElementById('refresh').classList.remove('d-none');
  for (let i = 0; i < allPokemons.length; i++) {
    let index = hearts.indexOf(i);
    document.getElementById('onePokemon'+ i).classList.add('d-none');
    if (index > -1) {
      document.getElementById('onePokemon'+ i).classList.remove('d-none');
    }
  }

}
