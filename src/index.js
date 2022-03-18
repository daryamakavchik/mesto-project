const form = document.querySelector(".form");

const profileForm = document.querySelector("#profileform");
const profilePopup = document.querySelector(".popup__profile");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfilePopupButton = profilePopup.querySelector(".popup_close");

const addCardForm = document.querySelector("#addcardform");
const addCardPopup = document.querySelector(".popup__add-card");
const addCardButton = document.querySelector(".profile__add-button");
const closeAddCardPopupButton = addCardPopup.querySelector(".popup_close");

const imagePopup = document.querySelector(".popup-image");

import { initialCardData } from "./components/initialcarddata.js";
import { addInitialCardData } from "./components/card.js";
import {
  openProfilePopup,
  saveProfilePopup,
  onAddCardButtonClick,
  onAddCardPopupOverlayClick,
  onCloseAddCardButtonClick,
  onAddCardFormSubmit,
  onImagePopupOverlayClick,
  onProfilePopupOverlayClick,
  onCloseProfilePopupButtonClick,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";

addInitialCardData(initialCardData);
enableValidation(form);

editProfileButton.addEventListener("click", openProfilePopup);
profilePopup.addEventListener("click", onProfilePopupOverlayClick);
closeProfilePopupButton.addEventListener("click", onCloseProfilePopupButtonClick);

addCardForm.addEventListener("submit", onAddCardFormSubmit);
addCardButton.addEventListener("click", onAddCardButtonClick);
addCardPopup.addEventListener('click', onAddCardPopupOverlayClick);
closeAddCardPopupButton.addEventListener("click", onCloseAddCardButtonClick);

imagePopup.addEventListener("click", onImagePopupOverlayClick);
profileForm.addEventListener("submit", saveProfilePopup);