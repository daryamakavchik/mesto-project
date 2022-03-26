import {
  fetchAddNewCard,
  fetchGetUserInfo,
  fetchInitialCards,
  fetchSetAvatar,
  fetchSetUserInfo,
  fetchDeleteCard,
  fetchGetMyId,
} from "./api";
import { openDeleteCardPopup, renderLoading } from "./modal";
import { createCard } from "./card";
import { handleAddCardFormSubmit } from "./modal";

const elements = document.querySelector(".elements");
const profileImage = document.querySelector(".profile__image");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const username = document.querySelector("#username");
const usernameInfo = document.querySelector("#usernameinfo");
const addCardForm = document.querySelector("#addcardform");
const imageInput = document.querySelector("#imagelink");
const placeInput = document.querySelector("#placename");

const catchError = function (err) {
  console.log(err);
};

export const getUserInfo = () => {
  fetchGetUserInfo()
  .then((data) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileImage.src = data.avatar;
    const myId = data._id;
    getInitialCards(myId);
  })
  .catch(catchError)
};

export const setUserInfo = (username, usernameInfo) => {
  fetchSetUserInfo(username, usernameInfo)
  .finally(() => renderLoading(false));
};

export const getInitialCards = (myId) => {
  fetchInitialCards(myId)
  .then((data) => {
    return data.map((card) =>
      createCard(
        card.name,
        card.link,
        card._id,
        card.owner._id,
        card.likes,
        myId
      )
    );
  })
    .then((finishedcards) => {
      elements.prepend(...finishedcards);
  })
    .catch(catchError);
};

export const saveNewProfilePic = (link) => {
  fetchSetAvatar(link)
  .then((data) => {
    profileImage.src = data.avatar;
  })
  .catch(catchError)
  .finally(() => renderLoading(false))
};

export const addNewCard = (placename, imagelink) => {
   fetchAddNewCard(placename, imagelink)
    .then((card) => {
      return createCard(
        card.name,
        card.link,
        card._id,
        card._id,
        card.likes,
        card._id
      );
    })
    .then((finishedcard) => {
      elements.prepend(finishedcard);
    })
    .catch(catchError)
    .finally(() => renderLoading(false))
};
