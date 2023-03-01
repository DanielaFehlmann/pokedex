

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
  //array "hearts" durchsuchen, ob "i" bereits enthalten
  //wenn nicht enthalten -> ausgefülltes Herz & "i" zu "hearts" hinzufügen
  //wenn enthalten -> leeres Herz & "i" aus "hearts" entfernen
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
    document.getElementById('onePokemon'+i).classList.add('d-none');
    if (index > -1) {
      document.getElementById('onePokemon'+ i).classList.remove('d-none');
    }
  }
  //alle Pokemons ausblenden -> danach alle Pokemons, welche im array "hearts" sind, einblenden
}
