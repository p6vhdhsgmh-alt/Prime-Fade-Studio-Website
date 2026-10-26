var enquiryForm = document.querySelector("form");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var serviceInput = document.getElementById("service");
var dateInput = document.getElementById("date");
var messageInput = document.getElementById("message");
var responseMessage = document.getElementById("enquiry-response");

// Prevent customers from selecting a date in the past
var today = new Date();
var year = today.getFullYear();
var month = String(today.getMonth() + 1).padStart(2, "0");
var day = String(today.getDate()).padStart(2, "0");

dateInput.min = year + "-" + month + "-" + day;

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    showError("name-error", "");
    showError("email-error", "");
    showError("service-error", "");
    showError("date-error", "");
    responseMessage.textContent = "";
}

enquiryForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors();

    var isValid = true;

    if (nameInput.value.trim().length < 2) {
        showError("name-error", "Please enter your full name.");
        isValid = false;
    }

    if (!emailInput.checkValidity()) {
        showError("email-error", "Please enter a valid email address.");
        isValid = false;
    }

    if (serviceInput.value === "") {
        showError("service-error", "Please select a service.");
        isValid = false;
    }

    if (dateInput.value === "" || dateInput.value < dateInput.min) {
        showError("date-error", "Please select today or a future date.");
        isValid = false;
    }

    if (isValid === false) {
        return;
    }

    var serviceName = serviceInput.options[serviceInput.selectedIndex].text;
    var servicePrice = 0;

    if (serviceInput.value === "classic") {
        servicePrice = 120;
    } else if (serviceInput.value === "taper") {
        servicePrice = 150;
    } else if (serviceInput.value === "skin") {
        servicePrice = 170;
    } else if (serviceInput.value === "beard") {
        servicePrice = 80;
    } else if (serviceInput.value === "package") {
        servicePrice = 210;
    }

    responseMessage.textContent = "Submitting your enquiry...";

    fetch("https://formsubmit.co/ajax/primefade07@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            service: serviceName,
            estimatedPrice: "R" + servicePrice,
            preferredDate: dateInput.value,
            message: messageInput.value.trim(),
            _subject: "New Prime Fade Studio Service Enquiry"
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        if (data.success === "true" || data.success === true) {
            responseMessage.textContent = "FormSubmit response indicates success.";
        } else {
            responseMessage.textContent = "FormSubmit response: " + JSON.stringify(data);
        }
        
    })
    .catch(function(error) {
        responseMessage.textContent =
            "Submission error: " + error.message;
    });
});
