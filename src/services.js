const API_URL_MARINA = "http://localhost:3000/socios";

// Función para obtener datos usando fetch (GET)
async function getMarinaSocios() {
  try {
    const response = await fetch(API_URL_MARINA);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displaySocios(data);
  } catch (error) {
    console.error("Error fetching the marina socios:", error);
  }
}
// Función para mostrar los socios en una lista HTML
function displaySocios(socios) {
  const socioList = document.getElementById("marina-socio-list");
  socioList.innerHTML = ""; // Limpiar la lista existente
  // Respuesta impresa para cada socio agregado
  socios.forEach((socio) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${socio.nombre} (Embarcación: ${socio.embarcacion}), #: ${socio.numero_de_afiliado}`;

    // Crear el botón de editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit-button"; // Añadir clase para estilo
    editButton.addEventListener("click", () => fillFormForEdit(socio));

    // Crear el botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete-button"; // Añadir clase para estilo
    deleteButton.addEventListener("click", () => deleteSocio(socio.id));

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    socioList.appendChild(listItem);
  });
}
// Función para agregar un nuevo socio (POST)
async function addSocio(socio) {
  try {
    const response = await fetch(API_URL_MARINA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(socio),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newSocio = await response.json();
    console.log("Socio added:", newSocio);

    // Actualizar la lista de socios después de agregar uno nuevo
    getMarinaSocios();
  } catch (error) {
    console.error("Error adding the socio:", error);
  }
}
// Función para editar un socio (PUT)
async function updateSocio(id, updatedSocio) {
  try {
    const response = await fetch(`${API_URL_MARINA}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSocio),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Socio updated:", id);

    // Actualizar la lista de socios después de la actualización
    getMarinaSocios();
  } catch (error) {
    console.error("Error updating the socio:", error);
  }
}
