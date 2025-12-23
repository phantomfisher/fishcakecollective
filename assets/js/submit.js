document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form[action*='formspree.io']");

  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // stop default submission

    // Check validity of the form
    if (!form.checkValidity()) {
      form.reportValidity(); // show built-in HTML5 messages
      return; // stop submission
    }

    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.disabled = true;
    const originalValue = submitButton.value;
    submitButton.value = "Submitting...";

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          window.location.href = "thanks.html";
        } else {
          alert("There was a problem submitting your form. Please try again.");
          submitButton.disabled = false;
          submitButton.value = originalValue;
        }
      })
      .catch(error => {
        console.error("Form submission error:", error);
        alert("There was a problem submitting your form. Please try again.");
        submitButton.disabled = false;
        submitButton.value = originalValue;
      });
  });
});
