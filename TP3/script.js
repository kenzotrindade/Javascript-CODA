//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

///////////////////////////////////////////////////////////////////////////////

// ===============================
// Partie 1 – Génération des élèves
// ===============================
console.log("==========Partie 1==========");
listePrenomEleves = [
  "Alice",
  "Bob",
  "Kenzo",
  "Enzo",
  "Antoine",
  "Jérémy",
  "Maxime",
  "Pierre",
  "Johan",
  "Fidèle",
  "Ayoub",
  "Lucas",
  "Tom",
]; // Liste de prénom d'élèves au hasard

listeEleves = []; // Contient la liste des objets
listeInitialeEleves = [];
for (let i = 0; i < taille; i++) {
  // On boucle selon la taille aléatoire définie au début
  // On définit un prénom au hasard dans la liste ci-dessus
  let indexRandom = Math.floor(Math.random() * listePrenomEleves.length);
  let randomPrenom = listePrenomEleves[indexRandom];

  // On crée un élève qu'on fait boucler pour faire une liste d'élèves
  let templateEleve = {
    prenom: randomPrenom,
    noteMaths: Math.floor(Math.random() * 20),
    noteFrancais: Math.floor(Math.random() * 20),
    noteHistoire: Math.floor(Math.random() * 20),
    moyenne: 0,
  };
  listeEleves.push(templateEleve); // On ajoute dans les deux listes
  listeInitialeEleves.push(templateEleve);
}

for (let i = 0; i < listeEleves.length; i++) {
  // Calcul de la moyenne de chaque élève & l'implémenter dans l'objet
  let moyenneEleve =
    (listeEleves[i].noteMaths +
      listeEleves[i].noteFrancais +
      listeEleves[i].noteHistoire) /
    3;
  listeEleves[i].moyenne = moyenneEleve;
}

for (let i = 0; i < listeInitialeEleves.length; i++) {
  // Idem ici on implémente cette fois dans listeInitialeEleves
  let moyenneEleve =
    (listeInitialeEleves[i].noteMaths +
      listeInitialeEleves[i].noteFrancais +
      listeInitialeEleves[i].noteHistoire) /
    3;
  listeInitialeEleves[i].moyenne = moyenneEleve;
}

for (let i = 0; i < listeEleves.length; i++) {
  // On parcourt la liste des élèves pour tous les afficher
  console.log(
    "élève" +
      i +
      " : " +
      listeEleves[i].prenom +
      " - " +
      listeEleves[i].noteMaths +
      " - " +
      listeEleves[i].noteFrancais +
      " - " +
      listeEleves[i].noteHistoire +
      " - " +
      listeEleves[i].moyenne
  );
}

// ===============================
// Partie 2 – Étude des valeurs
// ===============================
console.log("==========Partie 2==========");
console.log("Il y a : " + taille + " élèves dans la classe.");

let vmin = 20; // On part de la note max pour trouver plus petit
let vmax = 0; // On part de la note min pour trouver plus grand

for (let i = 0; i < listeEleves.length; i++) {
  // Boucle pour comparer chaque moyenne et trouver la plus basse
  if (listeEleves[i].moyenne < vmin) {
    vmin = listeEleves[i].moyenne;
  }
}

for (let i = 0; i < listeEleves.length; i++) {
  // Boucle pour comparer chaque moyenne et trouver la plus haute
  if (listeEleves[i].moyenne > vmax) {
    vmax = listeEleves[i].moyenne;
  }
}

console.log("La moyenne minimum de la classe est : " + vmin);
console.log("La moyenne minimum de la classe est : " + vmax);

// ===============================
// Partie 3 – Première étape du tri
// ===============================
console.log("==========Partie 3==========");
let indexMin = 0;
let eleveMin = "";
let moyMin = 20;
for (let i = 0; i < listeEleves.length; i++) {
  // On cherche l'élève qui a la pire moyenne du tableau
  if (listeEleves[i].moyenne < moyMin) {
    moyMin = listeEleves[i].moyenne;
    indexMin = i;
    eleveMin = listeEleves[i].prenom;
  }
}

console.log(
  "La moyenne la plus faible est celle de : " +
    eleveMin +
    ", à l'indice : " +
    indexMin +
    " à : " +
    moyMin +
    " de moyenne."
);

// ===============================
// Partie 4 – Échange de valeurs
// ===============================
console.log("==========Partie 4==========");
[listeEleves[0], listeEleves[indexMin]] = [
  // On permute le premier élève avec celui qui a la moyenne min
  listeEleves[indexMin],
  listeEleves[0],
];

for (let i = 0; i < listeEleves.length; i++) {
  // Affichage du tableau après le premier échange de position
  console.log(
    "élève" +
      i +
      " : " +
      listeEleves[i].prenom +
      " - " +
      listeEleves[i].noteMaths +
      " - " +
      listeEleves[i].noteFrancais +
      " - " +
      listeEleves[i].noteHistoire +
      " - " +
      listeEleves[i].moyenne
  );
}

// ===============================
// Partie 5 – Tri par sélection complet
// ===============================
console.log("==========Partie 5==========");

let compteurVerif = 0;
let compteurChange = 0;
let temp = 0;
for (let i = 0; i < listeEleves.length; i++) {
  // Boucle principale pour placer chaque élève au bon endroit
  let min = i;
  // On cherche le vrai minimum dans le reste du tableau
  for (let j = i + 1; j < listeEleves.length; j++) {
    // On compare l'élément choisi avec tous les suivants
    if (listeEleves[j].moyenne < listeEleves[min].moyenne) {
      min = j;
    }
    compteurVerif++; // On incrémente le nombre de comparaisons effectuées
  }
  // Échange classique avec la variable temporaire
  temp = listeEleves[i];
  listeEleves[i] = listeEleves[min];
  listeEleves[min] = temp;
  compteurChange++; // On incrémente le nombre de permutations de places
}

for (let i = 0; i < listeEleves.length; i++) {
  // Affichage de la liste finale triée par moyenne croissante
  console.log(
    "élève" +
      i +
      " : " +
      listeEleves[i].prenom +
      " - " +
      listeEleves[i].noteMaths +
      " - " +
      listeEleves[i].noteFrancais +
      " - " +
      listeEleves[i].noteHistoire +
      " - " +
      listeEleves[i].moyenne
  );
}

// ===============================
// Partie 6 – Affichage du résultat
// ===============================
console.log("==========Partie 6==========");

for (let i = 0; i < listeInitialeEleves.length; i++) {
  // Affichage simple du tableau de départ
  console.log(
    listeInitialeEleves[i].prenom + " - " + listeInitialeEleves[i].moyenne
  );
}

console.log("=============================");

for (let i = 0; i < listeEleves.length; i++) {
  // Affichage simple du tableau une fois trié
  console.log(listeEleves[i].prenom + " - " + listeEleves[i].moyenne);
}

console.log("=============================");

console.log("Nombre de vérifications : " + compteurVerif);
console.log("Nombre de changements : " + compteurChange);

// ===============================
// Bonus – Tri par matière
// ===============================
console.log("==========Bonus 1==========");

for (let i = 0; i < listeEleves.length; i++) {
  // On recommence le tri par sélection mais sur la note de Maths
  let min = i;
  for (let j = i + 1; j < listeEleves.length; j++) {
    // On cherche la note de Maths la plus basse restante
    if (listeEleves[j].noteMaths < listeEleves[min].noteMaths) {
      min = j;
    }
    compteurVerif++;
  }
  temp = listeEleves[i];
  listeEleves[i] = listeEleves[min];
  listeEleves[min] = temp;
  compteurChange++;
}

for (let i = 0; i < listeEleves.length; i++) {
  // Affichage final des élèves triés par leur performance en Maths
  console.log(
    listeEleves[i].prenom + " a eu en Maths : " + listeEleves[i].noteMaths
  );
}
