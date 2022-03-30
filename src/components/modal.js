
import { createCard } from "./card";
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
const deleteCardPopup = document.querySelector(".popup-delete");
const deleteCardButton = document.querySelector("#deletecardbutton");

const profileImage = document.querySelector(".profile__image");

const elements = document.querySelector(".elements");

function openProfilePopup() {
  username.value = profileTitle.textContent;
  usernameInfo.value = profileSubtitle.textContent;
  openPopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileSubmitButton);
  fetchSetUserInfo(username.value, usernameInfo.value)
    .then(() => {
      profileTitle.textContent = username.value;
      profileSubtitle.textContent = usernameInfo.value;
      closePopup(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, profileSubmitButton));
}

function handleEditProfilePic(evt) {
  evt.preventDefault();
  renderLoading(true, profilePicSubmitButton);
  fetchSetAvatar(pictureLink.value)
    .then((data) => {
      profileImage.src = data.avatar;
      closePopup(profilePicPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, profilePicSubmitButton));
}

function openEditProfilePic() {
  openPopup(profilePicPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, cardSubmitButton);
  fetchAddNewCard(placeInput.value, imageInput.value)
    .then((card) => {
      elements.prepend(createCard(card, card.owner._id));
    })
    .then(() => {
      closePopup(addCardPopup);
      addCardForm.reset();
      cardSubmitButton.classList.add("form__button-submit_disabled");
      cardSubmitButton.disabled = true;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, cardSubmitButton));
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function openImagePopup() {
  openPopup(imagePopup);
}

function openDeleteCardPopup(onConfirm){
  deleteCardButton.onConfirm = onConfirm;
  openPopup(deleteCardPopup);
}

deleteCardButton.addEventListener('click', () => {
  deleteCardButton.onConfirm();
  closePopup(deleteCardPopup);
});


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
  openDeleteCardPopup,
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
  imageInput,
};
