import {
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
  imageInput,
} from "./modal.js";
import { createCard } from "./card.js";
import { closePopup } from "./utils.js";

const elements = document.querySelector(".elements");
const profileImage = document.querySelector(".profile__image");
const placename = placeInput.value;
const imagelink = imageInput.value;

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-8",
  headers: {
    authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
    "Content-Type": "application/json",
  },
};

const renderError = function (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const catchError = function (err) {
  console.log(err);
};

export const fetchGetUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(renderError)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      profileImage.src = data.avatar;
      const myId = data._id;
      fetchInitialCards(myId);
    })
    .catch(catchError);
};

export const fetchSetUserInfo = (userName, userInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userInfo,
    }),
  })
    .then(renderError)
    .then(() => {
      profileTitle.textContent = username.value;
      profileSubtitle.textContent = usernameInfo.value;
      closePopup(profilePopup);
    })
    .catch(catchError)
    .finally(() => renderLoading(false, profileSubmitButton));
};

export const fetchInitialCards = (myId) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(renderError)
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

export const fetchSetAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then(renderError)
    .then((data) => {
      renderLoading(true, profilePicSubmitButton);
      profileImage.src = data.avatar;
      closePopup(profilePicPopup);
    })
    .catch(catchError)
    .finally(() => renderLoading(false, profilePicSubmitButton));
};

export const fetchAddNewCard = (placename, imagelink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placename,
      link: `${imagelink}`,
    }),
  })
    .then(renderError)
    .then((card) => {
      return createCard(
        card.name,
        card.link,
        card._id,
        card.owner_id,
        card.likes,
        card.owner_id
      );
    })
    .then((finishedcard) => {
      elements.prepend(finishedcard);
    })
    .then(() => {
      closePopup(addCardPopup);
      addCardForm.reset();
      cardSubmitButton.classList.add("form__button-submit_disabled");
      cardSubmitButton.disabled = true;
    })
    .catch(catchError)
    .finally(() => renderLoading(false, cardSubmitButton));
};

export const fetchDeleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(renderError);
};

export const fetchHandleLikes = (
  id,
  method,
  likes,
  cardLikes,
  cardLikeButton,
  myId
) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: method,
    headers: config.headers,
  }).then(renderError);
};
