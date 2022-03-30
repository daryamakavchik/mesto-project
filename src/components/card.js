import { fetchHandleLikes, fetchAddNewCard, fetchDeleteCard } from "./api.js";
import { openPopup, closePopup } from "./utils.js";

const popupImage = document.querySelector(".popup-image__image");
const popupImageCaption = document.querySelector(".popup-image__caption");

const cardTemplate = document.querySelector("#cardtemplate").content;

const addCardPopup = document.querySelector(".popup__add-card");
const addCardForm = document.querySelector("#addcardform");
const imageInput = document.querySelector("#imagelink");
const placeInput = document.querySelector("#placename");
const cardSubmitButton = document.querySelector("#addcardbutton");

const imagePopup = document.querySelector(".popup-image");

const elements = document.querySelector(".elements");

const deleteCardPopup = document.querySelector(".popup-delete");
const deleteCardButton = document.querySelector("#deletecardbutton");

export function createCard({name, link, _id, owner, likes}, myId) {
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

  if (owner._id === myId) {
    cardDeleteButton.addEventListener("click", function cardDelete() {
      openDeleteCardPopup(() => {
        fetchDeleteCard(_id)
          .then(() => {
            cardElement.remove();
            closePopup(deleteCardPopup);
          })
          .catch((err) => console.log(err));
      });
    });
  } else {
    cardDeleteButton.style.display = "none";
  }

  cardImage.addEventListener("click", function () {
    popupImage.alt = name;
    popupImage.src = cardImage.src;
    popupImageCaption.textContent = name;
    openImagePopup();
  });

  cardLikeButton.addEventListener("click", function handleLikes() {
    const myLike = likes.find((like) => like._id === myId);
    const method = myLike !== undefined ? "DELETE" : "PUT";
    fetchHandleLikes(_id, method)
      .then((data) => {
        likes = data.likes;
        cardLikes.textContent = `${likes.length}`;

        if (likes.some((like) => like._id === myId)) {
          cardLikeButton.classList.add("elements__icon_active");
        } else {
          cardLikeButton.classList.remove("elements__icon_active");
        }
      })
      .catch((err) => console.log(err));
  });

  return cardElement;
}

export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, cardSubmitButton);
  fetchAddNewCard(placeInput.value, imageInput.value)
    .then((card) => {
      elements.prepend(createCard(card, card.owner._id));
    })
    .then(() => {
      closePopup(addCardPopup);
      addCardForm.reset();
      cardSubmitButton.classList.add("form__button-submit_disabled");
      cardSubmitButton.disabled = true;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, cardSubmitButton));
}

export function openAddCardPopup() {
  openPopup(addCardPopup);
}

export function openImagePopup() {
  openPopup(imagePopup);
}

export function openDeleteCardPopup(onConfirm) {
  deleteCardButton.onConfirm = onConfirm;
  openPopup(deleteCardPopup);
}

export function handleDeleteCardButtonClick() {
  deleteCardButton.onConfirm();
}

function renderLoading(isLoading, someButton) {
  if (isLoading) {
    someButton.textContent = "Сохранение...";
  } else if (someButton === cardSubmitButton) {
    someButton.textContent = "Создать";
  } else {
    someButton.textContent = "Сохранить";
  }
}