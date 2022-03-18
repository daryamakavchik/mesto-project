import { openPopup, closePopup, closeOnEsc } from "./utils.js";
import { createCard } from "./card.js";

function openProfilePopup() {
  const profileTitle = document.querySelector(".profile__title");
  const profileSubtitle = document.querySelector(".profile__subtitle");
  const userName = document.querySelector("#username");
  const userNameInfo = document.querySelector("#usernameinfo");
  userName.value = profileTitle.textContent;
  userNameInfo.value = profileSubtitle.textContent;

  const profilePopup = document.querySelector(".popup__profile");
  openPopup(profilePopup);
}

function savePopupEdit(evt) {
  evt.preventDefault();

  const profileTitle = document.querySelector(".profile__title");
  const profileSubtitle = document.querySelector(".profile__subtitle");
  const userName = document.querySelector("#username");
  const userNameInfo = document.querySelector("#usernameinfo");
  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = userNameInfo.value;

  const profilePopup = document.querySelector(".popup__profile");
  closePopup(profilePopup);
}

function onProfilePopupOverlayClick(evt) {
  const popupContainer = document.querySelector('.popup__container');
  const profilePopup = document.querySelector(".popup__profile");
  if (evt.target === profilePopup && evt.target !== popupContainer) {
    closePopup(profilePopup);
  }
}

function onCloseProfilePopupButtonClick(evt) {
  const profilePopup = document.querySelector(".popup__profile");
  closePopup(profilePopup);
}

function openAddCardPopup() {
  const addCardPopup = document.querySelector(".popup__add-card");
  openPopup(addCardPopup);
}

function addNewCard(evt) {
  evt.preventDefault();
  const elements = document.querySelector(".elements");
  const name = placename.value;
  const link = `${imagelink.value}`;
  elements.prepend(createCard(name, link));
  imagelink.value = "";
  placename.value = "";
  onCloseAddCardButtonClick(evt);
}

function onAddCardPopupOverlayClick(evt) {
  const popupContainer = document.querySelector('.popup__container');
  const addCardPopup = document.querySelector(".popup__add-card");
  if (evt.target === addCardPopup && evt.target !== popupContainer) {
    closePopup(addCardPopup);
  }
}

function onCloseAddCardButtonClick(evt){
  const addCardPopup = document.querySelector(".popup__add-card");
  closePopup(addCardPopup);
}

function openImagePopup() {
  const imagePopup = document.querySelector(".popup-image");
  openPopup(imagePopup);
  document.addEventListener("keydown", closeOnEsc);
}

function closeImagePopup() {
  const imagePopup = document.querySelector(".popup-image");
  closePopup(imagePopup);
}

function onImageOverlayClick(evt) {
  const imagePopup = document.querySelector(".popup-image");
  const popUpImage = document.querySelector(".popup-image__image");
  if (evt.target === imagePopup && evt.target !== popUpImage) {
    closePopup(imagePopup);
  }
}

function onCloseImageButtonClick(evt){
  const imagePopup = document.querySelector(".popup-image");
  closePopup(imagePopup);
}

export {
  openProfilePopup,
  savePopupEdit,
  openAddCardPopup,
  addNewCard,
  onAddCardPopupOverlayClick,
  onCloseAddCardButtonClick,
  openImagePopup,
  closeImagePopup,
  onImageOverlayClick,
  onCloseImageButtonClick,
  onProfilePopupOverlayClick,
  onCloseProfilePopupButtonClick,
};