const token = "5f538871-a93e-462d-87c2-0ed817fe3122";

export const fetchGetUserInfo = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-8/users/me', {
    method: "GET",
    headers: {
      authorization: token,
    },
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
  });
};

export const fetchInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-8/cards', {
    method: "GET",
    headers: {
      authorization: token,
    },
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