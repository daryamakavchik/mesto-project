import "../pages/index.css";
import { getUserInfo } from "./app.js";
import {
  openProfilePopup,
  handleProfileFormSubmit,
  openAddCardPopup,
  openEditProfilePic,
  handleAddCardFormSubmit,
  handleEditProfilePic,
} from "./modal.js";
import { enableValidation } from "./validate.js";
import { closePopup } from "./utils";

const popups = document.querySelectorAll(".popup");
const profileForm = document.querySelector("#profileform");
const editProfileButton = document.querySelector(".profile__edit-button");

const addCardForm = document.querySelector("#addcardform");
const addCardButton = document.querySelector(".profile__add-button");

const editProfilePicForm = document.querySelector("#profilepicform");
const editProfilePicButton = document.querySelector("#editprofilepicbutton");
const cardDeleteButtons = document.querySelectorAll(".elements__delete-button");
console.log(cardDeleteButtons);

getUserInfo();
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-submit",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "form__button-submit_disabled",
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

cardDeleteButtons.forEach(btn => btn.style.display !== 'none' ? btn.addEventListener("click", setDeleteClass) : null)
function setDeleteClass (evt) { 
  evt.target.closest(".elements__element").setAttribute('id', 'cardtodelete');
  openDeleteCardPopup(); 
};

profileForm.addEventListener("submit", handleProfileFormSubmit);
editProfileButton.addEventListener("click", openProfilePopup);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addCardButton.addEventListener("click", openAddCardPopup);

editProfilePicForm.addEventListener("submit", handleEditProfilePic);
editProfilePicButton.addEventListener("click", openEditProfilePic);


