//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
  // Générer une note aléatoire entre 0 et note_maximum (inclus)
  let note = Math.floor(Math.random() * (note_maximum + 1));
  // Ajouter la note générée au tableau
  notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

// ===============================
// Partie 1 – Etude des valeurs
// ===============================
console.log("==========Partie 1==========");
console.log("Taille du tableau : " + taille);

let tab = [];
for (let i = 0; i < taille; i++) {
  tab.push(notes[i]);
}
console.log("Le tableau est : " + tab);

let vmin = notes[0];
for (let i = 0; i < taille; i++) {
  if (notes[i] < vmin) {
    vmin = notes[i];
  }
}
console.log("La note minimum du tableau est : " + vmin);

let vmax = notes[0];
for (let i = 0; i < taille; i++) {
  if (notes[i] > vmax) {
    vmax = notes[i];
  }
}
console.log("La note maximum du tableau est : " + vmax);

// ===============================
// Partie 2 – Première étape du tri
// ===============================
console.log("==========Partie 2==========");
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
[notes[0], notes[indexMin]] = [notes[indexMin], notes[0]];

console.log("Le tableau après tri est : " + notes);

// ===============================
// Partie 4 – Tri par sélection complet
// ===============================
console.log("==========Partie 4==========");
let temp = 0;
for (let i = 0; i < taille; i++) {
  let min = i;
  for (let j = i + 1; j < taille; j++) {
    if (notes[j] < notes[min]) {
      min = j;
    }
  }
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

for (let i = 0; i < taille; i++) {
  console.log(tab);
  let min = i;
  for (let j = i + 1; j < taille; j++) {
    if (tab[j] < tab[min]) {
      min = j;
    }
    compteurVerif++;
  }
  temp = tab[i];
  tab[i] = tab[min];
  tab[min] = temp;
  compteurChange++;
}

// ===============================
// Bonus - 2
// ===============================
console.log("==========Bonus 2==========");

console.log("Nombre de vérificaations : " + compteurVerif);
console.log("Nombre d'échanges : " + compteurChange);

// ===============================
// Bonus - 3
// ===============================
console.log("==========Bonus 3==========");

let max = tab[0];
for (let i = 0; i < taille; i++) {
  console.log(tab);
  let max = i;
  for (let j = i + 1; j < taille; j++) {
    if (tab[j] > tab[max]) {
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
