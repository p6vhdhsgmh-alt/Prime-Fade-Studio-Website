var contactForm = document.querySelector("form");
var contactName = document.getElementById("contact-name");
var contactEmail = document.getElementById("contact-email");
var messageType = document.getElementById("message-type");
var contactMessage = document.getElementById("contact-message");
var contactResponse = document.getElementById("contact-response");

function showContactError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearContactErrors() {
    showContactError("contact-name-error", "");
    showContactError("contact-email-error", "");
    showContactError("message-type-error", "");
    showContactError("contact-message-error", "");
    contactResponse.textContent = "";
}   

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearContactErrors();

    var isValid = true;

    if (contactName.value.trim().length < 2) {
        showContactError("contact-name-error", "Please enter your name.");
        isValid = false;
    }

    if (!contactEmail.checkValidity()) {
        showContactError("contact-email-error", "Please enter a valid email address.");
        isValid = false;
    }   

    if (messageType.value === "") {
        showContactError("message-type-error", "Please select a message type.");
        isValid = false;
    }

    if (contactMessage.value.trim().length < 10) {
        showContactError("contact-message-error", "Please enter a message of at least 10 characters.");
        isValid = false;
    }   

    if (isValid === false) {
        return;
    }

    var recipient = "primefade07@gmail.com";
    var subject = "Prime Fade Studio - " + messageType.options[messageType.selectedIndex].text;

    var body = "Name: " + contactName.value.trim() + "\n" +
               "Email: " + contactEmail.value.trim() + "\n" +
               "Message Type: " + messageType.options[messageType.selectedIndex].text + "\n\n" +
               "Message:\n" + contactMessage.value.trim();

    var emailLink = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    contactResponse.textContent = "Your message has been prepared. If your email application does not open, use the details below.";
    
    var emailDetails = document.createElement("pre");
    emailDetails.textContent = "To: " + recipient + "\n" + "Subject: " + subject + "\n\n" + body;

    contactResponse.appendChild(emailDetails);

   var gmailLink = "https://mail.google.com/mail/?view=cm&fs=1"+ "&to=" + encodeURIComponent(recipient) + "&su=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

   window.open(gmailLink, "_blank");
});