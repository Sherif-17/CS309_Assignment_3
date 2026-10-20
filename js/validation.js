// Registration form validation

const form = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const ageInput = document.getElementById("age");
const successMsg = document.getElementById("form-success");

// Show an error message under a field
function showError(input, message) {
    const error = document.getElementById(input.id + "-error");
    error.textContent = message;
    input.classList.add("invalid");
}

// Clear the error message under a field
function clearError(input) {
    const error = document.getElementById(input.id + "-error");
    error.textContent = "";
    input.classList.remove("invalid");
}

function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
        showError(nameInput, "Name is required.");
        return false;
    }
    if (value.length < 3) {
        showError(nameInput, "Name must be at least 3 characters.");
        return false;
    }
    clearError(nameInput);
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
        showError(emailInput, "Email is required.");
        return false;
    }
    if (!emailPattern.test(value)) {
        showError(emailInput, "Please enter a valid email.");
        return false;
    }
    clearError(emailInput);
    return true;
}

function validatePassword() {
    const value = passwordInput.value;
    if (value === "") {
        showError(passwordInput, "Password is required.");
        return false;
    }
    if (value.length < 8) {
        showError(passwordInput, "Password must be at least 8 characters.");
        return false;
    }
    clearError(passwordInput);
    return true;
}

function validateConfirm() {
    const value = confirmInput.value;
    if (value === "") {
        showError(confirmInput, "Please confirm your password.");
        return false;
    }
    if (value !== passwordInput.value) {
        showError(confirmInput, "Passwords do not match.");
        return false;
    }
    clearError(confirmInput);
    return true;
}

function validateAge() {
    const value = ageInput.value.trim();
    const age = Number(value);
    if (value === "") {
        showError(ageInput, "Age is required.");
        return false;
    }
    if (!Number.isInteger(age) || age < 13 || age > 120) {
        showError(ageInput, "Age must be a whole number between 13 and 120.");
        return false;
    }
    clearError(ageInput);
    return true;
}

// Check each field while the user types
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", function () {
    validatePassword();
    if (confirmInput.value !== "") {
        validateConfirm();
    }
});
confirmInput.addEventListener("input", validateConfirm);
ageInput.addEventListener("input", validateAge);

// Stop the form from submitting if any field is invalid
form.addEventListener("submit", function (event) {
    event.preventDefault();
    successMsg.textContent = "";

    // Run every check so all errors show at once
    const results = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirm(),
        validateAge()
    ];

    if (results.includes(false)) {
        return;
    }

    successMsg.textContent = "Registration successful!";
    form.reset();
});

// Clear errors when the form is reset
form.addEventListener("reset", function () {
    [nameInput, emailInput, passwordInput, confirmInput, ageInput].forEach(clearError);
});
