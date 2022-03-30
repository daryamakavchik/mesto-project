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

export const fetchGetUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(renderError);
};

export const fetchSetUserInfo = (userName, userInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userInfo,
    }),
  }).then(renderError);
};

export const fetchInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(renderError);
};

export const fetchSetAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(renderError);
};

export const fetchAddNewCard = (placename, imagelink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placename,
      link: `${imagelink}`,
    }),
  }).then(renderError);
};

export const fetchDeleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(renderError);
};

export const fetchHandleLikes = (id, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: method,
    headers: config.headers,
  }).then(renderError);
};
