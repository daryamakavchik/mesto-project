import { openPopup, closePopup } from "./utils.js";
import { fetchSetAvatar, fetchSetUserInfo, fetchAddNewCard } from "./api.js";

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const username = document.querySelector("#username");
const usernameInfo = document.querySelector("#usernameinfo");
const imageInput = document.querySelector("#imagelink");
const placeInput = document.querySelector("#placename");
const pictureLink = document.querySelector("#profilepicture");
const profilePopup = document.querySelector(".popup__profile");
const addCardPopup = document.querySelector(".popup__add-card");
const imagePopup = document.querySelector(".popup-image");
const profileSubmitButton = document.querySelector("#profilesubmitbutton");
const cardSubmitButton = document.querySelector("#addcardbutton");
const profilePicSubmitButton = document.querySelector(
  "#profilepicsubmitbutton"
);
const addCardForm = document.querySelector("#addcardform");
const profilePicPopup = document.querySelector(".popup-profilepic");

function openProfilePopup() {
  username.value = profileTitle.textContent;
  usernameInfo.value = profileSubtitle.textContent;
  openPopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileSubmitButton);
  fetchSetUserInfo(username.value, usernameInfo.value);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, cardSubmitButton);
  fetchAddNewCard(placeInput.value, imageInput.value);
}

function handleEditProfilePic(evt) {
  evt.preventDefault();
  fetchSetAvatar(pictureLink.value);
}

function openImagePopup() {
  openPopup(imagePopup);
}

function openEditProfilePic() {
  openPopup(profilePicPopup);
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

export {
  openProfilePopup,
  handleProfileFormSubmit,
  openAddCardPopup,
  handleAddCardFormSubmit,
  openImagePopup,
  openEditProfilePic,
  handleEditProfilePic,
  renderLoading,
  profileSubmitButton,
  cardSubmitButton,
  profilePicSubmitButton,
  username,
  usernameInfo,
  profileTitle,
  profileSubtitle,
  profilePicPopup,
  addCardPopup, 
  addCardForm, 
  placeInput, 
  imageInput
};
