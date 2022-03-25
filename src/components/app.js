import { createCard } from "./card";
import { renderLoading } from "./modal";
import {
  fetchAddNewCard,
  fetchGetUserInfo,
  fetchInitialCards,
  fetchSetAvatar,
  fetchSetUserInfo,
  fetchDeleteCard
} from "./api";
import { openDeleteCardPopup } from "./modal";
import { closePopup } from "./utils";

const elements = document.querySelector(".elements");
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const username = document.querySelector("#username");
const usernameInfo = document.querySelector("#usernameinfo");

export const getUserInfo = () => {
  fetchGetUserInfo()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      profileImage.src = data.avatar;
      const myId = data._id;
      getInitialCards(myId);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setUserInfo = (username, usernameInfo) => {
  fetchSetUserInfo(username, usernameInfo)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false));
};

export const getInitialCards = (myId) => {
  fetchInitialCards()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
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
    .then(() => {
        const cardDeleteButtons = document.querySelectorAll('.elements__delete-button');
        cardDeleteButtons.forEach(btn => btn.style.display !== 'none' ? btn.addEventListener("click", setDeleteClass) : null)
        function setDeleteClass (evt) { 
        evt.target.closest(".elements__element").setAttribute('id', 'cardtodelete');
        openDeleteCardPopup(); 
        };
      })
    .catch((err) => {
      console.log(err);
    });  
  }

export const saveNewProfilePic = (link) => {
  fetchSetAvatar(link)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      profileImage.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false));
};

export const addNewCard = (placename, imagelink, myId) => {
  fetchAddNewCard(placename, imagelink, myId)
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => {
      return createCard(
        card.name,
        card.link,
        card._id,
        card.owner._id,
        card.likes,
        myId
      );
    })
    .then((finishedcard) => {
      elements.prepend(finishedcard);
      if (finishedcard._id === myId) {
        finishedcard.querySelector(".elements__delete-button").style.display =
          "block";
      } else {
        finishedcard.querySelector(".elements__delete-button").style.display =
          "none";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
