function insertarCard(titulo, descripcion) {
  // Acá solamente dibujamos los elementos y asignamos las clases CSS
  const divCol = document.createElement("div");
  divCol.className = "col-sm-4 mb-4";
  const card = document.createElement("div");
  card.className = "card";
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const tituloServicio = document.createElement("h5");
  tituloServicio.className = "card-title";
  const descripcionServicio = document.createElement("p");
  descripcionServicio.className = "card-text";

  cardBody.appendChild(tituloServicio);
  cardBody.appendChild(descripcionServicio);

  // Asignamos los textos y descripciones
  tituloServicio.innerHTML = titulo;
  descripcionServicio.innerHTML = descripcion;

  // Agregamos todos estos elementos al padre
  divAllServicios = document.getElementById("servicios");
  divAllServicios.appendChild(divCol).appendChild(card).appendChild(cardBody);
}

const servicios = {
  PlacaRelajacion: [1000, "Es una placa que permite dormir mejor"],
  LimpiezaTotal: [750, "Le quedará la boca super cómoda y suave"],
  PlacaRelajacion2: [1000, "Es una placa que permite dormir mejor"],
  PlacaRelajacion3: [1000, "Es una placa que permite dormir mejor"],
  PlacaRelajacion4: [1000, "Es una placa que permite dormir mejor"],
  PlacaRelajacion5: [1000, "Es una placa que permite dormir mejor"],
  PlacaRelajacion6: [1000, "Es una placa que permite dormir mejor"],
};

for (const key in servicios) {
  insertarCard(servicios[key][1], `Tiene un precio de: ${servicios[key][0]}`);
}
