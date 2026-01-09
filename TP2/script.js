//////////////////////// Code fourni (ne pas modifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 7 et 10 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale
let note_maximum = 20;

// Boucle pour remplir le tableau avec des notes aléatoires
for (let i = 0; i < taille; i++) {
  // Générer une note aléatoire entre 0 et 20
  let note = Math.floor(Math.random() * (note_maximum + 1));
  // Ajouter la note à la fin du tableau
  notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

// ===============================
// Partie 1 – Etude des valeurs
// ===============================
console.log("==========Partie 1==========");
console.log("Taille du tableau : " + taille);

// Création d'une copie du tableau original pour la conserver avant le tri  
let tab = [];
for (let i = 0; i < taille; i++) {
  tab.push(notes[i]);
}
console.log("Le tableau est : " + tab);

// Recherche de la plus petite valeur (vmin)
let vmin = notes[0]; // On commence par la première note
for (let i = 0; i < taille; i++) {
  if (notes[i] < vmin) {
    vmin = notes[i]; // Met à jour si une note plus petite est trouvée
  }
}
console.log("La note minimum du tableau est : " + vmin);

// Recherche de la plus grande valeur (vmax)
let vmax = notes[0];
for (let i = 0; i < taille; i++) {
  if (notes[i] > vmax) {
    vmax = notes[i]; // Met à jour si une note plus grande est trouvée
  }
}
console.log("La note maximum du tableau est : " + vmax);

// ===============================
// Partie 2 – Première étape du tri
// ===============================
console.log("==========Partie 2==========");
// Recherche du minimum global et de sa position (index)
let min = notes[0];
let indexMin = 0;
for (let i = 0; i < taille; i++) {
  if (notes[i] < min) {
    min = notes[i];
    indexMin = i;
  }
}

console.log(
  "La plus petite note est : " + min + " et son indice est : " + indexMin
);

// ===============================
// Partie 3 – Échange de valeurs
// ===============================
console.log("==========Partie 3==========");
// On échange la première note [0] avec la plus petite trouvée [indexMin]
[notes[0], notes[indexMin]] = [notes[indexMin], notes[0]];

console.log("Le tableau après tri est : " + notes);

// ===============================
// Partie 4 – Tri par sélection complet
// ===============================
console.log("==========Partie 4==========");
let temp = 0; // Variable temporaire pour l'échange de valeurs
for (let i = 0; i < taille; i++) {
  let min = i; // On suppose que l'élément i est le plus petit
  // On cherche le vrai minimum dans le reste du tableau
  for (let j = i + 1; j < taille; j++) {
    if (notes[j] < notes[min]) {
      min = j;
    }
  }
  // Échange classique avec la variable temporaire
  temp = notes[i];
  notes[i] = notes[min];
  notes[min] = temp;
}

console.log("Tableau après tri complet : " + notes);

// ===============================
// Partie 5 – Affichage du résultat
// ===============================
console.log("==========Partie 5==========");
console.log("Le tableau avant le tri : " + tab);
console.log("Le tableau après le tri : " + notes);

// ===============================
// Bonus - 1
// ===============================
console.log("==========Bonus 1==========");

let compteurVerif = 0;
let compteurChange = 0;

// Tri du tableau "tab"
for (let i = 0; i < taille; i++) {
  console.log(tab);
  let min = i;
  for (let j = i + 1; j < taille; j++) {
    if (tab[j] < tab[min]) { // Si l'index parcouru est plus petit que le minimum, le minimum devient l'index parcouru
      min = j;
    }
    compteurVerif++; // On compte chaque comparaison
  }
  // Échange et incrémentation du compteur d'échanges
  temp = tab[i];
  tab[i] = tab[min];
  tab[min] = temp;
  compteurChange++;
}

// ===============================
// Bonus - 2
// ===============================
console.log("==========Bonus 2==========");
// Affichage des compteurs & du tri croissant
console.log("Nombre de vérificaations : " + compteurVerif);
console.log("Nombre d'échanges : " + compteurChange);

// ===============================
// Bonus - 3
// ===============================
console.log("==========Bonus 3==========");

// Tri par sélection en ordre décroissant (du plus grand au plus petit)
let max = tab[0];
for (let i = 0; i < taille; i++) {
  console.log(tab);
  let max = i;
  for (let j = i + 1; j < taille; j++) {
    if (tab[j] > tab[max]) {
      // On cherche la valeur supérieure
      max = j;
      compteurVerif++;
    }
  }
  temp = tab[i];
  tab[i] = tab[max];
  tab[max] = temp;
  compteurChange++;
}

console.log("Le tableau en ordre décroissant est : " + tab);
console.log("Nombre de vérificaations : " + compteurVerif);
console.log("Nombre d'échanges : " + compteurChange);
