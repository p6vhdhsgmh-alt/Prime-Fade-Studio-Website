var searchInput = document.getElementById("service-search");
var serviceCards = document.getElementsByClassName("service-card");
var searchMessage = document.getElementById("search-message");

function searchServices() {
    var searchText = searchInput.value.toLowerCase().trim();
    var matchingServices = 0;

    for (var i = 0; i < serviceCards.length; i++) {
        var serviceName = serviceCards[i].getElementsByTagName("h3")[0].textContent.toLowerCase();

        if (serviceName.indexOf(searchText) !== -1) {
            serviceCards[i].style.display = "block";
            matchingServices++;
        } else {
            serviceCards[i].style.display = "none";
        }
    }

    if (matchingServices === 0) {
        searchMessage.textContent = "No services found. Please try another search.";
    } else {
        searchMessage.textContent = "";
    }
}

searchInput.addEventListener("input", searchServices);

var serviceImages = document.querySelectorAll(".service-card img");

for (var i = 0; i < serviceImages.length; i++) {
    serviceImages[i].style.cursor = "pointer";
    
    serviceImages[i].addEventListener("click", function() {
        var lightbox = document.getElementById("image-lightbox");
        var largeImage = document.getElementById("lightbox-image");

        lightbox.style.display = "flex";
        largeImage.src = this.src;
        largeImage.alt = this.alt;
    });
}

var closeButton = document.getElementById("close-lightbox");
var lightbox = document.getElementById("image-lightbox");

closeButton.addEventListener("click", function() {
    lightbox.style.display = "none";
});