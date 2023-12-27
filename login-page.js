const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        // If the credentials are valid, show an alert box and redirect to about.html
        // alert("You have successfully logged in.");
        window.location.href = 'about.html'; // Redirect to about.html after successful login
    } else {
        // Otherwise, make the login error message show
        loginErrorMsg.style.opacity = 1;
    }
});
