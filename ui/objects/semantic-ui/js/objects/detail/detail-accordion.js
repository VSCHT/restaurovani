
const accordionTitles = document.querySelectorAll(".title");
const accordionContents = document.querySelectorAll(".content");

accordionTitles.forEach((title, index) => {
  title.addEventListener("click", () => {
    title.classList.toggle("active");
    if (accordionContents[index].style.display === "flex") {
      accordionContents[index].style.display = "none";
    } else {
      accordionContents[index].style.display = "flex";
      accordionContents[index].style.flexDirection = "column";
    }
  });
});