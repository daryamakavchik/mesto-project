import { createCard } from "./card";
import { renderLoading } from "./modal";

// tut pusechka
const elements = document.querySelector(".elements");
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const username = document.querySelector("#username");
const usernameInfo = document.querySelector("#usernameinfo");

//i tut pusechka
export const getUserInfo = () => {
  fetch("https://nomoreparties.co/v1/plus-cohort-8/users/me", {
    method: "GET",
    headers: {
      authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      profileImage.src = data.avatar;
      console.log(data);
      const myId = data._id;
      getInitialCards(myId);
    });
};

export const setUserInfo = (username, usernameInfo) => {
  fetch("https://nomoreparties.co/v1/plus-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      about: usernameInfo,
    }),
  }).finally(() => renderLoading(false));
};

export const getInitialCards = (myId) => {
  fetch("https://nomoreparties.co/v1/plus-cohort-8/cards", {
    method: "GET",
    headers: {
      authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
    },
  })
    .then((res) => {
      return res.json();
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
    .catch((err) => {
      console.log(err);
    });
};

export const saveNewProfilePic = (link) => {
  fetch("https://nomoreparties.co/v1/plus-cohort-8/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      profileImage.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false));
};

export const addNewCard = (placename, imagelink, myId) => {
  fetch("https://nomoreparties.co/v1/plus-cohort-8/cards", {
    method: "POST",
    headers: {
      authorization: "5f538871-a93e-462d-87c2-0ed817fe3122",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: placename,
      link: `${imagelink}`,
    }),
  })
    .then((data) => {
      return data.json();
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
    });
};
