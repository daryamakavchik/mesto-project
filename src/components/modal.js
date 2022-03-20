import { openPopup, closePopup } from "./utils.js";
import { createCard } from "./card.js";

const elements = document.querySelector(".elements");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const userName = document.querySelector("#username");
const userNameInfo = document.querySelector("#usernameinfo");
const imageInput = document.querySelector("#imagelink");
const placeInput = document.querySelector("#placename");
const profilePopup = document.querySelector(".popup__profile");
const addCardPopup = document.querySelector(".popup__add-card");
const imagePopup = document.querySelector(".popup-image");
const cardSubmitButton = document.querySelector("#addcardbutton");
const addCardForm = document.querySelector("#addcardform");

function openProfilePopup() {
  userName.value = profileTitle.textContent;
  userNameInfo.value = profileSubtitle.textContent;
  openPopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = userNameInfo.value;
  closePopup(profilePopup);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = `${imageInput.value}`;
  elements.prepend(createCard(name, link));
  closePopup(addCardPopup);
  addCardForm.reset();
  cardSubmitButton.classList.add('form__button-submit_disabled');
  cardSubmitButton.disabled = true;
}

function openImagePopup() {
  openPopup(imagePopup);
}

export {
  openProfilePopup,
  handleProfileFormSubmit,
  openAddCardPopup,
  handleAddCardFormSubmit,
  openImagePopup,
};
