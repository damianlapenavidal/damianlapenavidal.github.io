document.addEventListener("DOMContentLoaded", function () {
  const connectLinks = document.querySelectorAll('a[href="#Follow"]');
  const followContent = document.querySelector(".follow-content");

  connectLinks.forEach(link => {
    link.addEventListener("click", function () {
      // Delay to allow scroll to finish
      setTimeout(() => {
        followContent.classList.add("glow-effect");

        // Remove class after animation completes
        setTimeout(() => {
          followContent.classList.remove("glow-effect");
        }, 2000);
      }, 400);
    });
  });
});
