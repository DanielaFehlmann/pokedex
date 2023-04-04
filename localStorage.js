/**
 * function to save the likes
 */
function save () {
  let heartsAsText = JSON.stringify(hearts);
  localStorage.setItem('hearts', heartsAsText);
}


/**
 * function to load the likes
 */
function load () {
  let heartsAsText = localStorage.getItem('hearts');
  if (heartsAsText) {
    hearts = JSON.parse(heartsAsText);
  }
}
