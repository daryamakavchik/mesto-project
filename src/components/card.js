import { pressLike, deleteCard } from "./utils.js";
import { openImagePopup, closeImagePopup } from "./modal.js";

const elements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#cardtemplate").content;
const imagePopup = document.querySelector(".popup-image");
const popUpImage = document.querySelector(".popup-image__image");
const popUpImageCaption = document.querySelector(".popup-image__caption");

function addInitialCardData(initialCardData) {
  const cards = createCards(initialCardData);
  elements.prepend(...cards);
}

function createCards(initialCardData) {
  return initialCardData.map((data) => createCard(data.name, data.link));
}

function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardDeleteButton = cardElement.querySelector(
    ".elements__delete-button"
  );
  const cardLikeButton = cardElement.querySelector(".elements__icon");
  const cardText = cardElement.querySelector(".elements__text");

  cardImage.alt = name;
  cardImage.src = link;
  cardText.textContent = name;

  cardLikeButton.addEventListener("click", pressLike);
  cardDeleteButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", function () {
    const popUpImageCloseButton = imagePopup.querySelector(".popup_close");
    popUpImage.alt = name;
    popUpImage.src = cardImage.src;
    popUpImageCaption.textContent = name;
    openImagePopup();
    popUpImageCloseButton.addEventListener("click", closeImagePopup);
  });

  return cardElement;
}

export { addInitialCardData, createCard };
