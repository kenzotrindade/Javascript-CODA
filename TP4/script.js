//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

///////////////////////////////////////////////////////////////////////////////

// ===============================
// Partie 1 – genererEleves
// ===============================

listeEleves = [];

function genererEleves() {
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

  for (let i = 0; i < taille; i++) {
    // On boucle selon la taille aléatoire définie au début
    // On définit un prénom au hasard dans la liste ci-dessus
    let indexRandom = Math.floor(Math.random() * listePrenomEleves.length);
    let randomPrenom = listePrenomEleves[indexRandom]; // On crée un élève qu'on fait boucler pour faire une liste d'élèves

    let templateEleve = {
      prenom: randomPrenom,
      noteMaths: Math.floor(Math.random() * 20),
      noteFrancais: Math.floor(Math.random() * 20),
      noteHistoire: Math.floor(Math.random() * 20),
      moyenne: 0,
    };
    listeEleves.push(templateEleve); // On ajoute dans les deux listes
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
}

// ===============================
// Partie 2 – afficherEleves
// ===============================

function afficherEleves(tableau) {
  for (let i = 0; i < tableau.length; i++) {
    // On parcourt la liste des élèves pour tous les afficher
    console.log(tableau[i].prenom + " - " + tableau[i].moyenne);
  }
}

// ===============================
// Partie 3 – trouverMoyenneMin
// ===============================

function trouverMoyenneMin(tableau, indexDepart) {
  for (let i = 0; i < tableau.length; i++) {
    // Boucle pour comparer chaque moyenne et trouver la plus basse
    if (tableau[i].moyenne < indexDepart) {
      indexDepart = tableau[i].moyenne;
    }
  }
  return indexDepart;
}

function trouverIndexMin(tableau, indexDepart) {
  let indiceMin = indexDepart;
  for (let i = indexDepart + 1; i < tableau.length; i++) {
    if (tableau[i].moyenne < tableau[indiceMin].moyenne) {
      indiceMin = i;
    }
  }
  return indiceMin;
}

function trouverMoyenneMax(tableau, indexDepart) {
  for (let i = 0; i < tableau.length; i++) {
    // Boucle pour comparer chaque moyenne et trouver la plus haute
    if (tableau[i].moyenne > indexDepart) {
      indexDepart = tableau[i].moyenne;
    }
  }
  return indexDepart;
}

function trouverIndexMax(tableau, indexDepart) {
  let indiceMax = indexDepart;
  for (let i = indexDepart + 1; i < tableau.length; i++) {
    if (tableau[i].moyenne > tableau[indiceMax].moyenne) {
      indiceMax = i;
    }
  }
  return indiceMax;
}

// ===============================
// Partie 4 – afficherDonnees
// ===============================

function afficherDonnees(tableau) {
  console.log("==========Nombre d'élèves==========");
  console.log("Il y a " + taille + " élèves");

  console.log("==========Moyenne Minimal==========");
  console.log(trouverMoyenneMin(listeEleves, 20));

  console.log("==========Moyenne Maximal==========");
  console.log(trouverMoyenneMax(listeEleves, 0));
}

// ===============================
// Partie 5 – swap
// ===============================

function swap(tableau, indexA, indexB) {
  // On permute le premier élève avec celui qui a la moyenne min
  [tableau[indexA], tableau[indexB]] = [tableau[indexB], tableau[indexA]];
}

// ===============================
// Partie 6 – triParSelection
// ===============================

function triParSelection(tableau) {
  let compteurVerif = 0;
  let compteurChange = 0;
  for (let i = 0; i < tableau.length; i++) {
    // Boucle principale pour placer chaque élève au bon endroit
    let min = trouverIndexMin(tableau, i); // On cherche le vrai minimum dans le reste du tableau
    for (let j = i + 1; j < tableau.length; j++) {
      // On compare l'élément choisi avec tous les suivants
      if (tableau[j].moyenne < tableau[min].moyenne) {
        min = j;
      }
      compteurVerif++; // On incrémente le nombre de comparaisons effectuées
    } // Échange classique avec la variable temporaire
    swap(tableau, i, min);
    compteurChange++; // On incrémente le nombre de permutations de places
  }
  return tableau;
}

// ===============================
// Partie 7 – Appel des fonctions
// ===============================

genererEleves(listeEleves);

console.log("==========Partie 1==========");
console.log(afficherEleves(listeEleves));

console.log("==========Partie 2==========");
console.log(afficherDonnees(listeEleves));

console.log("==========Partie 3==========");
triParSelection(listeEleves);
console.log(afficherEleves(listeEleves));
