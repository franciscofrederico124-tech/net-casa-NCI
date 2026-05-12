// public/js/script.js

const lamps = {
  1: false,
  2: false
};


async function Send()
{
  try {
  const data = await fetch("/system/getstatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ one: lamps[1], two: lamps[2] })
  })
    
  const res = await data.json();
}
catch(error)
{
  console.log("Erro: ", error);
}
}

{async () => { Send() }}

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
    
  await Send()
  
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