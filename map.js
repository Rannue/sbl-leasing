function initMap() {
  const location = { lat: 55.7558, lng: 37.6173 }; // Москва
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: location,
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}
