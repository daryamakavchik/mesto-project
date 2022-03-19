import "../pages/index.css";
import { initialCardData } from "./initialcarddata.js";
import { addInitialCardData } from "./card.js";
import {
  onProfilePopupClick,
  onSaveProfilePopupClick,
  onAddCardButtonClick,
  onAddCardPopupOverlayClick,
  onCloseAddCardButtonClick,
  onAddCardFormSubmit,
  onImagePopupOverlayClick,
  onProfilePopupOverlayClick,
  onCloseProfilePopupButtonClick,
} from "./modal.js";
import { enableValidation } from "./validate.js";

const profileForm = document.querySelector("#profileform");
const profilePopup = document.querySelector(".popup__profile");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfilePopupButton = profilePopup.querySelector(".popup_close");

const addCardForm = document.querySelector("#addcardform");
const addCardPopup = document.querySelector(".popup__add-card");
const addCardButton = document.querySelector(".profile__add-button");
const closeAddCardPopupButton = addCardPopup.querySelector(".popup_close");

const imagePopup = document.querySelector(".popup-image");

addInitialCardData(initialCardData);
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-submit",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__button-submit_disabled",
});

profileForm.addEventListener("submit", onSaveProfilePopupClick);
editProfileButton.addEventListener("click", onProfilePopupClick);
profilePopup.addEventListener("click", onProfilePopupOverlayClick);
closeProfilePopupButton.addEventListener(
  "click",
  onCloseProfilePopupButtonClick
);

addCardForm.addEventListener("submit", onAddCardFormSubmit);
addCardButton.addEventListener("click", onAddCardButtonClick);
addCardPopup.addEventListener("click", onAddCardPopupOverlayClick);
closeAddCardPopupButton.addEventListener("click", onCloseAddCardButtonClick);

imagePopup.addEventListener("click", onImagePopupOverlayClick);
