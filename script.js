// MANIPULATION DU DOM //
const cardsContainer = document.querySelector("#cards-container");

// CONNEXION À L'API & RÉCUPÉRATION DES DONNÉES //
const contractName = "nantes";

async function fetchApi() {
	const requestString = `https://api.jcdecaux.com/vls/v1/stations?contract=${contractName}&apiKey=${apiKey}`;
	const res = await fetch(requestString);
	const data = await res.json();

	for (station in data) {
		const distance = calculateDistance(
			data[station].position.lat,
			data[station].position.lng
		);
		data[station].distance = distance; // Attaching returned distance from function to array elements
		console.log("🍐", data[station]);
		if (data[station].distance <= 1) {
			setMarkersOnStations(data[station]);
		}
	}
	
	data.sort((a, b) => a.distance - b.distance);
	
	for (station in data) {
		displayResults(data[station]);
	}
}
fetchApi();

// CALCUL DE LA DISTANCE //
function calculateDistance(lat, lng) {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat - adaCoordinates.lat); // deg2rad below
	const dLng = deg2rad(lng - adaCoordinates.lng);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(adaCoordinates.lat)) *
			Math.cos(deg2rad(lat)) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d; // distance returned
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

// AFFICHAGE DES RÉSULTATS //
function displayResults(station) {
	const stationCard = document.createElement("button");
	stationCard.classList.add("station-card");
	stationCard.setAttribute("id", station.number);

	stationCard.innerHTML = `
        <strong>${station.name.slice(4)}</strong><br>
        ${station.address} <br>
        Vélos disponibles : ${station.available_bikes} <br><br>
        📍 ${station.distance.toFixed(2).replace(".", ",")} km
    `;

	cardsContainer.appendChild(stationCard);
}
