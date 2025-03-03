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
});
