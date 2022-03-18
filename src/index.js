
const editProfileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup__profile");
const closeProfilePopupButton = profilePopup.querySelector(".popup_close");

const addFormInput = document.querySelector("#addform");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup__add-card");
const closeAddCardPopupButton = addCardPopup.querySelector(".popup_close");

const formInput = document.querySelector(".form");
const imagePopup = document.querySelector(".popup-image");

import { initialCardData } from "./components/initialcarddata.js";
import { addInitialCardData } from "./components/card.js";
import {
  openProfilePopup,
  savePopupEdit,
  onAddCardPopupOverlayClick,
  onCloseAddCardButtonClick,
  openAddCardPopup,
  addNewCard,
  onImageOverlayClick,
  onCloseImageButtonClick,
  onProfilePopupOverlayClick,
  onCloseProfilePopupButtonClick,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";

addInitialCardData(initialCardData);
enableValidation(formInput);

editProfileButton.addEventListener("click", openProfilePopup);
profilePopup.addEventListener("click", onProfilePopupOverlayClick);
closeProfilePopupButton.addEventListener("click", onCloseProfilePopupButtonClick);

addFormInput.addEventListener("submit", addNewCard);
addCardButton.addEventListener("click", openAddCardPopup);
addCardPopup.addEventListener('click', onAddCardPopupOverlayClick);
closeAddCardPopupButton.addEventListener("click", onCloseAddCardButtonClick);

imagePopup.addEventListener("click", onImageOverlayClick);
formInput.addEventListener("submit", savePopupEdit);