document.addEventListener("DOMContentLoaded", () => {
    // Selectors
    let likeButtons = document.querySelectorAll(".like-btn");
    let commentButtons = document.querySelectorAll(".comment-btn");
    let profilePicture = document.getElementById("current-profile-picture");
    let updateProfileButton = document.getElementById("update-profile-picture-btn");
    let Name= localStorage.getItem('active');
    document.getElementById('Name').innerHTML=Name;

    // Handle View Profile Picture
    profilePicture.addEventListener("click", () => {
        let modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "1000";

        let modalImage = document.createElement("img");
        modalImage.src = profilePicture.src;
        modalImage.style.width = "300px";
        modalImage.style.height = "300px";
        modalImage.style.borderRadius = "50%";
        modalImage.style.boxShadow = "0 0 15px white";

        modal.appendChild(modalImage);

        modal.addEventListener("click", () => {
            modal.remove(); // Close the modal on click
        });

        document.body.appendChild(modal); 
    });

    updateProfileButton.addEventListener("click", () => {
        let fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*"; 

        fileInput.addEventListener("change", (e) => {
            let file = e.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = (event) => {
                    profilePicture.src = event.target.result; 
                };
                reader.readAsDataURL(file);
            }
        });

        fileInput.click(); 
    });
    
});
