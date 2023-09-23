// app.js
document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generateButton");
  const fortuneText = document.getElementById("fortuneText");
  const loader = document.querySelector(".loader-container");

  loader.style.display = "none";

  generateButton.addEventListener("click", async () => {
    generateButton.disabled = true;
    loader.style.display = "block";

    try {
      // Make a GET request to your server's endpoint, which will proxy the external API
      const response = await fetch("/get-fortune");
      const data = await response.json();

      // Display the fortune to the user
      fortuneText.textContent = data.fortune;
    } catch (error) {
      console.error("Error fetching fortune:", error);
    }

    generateButton.disabled = false;
    loader.style.display = "none";
  });
});
