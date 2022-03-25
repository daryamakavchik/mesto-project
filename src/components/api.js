import { renderLoading } from "./modal";
const token = "5f538871-a93e-462d-87c2-0ed817fe3122";

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
  return fetch("https://nomoreparties.co/v1/plus-cohort-8/users/me", {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then(renderError)
    .catch(catchError)
    .finally(() => renderLoading(false));
};

export const fetchSetUserInfo = (userName, userInfo) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName,
      about: userInfo,
    }),
  }).then(renderError);
};

export const fetchInitialCards = (myId) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-8/cards", {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then(renderError)
    .catch(catchError);
};

export const fetchSetAvatar = (link) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-8/users/me/avatar", {
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
    .catch(catchError)
    .finally(() => renderLoading(false));
};

export const fetchAddNewCard = (placename, imagelink, myId) => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-8/cards", {
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
    .catch(catchError);
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
  }).then(renderError);
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
