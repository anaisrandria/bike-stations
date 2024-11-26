// MANIPULATION DU DOM //
const cardsContainer = document.querySelector("#cards-container");


// CONNEXION À L'API & RÉCUPÉRATION DES DONNÉES // 
const apiKey = "e3f5b0642963ce590eb229aaedf81ce9299bd96c";
const contractName = "nantes";

const options = {
	method: "GET",
	headers: {
		Accept: "application/json",
	},
};


// COORDONNÉES ADA TECH SCHOOL NANTES // 
const adaCoordinates = {
    "lat" : 47.21987236142364, 
    "lng" : -1.5334652313567714
};

async function fetchApi() {
    const requestString = `https://api.jcdecaux.com/vls/v1/stations?contract=${contractName}&apiKey=${apiKey}&position=`;
    const res = await fetch(requestString, options);
    const data = await res.json();

    console.log("🐸", data[0].position.lat)

    for (let i = 0; i < data.length; i++) {
        if (data[i].status == "OPEN") {
            console.log("🍐", data[i])
            displayResults(data[i]);
        }
    }
} 
fetchApi();


// AFFICHAGE DES RÉSULTATS // 
function displayResults(station) {
    const bikeStation = document.createElement("div");
    bikeStation.classList.add("station-card");
    bikeStation.setAttribute("id", station.number);

    const stationInfos = document.createElement("div");
    stationInfos.innerHTML = `
        <strong>#${station.number} ${station.name.slice(4)}</strong><br>
        ${station.address} <br>
        Vélos disponibles : ${station.available_bikes} <br>
        <br>
    `;

    bikeStation.appendChild(stationInfos);
    cardsContainer.appendChild(bikeStation);
}