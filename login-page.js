const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const isValidCredentials = validateCredentials(username, password);

    if (isValidCredentials) {
        redirectToPage("about.html");
    } else {
        showLoginError();
    }
});

function validateCredentials(username, password) {
    return username === "user" && password === "web_dev";
}

function redirectToPage(page) {
    window.location.href = page;
}

function showLoginError() {
    loginErrorMsg.style.opacity = 1;
}
