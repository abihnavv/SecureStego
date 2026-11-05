function togglePassword(id) {

    const passwordField = document.getElementById(id);

    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

function copyMessage() {

    const message = document.getElementById("secretMessage");

    navigator.clipboard.writeText(message.value)
        .then(() => {
            document.getElementById("copyStatus").innerText =
                "Message copied successfully!";
        })
        .catch(() => {
            document.getElementById("copyStatus").innerText =
                "Unable to copy message.";
        });
}

// Show popup notification
document.addEventListener("DOMContentLoaded", function () {

    const toast = document.getElementById("toast");

    if (toast) {

        // Show popup
        setTimeout(function () {
            toast.classList.add("show");
        }, 100);

        // Hide popup after 3 seconds
        setTimeout(function () {
            toast.classList.remove("show");
        }, 3100);

    }

});

// Show loading animation when form is submitted
document.addEventListener("DOMContentLoaded", function () {

    const forms = document.querySelectorAll(
        'form[action="/encode"], form[action="/decode"]'
    );

    forms.forEach(function (form) {

        form.addEventListener("submit", function () {

            const loadingScreen = document.getElementById("loadingScreen");

            if (loadingScreen) {
                loadingScreen.classList.add("active");
            }

        });

    });

});

// Image Preview and Drag-and-Drop
document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const previewImage = document.getElementById("previewImage");
    const previewText = document.getElementById("previewText");
    const dropArea = document.getElementById("dropArea");
    const uploadInstructions = document.getElementById("uploadInstructions");
    const imagePreview = document.querySelector(".image-preview");

    if (!imageInput || !dropArea) return;

    let currentImageURL = null;

    function showPreview(file) {
        if (!file) return;

        const allowedTypes = imageInput.accept.split(",");

        if (!allowedTypes.includes(file.type)) {
            alert("Please select a valid image.");
            imageInput.value = "";
            return;
        }

        // Remove previous preview URL
        if (currentImageURL) {
            URL.revokeObjectURL(currentImageURL);
        }

        // Create image preview
        currentImageURL = URL.createObjectURL(file);
        previewImage.src = currentImageURL;

        // Show image inside upload box
        imagePreview.style.display = "block";
        previewImage.style.display = "block";
        previewText.style.display = "none";

        // Hide upload instructions
        uploadInstructions.style.display = "none";
    }

    // File selection
    imageInput.addEventListener("change", function () {
        showPreview(this.files[0]);
    });

    // Drag over
    dropArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropArea.classList.add("dragover");
    });

    // Drag leave
    dropArea.addEventListener("dragleave", function () {
        dropArea.classList.remove("dragover");
    });

    // Drop image
    dropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        dropArea.classList.remove("dragover");

        const file = e.dataTransfer.files[0];

        if (file) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            imageInput.files = dataTransfer.files;

            showPreview(file);
        }
    });
});

// Password Strength Indicator
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const strengthFill = document.getElementById("strengthFill");
    const strengthText = document.getElementById("strengthText");

    if (!passwordInput || !strengthFill || !strengthText) return;

    passwordInput.addEventListener("input", function () {
        const password = this.value;

        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;

        if (password.length === 0) {
            strengthFill.style.width = "0%";
            strengthText.innerText = "Password strength: Not entered";
        }
        else if (score <= 2) {
            strengthFill.style.width = "30%";
            strengthFill.style.background = "#ff4444";
            strengthText.innerText = "Password strength: Weak";
        }
        else if (score === 3) {
            strengthFill.style.width = "65%";
            strengthFill.style.background = "#ff9800";
            strengthText.innerText = "Password strength: Medium";
        }
        else {
            strengthFill.style.width = "100%";
            strengthFill.style.background = "#00ff99";
            strengthText.innerText = "Password strength: Strong";
        }
    });
});