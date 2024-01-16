// Sélectionnez le tab bar et le contenu de la page
const tabBar = document.getElementById('tab-bar');
const content = document.getElementById('content');

// Fonction pour gérer la visibilité du tab bar
function handleTabBarVisibility() {
  // Si le contenu de la page est suffisamment haut pour déclencher le défilement,
  // masquez le tab bar, sinon, affichez-le
  if (content.scrollHeight > window.innerHeight) {
    tabBar.style.display = 'none';
  } else {
    tabBar.style.display = 'block';
  }
}

// Gérez la visibilité du tab bar lorsque la page est chargée
handleTabBarVisibility();

// Écoutez l'événement de défilement de la page pour mettre à jour la visibilité du tab bar
window.addEventListener('scroll', handleTabBarVisibility);
