////views\contactPage\contactMain.js
// Load footer
fetch("components/footer/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

document.addEventListener("DOMContentLoaded", function () {
  // Focus and blur effects for form elements
  const formGroups = document.querySelectorAll(".form-group");

  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea");

    input.addEventListener("focus", () => {
      group.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        group.classList.remove("focused");
      }
    });

    // Check initial state (for browser autofill)
    if (input.value.trim() !== "") {
      group.classList.add("focused");
    }
  });

  // Form progress bar
  const progressBar = document.querySelector(".form-progress-bar");
  const formInputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea"
  );
  const totalInputs = formInputs.length;

  function updateProgress() {
    let filledInputs = 0;
    formInputs.forEach((input) => {
      if (input.value.trim() !== "") {
        filledInputs++;
      }
    });

    const progressPercent = (filledInputs / totalInputs) * 100;
    progressBar.style.width = progressPercent + "%";
  }

  formInputs.forEach((input) => {
    input.addEventListener("input", updateProgress);
  });

  // Initial check for any pre-filled values
  updateProgress();

  // Form validation
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      // Validate each field
      formGroups.forEach((group) => {
        const input = group.querySelector("input, textarea");
        const errorMessage = group.querySelector(".error-message");

        if (input.required && input.value.trim() === "") {
          group.classList.add("error");
          isValid = false;
        } else {
          group.classList.remove("error");

          // Additional validation for email
          if (input.type === "email" && input.value.trim() !== "") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
              group.classList.add("error");
              errorMessage.textContent = "Vui lòng nhập địa chỉ email hợp lệ";
              isValid = false;
            }
          }
        }
      });

      if (isValid) {
        // Form is valid, you can submit it here
        console.log("Form submitted successfully");
        // You can add AJAX submission here if needed
      }
    });
  }
});
