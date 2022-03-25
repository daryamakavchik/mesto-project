import { openPopup, closePopup } from "./utils.js";
import { saveNewProfilePic, addNewCard, setUserInfo } from "./app.js";

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
const cardSubmitButton = document.querySelector("#addcardbutton");
const addCardForm = document.querySelector("#addcardform");
const profilePicPopup = document.querySelector(".popup-profilepic");
// const cardConfirmDeleteForm = document.querySelector("#deletecardform");
const deleteCardPopup = document.querySelector(".popup-delete");

function openProfilePopup() {
  username.value = profileTitle.textContent;
  usernameInfo.value = profileSubtitle.textContent;
  openPopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  profileTitle.textContent = username.value;
  profileSubtitle.textContent = usernameInfo.value;
  setUserInfo(username.value, usernameInfo.value);
  closePopup(profilePopup);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  addNewCard(placeInput.value, imageInput.value);
  closePopup(addCardPopup);
  addCardForm.reset();
  cardSubmitButton.classList.add("form__button-submit_disabled");
  cardSubmitButton.disabled = true;
}

function handleEditProfilePic(evt) {
  evt.preventDefault();
  renderLoading(true);
  saveNewProfilePic(pictureLink.value);
  closePopup(profilePicPopup);
}

function openImagePopup() {
  openPopup(imagePopup);
}

function openDeleteCardPopup() {
  openPopup(deleteCardPopup);
  cardConfirmDeleteForm.addEventListener("submit", function deleteCard (evt) {
  evt.preventDefault();
  document.getElementById("cardtodelete").remove(); 
  closePopup(deleteCardPopup);
  });  
}

function openEditProfilePic() {
  openPopup(profilePicPopup);
}

function renderLoading(isLoading) {
  if (isLoading) {
    document.querySelector(".form__button-submit").textContent =
      "Сохранение...";
  } else {
    document.querySelector(".form__button-submit").textContent = "Сохранить";
  }
}

export {
  openProfilePopup,
  handleProfileFormSubmit,
  openAddCardPopup,
  handleAddCardFormSubmit,
  openImagePopup,
  openDeleteCardPopup,
  openEditProfilePic,
  handleEditProfilePic,
  renderLoading,
};
