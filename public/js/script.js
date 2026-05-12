// public/js/script.js

const lamps = {
  1: true,
  2: true
};


async function toggleLamp(id) {

  // Alterna estado local
  lamps[id] = !lamps[id];

  const icon =
    document.getElementById(
      `lamp${id}-icon`
    );

  const status =
    document.getElementById(
      `lamp${id}-status`
    );

  const button =
    document.getElementById(
      `lamp${id}-btn`
    );


  // =========================================
  // AQUI ENTRA A LÓGICA DE CONSUMO DA API 🚀
  // =========================================

  /*
  
  Exemplo:

  try {

    const response = await fetch(
      "/lamp/control",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          lamp: id,
          state: lamps[id]
        })
      }
    );

    const data = await response.json();

    console.log(data);

  }

  catch (e) {

    console.log(
      "Erro ao enviar estado:",
      e
    );

  }

  */


  // =========================================
  // ALTERAÇÃO VISUAL
  // =========================================

  if (lamps[id]) {

    icon.classList.add("active");

    status.innerText = "Ligada";

    button.innerText = "Desligar";

    button.classList.remove("inactive");

    button.classList.add("active");

  }

  else {

    icon.classList.remove("active");

    status.innerText = "Desligada";

    button.innerText = "Ligar";

    button.classList.remove("active");

    button.classList.add("inactive");

  }

}