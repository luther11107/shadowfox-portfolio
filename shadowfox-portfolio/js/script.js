// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const formStatus = document.getElementById("form-status");


// =========================
// ERROR HANDLING
// =========================

function setError(input, errorElement, message) {
    input.classList.add("invalid");
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    input.classList.remove("invalid");
    errorElement.textContent = "";
}


// =========================
// VALIDATION
// =========================

function validateName() {
    const name = nameInput.value.trim();

    if (name === "") {
        setError(
            nameInput,
            nameError,
            "Please enter your name."
        );
        return false;
    }

    if (name.length < 2) {
        setError(
            nameInput,
            nameError,
            "Name must contain at least 2 characters."
        );
        return false;
    }

    clearError(nameInput, nameError);
    return true;
}


function validateEmail() {
    const email = emailInput.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        setError(
            emailInput,
            emailError,
            "Please enter your email address."
        );
        return false;
    }

    if (!emailPattern.test(email)) {
        setError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );
        return false;
    }

    clearError(emailInput, emailError);
    return true;
}


function validateMessage() {
    const message = messageInput.value.trim();

    if (message === "") {
        setError(
            messageInput,
            messageError,
            "Please enter a message."
        );
        return false;
    }

    if (message.length < 10) {
        setError(
            messageInput,
            messageError,
            "Message must contain at least 10 characters."
        );
        return false;
    }

    clearError(messageInput, messageError);
    return true;
}


// =========================
// LIVE VALIDATION
// =========================

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);


// =========================
// FORM SUBMISSION
// =========================

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
        formStatus.textContent =
            "Please fix the errors above.";

        formStatus.className =
            "form-status error";

        return;
    }

    formStatus.textContent =
        "Sending message...";

    formStatus.className =
        "form-status";


    const formData = new FormData(contactForm);


    try {
        const response = await fetch(
            contactForm.action,
            {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            }
        );


        if (response.ok) {

            formStatus.textContent =
                "Message sent successfully. Thanks for reaching out!";

            formStatus.className =
                "form-status success";


            contactForm.reset();


            clearError(
                nameInput,
                nameError
            );

            clearError(
                emailInput,
                emailError
            );

            clearError(
                messageInput,
                messageError
            );

        } else {

            formStatus.textContent =
                "Something went wrong. Please try again.";

            formStatus.className =
                "form-status error";
        }

    } catch (error) {

        formStatus.textContent =
            "Unable to send the message. Please try again later.";

        formStatus.className =
            "form-status error";
    }
});


// =========================
// MOBILE NAVIGATION
// =========================

const menuButton =
    document.querySelector(".menu-btn");

const navLinks =
    document.querySelector(".nav-links");


menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuButton.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("active")
    );
});


// Close mobile menu after clicking a link

document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        });

    });