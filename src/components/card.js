import { openImagePopup } from "./modal.js";

const elements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#cardtemplate").content;
const popupImage = document.querySelector(".popup-image__image");
const popupImageCaption = document.querySelector(".popup-image__caption");

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
    popupImage.alt = name;
    popupImage.src = cardImage.src;
    popupImageCaption.textContent = name;
    openImagePopup();
  });

  return cardElement;
}

function pressLike(evt) {
  evt.target.classList.toggle("elements__icon_active");
}

function deleteCard(evt) {
  evt.target.closest(".elements__element").remove();
}

export { addInitialCardData, createCard };
