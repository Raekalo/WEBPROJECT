$(document).ready(function () {
    let loginForm = $('#login-form');
    let signupForm = $('#signup-form');
    let showSignupLink = $('#show-signup');
    let showLoginLink = $('#show-login');
    showSignupLink.on('click', function (e) {
        e.preventDefault();
        loginForm.fadeOut(300, function () {
            signupForm.fadeIn(300);
        });
    });

    showLoginLink.on('click', function (e) {
        e.preventDefault();
        signupForm.fadeOut(300, function () {
            loginForm.fadeIn(300);
        });
    });
})
