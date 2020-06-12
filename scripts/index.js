const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const closeSearch = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide");/*aqui, remove a class .hide da div #modal */
});

closeSearch.addEventListener("click", () => {
  modal.classList.add("hide");
});