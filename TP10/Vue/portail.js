let indexSkin = 1;
for (indexSkin; indexSkin <= 29; indexSkin++) {
  const skinContainer = document.querySelector(".skin-container");
  const labelSkin = document.createElement("label");
  labelSkin.classList.add("skin-option");

  const inputSkin = document.createElement("input");
  inputSkin.type = "radio";
  inputSkin.name = "skin";
  inputSkin.value = "assets/" + indexSkin + ".png";

  if (indexSkin === 1) {
    inputSkin.checked = true;
  }

  const divPreview = document.createElement("div");
  divPreview.classList.add("preview");
  divPreview.style.backgroundImage = "url('assets/" + indexSkin + ".png')";

  labelSkin.appendChild(inputSkin);
  labelSkin.appendChild(divPreview);
  skinContainer.appendChild(labelSkin);
}

const pseudoInput = document.querySelector(".pseudo");
const serverUrlInput = document.querySelector(".serverUrl");
const joinBtn = document.querySelector('button[type="submit"]');
const form = document.querySelector('form[action=""]');

joinBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const oldError = document.querySelector(".error-msg");
  if (oldError) {
    oldError.remove();
  }
  const skinInput = document.querySelector('input[name="skin"]:checked');
  if (pseudoInput.value && serverUrlInput.value && skinInput.value) {
    const pseudo = pseudoInput.value;
    const serverUrl = serverUrlInput.value;
    const skinPath = skinInput.value;
    localStorage.setItem("pseudo", pseudo);
    localStorage.setItem("serverUrl", serverUrl);
    localStorage.setItem("skinPath", skinPath);

    console.log("Données stockées : ", { pseudo, serverUrl, skinPath });
    window.location.href = "game.html";
  } else {
    console.log("Enregistrement fail, renseigne tout les champs.");
    const errorDB = document.createElement("p");
    errorDB.classList.add("error-msg");
    form.appendChild(errorDB);
    errorDB.textContent = "Veuillez renseigner tout les champs.";
  }
});
