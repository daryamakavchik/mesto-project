import { openImagePopup } from "./modal.js";

const cardTemplate = document.querySelector("#cardtemplate").content;
const popupImage = document.querySelector(".popup-image__image");
const popupImageCaption = document.querySelector(".popup-image__caption");

function createCard(name, link, id, ownerid, likes, myId) {
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardDeleteButton = cardElement.querySelector(
    ".elements__delete-button"
  );
  const cardLikeButton = cardElement.querySelector(".elements__icon");
  const cardLikes = cardElement.querySelector(".elements__icon-likes");
  const cardText = cardElement.querySelector(".elements__text");

  cardImage.alt = name;
  cardImage.src = link;
  cardText.textContent = name;
  cardLikes.textContent = `${likes.length}`;

  if (likes.some(like => like._id === myId)) {
    cardLikeButton.classList.add("elements__icon_active");
  }

  if (ownerid === myId) {
    cardDeleteButton.style.display = "block";
  } else {
    cardDeleteButton.style.display = "none";
  }

  cardImage.addEventListener("click", function () {
    popupImage.alt = name;
    popupImage.src = cardImage.src;
    popupImageCaption.textContent = name;
    openImagePopup();
  });

  cardDeleteButton.addEventListener("click", function deleteCard(evt) {
    fetch(`https://nomoreparties.co/v1/plus-cohort-8/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
      },
    });
    evt.target.closest(".elements__element").remove();
  });

  cardLikeButton.addEventListener("click", function handleLikes(evt) {
    if (likes.some(like => like._id === myId)) {
      fetch(`https://nomoreparties.co/v1/plus-cohort-8/cards/likes/${id}`, {
        method: "DELETE",
        headers: {
          authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
        },
      });
      evt.target.classList.remove("elements__icon_active");
      cardLikes.textContent = `${likes.length - 1}`;
    } else {
      fetch(`https://nomoreparties.co/v1/plus-cohort-8/cards/likes/${id}`, {
        method: "PUT",
        headers: {
          authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
        },
      });
      evt.target.classList.add("elements__icon_active"); 
      cardLikes.textContent = `${likes.length + 1}`;
    }
  });

  return cardElement;
}


export { createCard }
