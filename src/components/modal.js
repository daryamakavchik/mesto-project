import { openPopup, closePopup } from "./utils.js";
import { createCard } from "./card.js";

const elements = document.querySelector(".elements");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const userName = document.querySelector("#username");
const userNameInfo = document.querySelector("#usernameinfo");
const profilePopup = document.querySelector(".popup__profile");
const popupContainer = document.querySelector(".popup__container");
const addCardPopup = document.querySelector(".popup__add-card");
const imagePopup = document.querySelector(".popup-image");
const popUpImage = document.querySelector(".popup-image__image");

function onProfilePopupClick() {
  userName.value = profileTitle.textContent;
  userNameInfo.value = profileSubtitle.textContent;
  openPopup(profilePopup);
}

function onSaveProfilePopupClick(evt) {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = userNameInfo.value;
  closePopup(profilePopup);
}

function onProfilePopupOverlayClick(evt) {
  if (evt.target === profilePopup && evt.target !== popupContainer) {
    closePopup(profilePopup);
  }
}

function onCloseProfilePopupButtonClick() {
  closePopup(profilePopup);
}

function onAddCardButtonClick() {
  openPopup(addCardPopup);
}

function onAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = placename.value;
  const link = `${imagelink.value}`;
  elements.prepend(createCard(name, link));
  imagelink.value = "";
  placename.value = "";
  onCloseAddCardButtonClick(evt);
}

function onAddCardPopupOverlayClick(evt) {
  if (evt.target === addCardPopup && evt.target !== popupContainer) {
    closePopup(addCardPopup);
  }
}

function onCloseAddCardButtonClick(evt) {
  closePopup(addCardPopup);
}

function openImagePopup() {
  openPopup(imagePopup);
}

function closeImagePopup() {
  closePopup(imagePopup);
}

function onImagePopupOverlayClick(evt) {
  if (evt.target === imagePopup && evt.target !== popUpImage) {
    closePopup(imagePopup);
  }
}

export {
  onProfilePopupClick,
  onSaveProfilePopupClick,
  onAddCardButtonClick,
  onAddCardFormSubmit,
  onAddCardPopupOverlayClick,
  onCloseAddCardButtonClick,
  openImagePopup,
  closeImagePopup,
  onImagePopupOverlayClick,
  onProfilePopupOverlayClick,
  onCloseProfilePopupButtonClick,
};
