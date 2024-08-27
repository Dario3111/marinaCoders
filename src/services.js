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
