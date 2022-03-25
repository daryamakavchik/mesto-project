import { openDeleteCardPopup } from "./modal";
import { closePopup } from "./utils";
import { createCard } from "./card";
import { getInitialCards } from "./app";

const elements = document.querySelector(".elements");
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const username = document.querySelector("#username");
const usernameInfo = document.querySelector("#usernameinfo");

const token = "5f538871-a93e-462d-87c2-0ed817fe3122";

const renderError = function(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const fetchGetUserInfo = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-8/users/me', {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
  .then(renderError)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileImage.src = data.avatar;
    const myId = data._id;
    getInitialCards(myId);
  });
};

export const fetchSetUserInfo = (userName, userInfo) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-8/users/me', {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName,
      about: userInfo,
    }),
  })
  .then(renderError);
};

export const fetchInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-8/cards', {
    method: "GET",
    headers: {
      authorization: token,
    },
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
  .then(() => {
    const cardDeleteButtons = document.querySelectorAll('.elements__delete-button');
    cardDeleteButtons.forEach(btn => btn.style.display !== 'none' ? btn.addEventListener("click", setDeleteClass) : null)
    function setDeleteClass (evt) { 
    evt.target.closest(".elements__element").setAttribute('id', 'cardtodelete');
    openDeleteCardPopup(); 
    };
  });
};

export const fetchSetAvatar = (link) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-8/users/me/avatar', {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  })
  .then(renderError)
  .then((data) => {
    profileImage.src = data.avatar;
  });
};

export const fetchAddNewCard = (placename, imagelink) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-8/cards', {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
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
  });
};

export const fetchDeleteCard = (id) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-8/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  });
};

export const fetchHandleLikes = (id, method) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-8/cards/likes/${id}`, {
    method: method,
    headers: {
      authorization: token,
    },
  });
};

// export const fetchGetCardInfo = () => {
//   return fetch('https://nomoreparties.co/v1/plus-cohort-8/cards/', {
//     method: "GET",
//     headers: {
//       authorization: token,
//     },
//   })
//   .then((data) => { console.log(data) });
// };