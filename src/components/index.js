import "../pages/index.css";
import { initialCardData } from "./initialCardData.js";
import { addInitialCardData } from "./card.js";
import {
  openProfilePopup,
  handleProfileFormSubmit,
  openAddCardPopup,
  handleAddCardFormSubmit,
} from "./modal.js";
import { enableValidation } from "./validate.js";
import { closePopup } from "./utils";


const popups = document.querySelectorAll('.popup');
const profileForm = document.querySelector("#profileform");
const editProfileButton = document.querySelector(".profile__edit-button");

const addCardForm = document.querySelector("#addcardform");
const addCardButton = document.querySelector(".profile__add-button");

addInitialCardData(initialCardData);
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-submit",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__button-submit_disabled",
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
})

profileForm.addEventListener("submit", handleProfileFormSubmit);
editProfileButton.addEventListener("click", openProfilePopup);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addCardButton.addEventListener("click", openAddCardPopup);
