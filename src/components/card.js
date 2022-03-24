import { fetchDeleteCard, fetchHandleLikes } from "./api.js";
import { openDeleteCardPopup, openImagePopup } from "./modal.js";
import { closePopup } from "./utils.js";

const cardTemplate = document.querySelector("#cardtemplate").content;
const popupImage = document.querySelector(".popup-image__image");
const popupImageCaption = document.querySelector(".popup-image__caption");
const deleteCardPopup = document.querySelector(".popup-delete");
const cardConfirmDeleteForm = document.querySelector("#deletecardform");

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

  if (likes.some((like) => like._id === myId)) {
    cardLikeButton.classList.add("elements__icon_active");
  }

  if (ownerid === myId) {
    cardDeleteButton.style.display = "block";
  } else {
    cardDeleteButton.style.display = "none";
  }

  cardDeleteButton.addEventListener("click", function setDeleteClass (evt) {
    evt.target.closest(".elements__element").setAttribute('id', 'cardtodelete');
    openDeleteCardPopup();
  });

  cardConfirmDeleteForm.addEventListener("submit", function deleteCard (evt) {
    evt.preventDefault();
    fetchDeleteCard(id);    //////// неправильно
    document.querySelector("#cardtodelete").remove();    ////не работает?
    closePopup(deleteCardPopup);
    });

  cardImage.addEventListener("click", function () {
    popupImage.alt = name;
    popupImage.src = cardImage.src;
    popupImageCaption.textContent = name;
    openImagePopup();
  });

  cardLikeButton.addEventListener("click", function handleLikes(evt) {
    const myLike = likes.find((like) => like._id === myId);
    const method = myLike !== undefined ? "DELETE" : "PUT";
    fetchHandleLikes(method)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        likes = data.likes;

        cardLikes.textContent = `${likes.length}`;

        if (likes.some((like) => like._id === myId)) {
          cardLikeButton.classList.add("elements__icon_active");
        } else {
          cardLikeButton.classList.remove("elements__icon_active");
        }
      });
  });

  return cardElement;
}

export { createCard };
