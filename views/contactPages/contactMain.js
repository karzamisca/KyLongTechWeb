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

    if (input) {
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
    // Also update on change for autocomplete
    input.addEventListener("change", updateProgress);
  });

  // Initial check for any pre-filled values
  updateProgress();

  // Form message display functions
  function showMessage(type, message) {
    const messagesContainer = document.getElementById("form-messages");

    // Clear previous messages
    messagesContainer.innerHTML = "";

    // Create message element
    const messageElement = document.createElement("div");
    messageElement.className =
      type === "success" ? "success-message" : "form-error-message";
    messageElement.textContent = message;

    // Add to container
    messagesContainer.appendChild(messageElement);

    // Scroll to message
    messageElement.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Remove message after delay
    setTimeout(() => {
      messageElement.classList.add("fade-out");
      setTimeout(() => {
        if (messagesContainer.contains(messageElement)) {
          messagesContainer.removeChild(messageElement);
        }
      }, 500);
    }, 5000);
  }

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
              if (errorMessage) {
                errorMessage.textContent = "Vui lòng nhập địa chỉ email hợp lệ";
              }
              isValid = false;
            }
          }

          // Additional validation for phone (optional)
          if (input.type === "tel" && input.value.trim() !== "") {
            // Basic phone validation - adjust according to Vietnamese phone number format
            const phoneRegex = /^[0-9+\s()-]{10,15}$/;
            if (!phoneRegex.test(input.value.trim())) {
              group.classList.add("error");
              if (errorMessage) {
                errorMessage.textContent = "Vui lòng nhập số điện thoại hợp lệ";
              }
              isValid = false;
            }
          }
        }
      });

      if (isValid) {
        // Get form data
        const formData = new FormData(contactForm);
        const formDataObject = {};

        // Convert FormData to a regular object
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });

        // Show loading state
        const submitButton = contactForm.querySelector(".submit-button");
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = "Đang gửi...";
        submitButton.disabled = true;

        // Send AJAX request
        fetch("/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataObject),
        })
          .then((response) => {
            if (!response.ok) {
              // If status is not 2xx, treat as error
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            if (data.success) {
              // Show success message
              showMessage("success", data.message);

              // Reset form and progress bar
              contactForm.reset();
              updateProgress();

              // Reset focus states
              formGroups.forEach((group) => {
                group.classList.remove("focused");
              });
            } else {
              // Show error message
              showMessage("error", data.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            // Show error message
            showMessage(
              "error",
              "Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau."
            );
          });
      }
    });
  }
});
