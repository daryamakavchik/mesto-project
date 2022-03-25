import { renderLoading } from "./modal";
import {
  fetchAddNewCard,
  fetchGetUserInfo,
  fetchInitialCards,
  fetchSetAvatar,
  fetchSetUserInfo,
  fetchDeleteCard
} from "./api";

export const getUserInfo = () => {
  fetchGetUserInfo()
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
    .catch((err) => {
      console.log(err);
    });  
  }

export const saveNewProfilePic = (link) => {
  fetchSetAvatar(link)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false));
};

export const addNewCard = (placename, imagelink, myId) => {
  fetchAddNewCard(placename, imagelink, myId)
    .catch((err) => {
      console.log(err);
    });
};