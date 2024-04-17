console.log("loaded");

let gallery = document.getElementById("gallery");
let filter = document.getElementById("filter");
let photos = null;
let currentPhotos = [];
let openedPhoto = 0;
let slideshow = false;




filter.addEventListener('input', (event) => {
    let sstring = event.target.value.toLowerCase();
    currentPhotos = photos;

    if (sstring.length > 0){
        currentPhotos = [];
        photos.forEach(image =>{
            if (image.title.toLowerCase().includes(sstring)
                || image.description.toLowerCase().includes(sstring)
            ) {
                currentPhotos.push(image)
            }
        })
    }
    makeGallery(currentPhotos);
})

function getImages(){
    fetch("images.json").then(response =>{
        if(response.ok){
            return response.json();
        }
        return null;
    }).then(result =>{
        if (result != null){
            photos = result.images;
            currentPhotos = photos;
            makeGallery(photos);
        } else {
            console.error("response is empty");
        }
    })
}

function makeGallery(photos){
    gallery.replaceChildren();
    photos.forEach((img, currentIndex) => {
        let thumbnail = document.createElement('img')
        thumbnail.src = img.url;
        thumbnail.alt = img.description;
        thumbnail.classList.add('thumbnail');
        thumbnail.addEventListener("click", function(){
            openModal(currentIndex);
        })
        gallery.appendChild(thumbnail);
    })
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

function validateSlideshow(){
    if (slideshow === false){
        myTimer = setInterval("rightPhoto()",2000);
        slideshow = true;
        document.getElementById("slideshow").innerHTML = "STOP"
    } else {
        document.getElementById("slideshow").innerHTML = "Slideshow"
        clearInterval(myTimer);
        slideshow = false;
    }
}

getImages();