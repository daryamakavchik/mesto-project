import "../pages/index.css";
import { fetchGetUserInfo, fetchInitialCards } from "./api.js";
import { createCard,
  handleAddCardFormSubmit,
  handleDeleteCardButtonClick,
  openAddCardPopup } from "./card";
import {
  openProfilePopup,
  handleProfileFormSubmit,
  openEditProfilePic,
  handleEditProfilePic,
} from "./modal.js";
import { enableValidation } from "./validate.js";
import { closePopup } from "./utils.js";

const popups = document.querySelectorAll(".popup");
const profileForm = document.querySelector("#profileform");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePicForm = document.querySelector("#profilepicform");
const editProfilePicButton = document.querySelector("#editprofilepicbutton");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileImage = document.querySelector(".profile__image");

const addCardForm = document.querySelector("#addcardform");
const addCardButton = document.querySelector(".profile__add-button");
const deleteCardButton = document.querySelector("#deletecardbutton");

const elements = document.querySelector(".elements");

Promise.all([fetchGetUserInfo(), fetchInitialCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileImage.src = userData.avatar;

    const cards = cardsData.map((card) => createCard(card, userData._id));
    elements.prepend(...cards);
  })
  .catch((err) => console.log(err));

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

profileForm.addEventListener("submit", handleProfileFormSubmit);
editProfileButton.addEventListener("click", openProfilePopup);
editProfilePicForm.addEventListener("submit", handleEditProfilePic);
editProfilePicButton.addEventListener("click", openEditProfilePic);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addCardButton.addEventListener("click", openAddCardPopup);
deleteCardButton.addEventListener('click', handleDeleteCardButtonClick);
