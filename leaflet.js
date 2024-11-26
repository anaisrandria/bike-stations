const adaCoordinates = {
	lat: 47.21987236142364,
	lng: -1.5334652313567714,
};


// SET VIEW // 
var map = L.map("map").setView([adaCoordinates.lat, adaCoordinates.lng], 18);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// SET MARKERS //
var marker = L.marker([adaCoordinates.lat, adaCoordinates.lng]).addTo(map);

// SET CIRCLE //
var circle = L.circle([adaCoordinates.lat, adaCoordinates.lng], {
	color: "red",
	fillColor: "#f03",
	fillOpacity: 0.5,
	radius: 30,
}).addTo(map);


marker.bindPopup("Ada Tech School").openPopup();
