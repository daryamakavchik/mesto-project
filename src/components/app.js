import {
  fetchAddNewCard,
  fetchGetUserInfo,
  fetchInitialCards,
  fetchSetAvatar,
  fetchSetUserInfo,
} from "./api";
import {
  renderLoading,
  profileSubmitButton,
  cardSubmitButton,
  profilePicSubmitButton,
  username,
  usernameInfo,
  profileTitle,
  profileSubtitle,
} from "./modal";
import { createCard } from "./card";

const elements = document.querySelector(".elements");
const profileImage = document.querySelector(".profile__image");

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
    .catch(catchError);
};

export const setUserInfo = (username, usernameInfo) => {
  fetchSetUserInfo(username, usernameInfo).finally(() =>
    renderLoading(false, profileSubmitButton)
  );
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
    .finally(() => renderLoading(false, profilePicSubmitButton));
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
    .finally(() => renderLoading(false, cardSubmitButton));
};
