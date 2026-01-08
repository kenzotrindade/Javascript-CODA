// Partie 1
console.log("==========Partie 1==========");

const maClasse = "Pandi"; // Déclaration d'une constante
let nombreEleves = 26; // Déclaration d'une variable non constante
let classeOuverte = false;

console.log(maClasse); // Afficher dans la console nos résultats
console.log(nombreEleves);
console.log(classeOuverte);

// Partie 2
console.log("==========Partie 2==========");

let eleve1 = {
  // Création d'un tableau avec les éléments prenom, noteMaths, noteFrancais représentant un élève
  prenom: "Alice",
  noteMaths: 16,
  noteFrancais: 12,
};

console.log(eleve1.prenom); // On retourne le prénom de l'élève 1 uniquement

// Partie 3
console.log("==========Partie 3==========");

let eleve2 = {
  // Création d'un deuxième élève
  prenom: "Bob",
  noteMaths: 12,
  noteFrancais: 12,
};

let eleve3 = {
  // Création d'un troisième élève
  prenom: "Paul",
  noteMaths: 17,
  noteFrancais: 5,
};

let listeEleves = [eleve1, eleve2, eleve3]; // On fait un tableau contenant tout nos élèves

for (i = 0; i < listeEleves.length; i++) {
  // On parcourt la liste complète des élèves de par le tableau les contenants
  console.log(listeEleves[i].prenom); // On affiche les prénoms de chaque élève avec la boucle
}

// Partie 4
console.log("==========Partie 4==========");

let moyenne = 0; // On initialise notre moyenne à 0
for (i = 0; i < listeEleves.length; i++) {
  // On parcourt chaque élève
  moyenne = (listeEleves[i].noteMaths + listeEleves[i].noteFrancais) / 2; // On lui calcule sa moyenne avec ses deux notes
  console.log(
    `Bonjour, ${listeEleves[i].prenom}, ta moyenne est de : ${moyenne}` // On retourne le prénom de l'élève avec sa moyenne
  );
}

// Partie 5
console.log("==========Partie 5==========");

let role; // On déclare une variable role pour nous aider à changer son comportement en fonction de certains évènements
for (i = 0; i < listeEleves.length; i++) {
  // On parcourt la liste des élèves
  moyenne = (listeEleves[i].noteMaths + listeEleves[i].noteFrancais) / 2;
  if (moyenne >= 10) {
    // Si, l'élève a une moyenne supérieur ou égale à 10, notre variable prend la valeur "Admis"
    role = "Admis";
  } else {
    // Sinon, la variable prend la valeur "Refusé" si l'élève a une moyenne inférieur à 10
    role = "Refusé";
  }
  console.log(
    `Bonjour, ${listeEleves[i].prenom}, ta moyenne est de : ${moyenne}, tu es ${role}` // Enfin on affiche chaque élève avec sa valeur correspondante, soit si il est admis ou non
  );
}

// Partie 6
console.log("==========Partie 6==========");

let mention; // Pareil on définit une variable qui va servir de balise d'évènement
for (i = 0; i < listeEleves.length; i++) {
  moyenne = (listeEleves[i].noteMaths + listeEleves[i].noteFrancais) / 2;
  if (moyenne < 10) {
    // On va vérifier la mention de l'élève, si c'est inférieur à 10, c'est Insuffisant
    mention = "Insuffisant";
  } else if (moyenne >= 10 && moyenne < 12) {
    // Sinon, si c'est compris entre 10 inclut & 12 -> Passable
    mention = "Passable";
  } else if (moyenne >= 12 && moyenne < 14) {
    // ect ici jusque la mention très bien à 16 ou plus de moyenne
    mention = "Assez Bien";
  } else if (moyenne >= 14 && moyenne < 16) {
    mention = "Bien";
  } else if (moyenne >= 16) {
    mention = "Très Bien";
  }
  console.log(
    `Bonjour, ${listeEleves[i].prenom}, ta moyenne est de : ${moyenne}, tu as la mention ${mention}` // On affiche la mention de chaque élève
  );
}

// Partie 7
console.log("==========Partie 7==========");

let index = 0; // Index pour pouvoir avancer dans la boucle
let compteur = 0;
while (index < listeEleves.length) {
  // On parcourt la liste des élèves
  // On boucle tant que l'on a pas parcouru toute la liste des élèves
  for (i = 0; i < listeEleves.length; i++) {
    // On parcours les élèves
    moyenne = (listeEleves[i].noteMaths + listeEleves[i].noteFrancais) / 2; // On calcule les moyennes une par une
    if (moyenne >= 10) {
      // Si cette moyenne est supérieur ou égale à 10, le compteur augmente de 1 pour compter le nombre d'élèves admis
      compteur++;
    }
  }
  index++; // On avance dans l'index pour ne pas boucler à l'infini
}
console.log("Il y a " + compteur + " élèves admis");

// Bonus 1
console.log("==========Bonus 1==========");

let totalMoyenne = 0;
for (i = 0; i < listeEleves.length; i++) {
  // On parcourt la liste des élèves
  moyenne = (listeEleves[i].noteMaths + listeEleves[i].noteFrancais) / 2;
  totalMoyenne += moyenne; // On calcule simplement en additionnant la moyenne de chaque élèves
  console.log(totalMoyenne);
}

console.log("La moyenne de la classe est de : " + totalMoyenne / 3); // On divise cette moyenne par le nombre de notes pour avoir la moyenne de classe

// Bonus 2
console.log("==========Bonus 2==========");

let eleve4 = {
  // Créations d'une quatrième élève
  prenom: "Nicolas",
  noteMaths: 12,
  noteFrancais: 18,
};

let compteurEleves = 0; // On initialise notre compteur d'élèves
for (i = 0; i <= listeEleves.length; i++) {
  // On boucle tant que on a pas parcouru toute la liste des élèves
  compteurEleves++;
}

console.log("Il y a " + compteurEleves + " élèves "); // On affiche le nombre total d'élèves

// Bonus 3
console.log("==========Bonus 3==========");

let compteurAdmis = 0; // On initialise le nombre d'élèves admis
for (i = 0; i < listeEleves.length; i++) {
  moyenne = (listeEleves[i].noteMaths + listeEleves[i].noteFrancais) / 2; // On calcule la moyenne de chaque élève
  if (moyenne >= 10) {
    // Si elle est plus grande ou égale à 10, on ajoute 1 au compteur
    compteurAdmis++;
  }
}

if (compteurAdmis === listeEleves.length) {
  // Si le nombre d'élèves admis est égal au nombre d'élèves dans ce cas, tout le monde est admis Félicitation !
  console.log("Félicitation, tout les élèves sont admis !");
}
