
let toggleButtons = document.querySelectorAll(".toggle-button");

toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let content = button.nextElementSibling;
        content.classList.toggle("open");
    });
});
