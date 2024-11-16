$(document).ready(function () {
    let loginForm = $('#login-form');
    let signupForm = $('#signup-form');
    let showSignupLink = $('#show-signup');
    let showLoginLink = $('#show-login');
    showSignupLink.on('click', function (e) {
        e.preventDefault();
        loginForm.addClass('hidden');
        signupForm.removeClass('hidden');
    });
    showLoginLink.on('click', function (e) {
        e.preventDefault();
        signupForm.addClass('hidden');
        loginForm.removeClass('hidden');
    });
});