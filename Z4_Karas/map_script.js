console.log("loaded");

let map = document.getElementById("map");
let photos = null;
let routeVisible = false;
let places = [];
let route;
let currentPhotos = [];
openedPhoto = 0;

function getImages(){
    fetch("images.json").then(response =>{
        if(response.ok){
            return response.json();
        }
        return null;
    }).then(result =>{
        if (result != null){
            photos = result.images;
            makeMarkers();
        } else {
            console.error("response is empty");
        }
    })
}

map = L.map("map").setView([49, 19], 7);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function makeMarkers() {
    photos.forEach(img => {
        let lat = img.gps[0];
        let lon = img.gps[1];
        console.log(lat);
        console.log(lon);
        let marker = L.marker([lat,lon]);
        marker.on("click", (event) => {
            addImages(event);
            openModal(0);
        });
        marker.addTo(map);
        places.push(L.latLng(lat,lon));
    })
}

function makeRoute() {
    if(routeVisible){
        map.removeControl(route);
        route = null;
        console.log(places);
    }else{
        route = L.Routing.control({ waypoints: places }).addTo(map);
    }
    routeVisible = !routeVisible;
}

function addImages(event) {

    currentPhotos = [];
    currentImageIndex = 0;

    photos.forEach(img => {
        if (img.gps[0] === event.latlng.lat && img.gps[1] === event.latlng.lng){
            currentPhotos.push(img);
        }
    })
    console.log(currentPhotos)
    console.log(currentPhotos)
    console.log(currentPhotos)
}

function openModal(index){

    document.getElementById("myModal").style.display = "block";
    console.log(currentPhotos)
    console.log(index)
    document.getElementById("modalImg").src = currentPhotos[index].url;
    document.getElementById("pictureName").innerHTML = currentPhotos[index].title;
    document.getElementById("pictureDescription").innerHTML = currentPhotos[index].description;
    document.getElementById("pictureDate").innerHTML = "(" + currentPhotos[index].timestamp + ")";
    openedPhoto = index;
    document.getElementById("map").style.zIndex = 0;
}
function closeModal(){
    document.getElementById("myModal").style.display = "none";
    openedPhoto = 0;
}

function leftPhoto(){
    openedPhoto--;
    if (openedPhoto === -1){
        openedPhoto = currentPhotos.length-1;
    }
    document.getElementById("modalImg").src = currentPhotos[openedPhoto].url;
    document.getElementById("pictureName").innerHTML = currentPhotos[openedPhoto].title;
    document.getElementById("pictureDescription").innerHTML = currentPhotos[openedPhoto].description;
    document.getElementById("pictureDate").innerHTML = "(" + currentPhotos[openedPhoto].timestamp + ")";
}

function rightPhoto(){
    openedPhoto++;
    if (openedPhoto === currentPhotos.length){
        openedPhoto = 0;
    }
    document.getElementById("modalImg").src = currentPhotos[openedPhoto].url;
    document.getElementById("pictureName").innerHTML = currentPhotos[openedPhoto].title;
    document.getElementById("pictureDescription").innerHTML = currentPhotos[openedPhoto].description;
    document.getElementById("pictureDate").innerHTML = "(" + currentPhotos[openedPhoto].timestamp + ")";
}


getImages();