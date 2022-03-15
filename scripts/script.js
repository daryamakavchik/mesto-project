/*             CONSTANTS           */
const elements = document.querySelector(".elements");
const cardImage = document.querySelector(".elements__image");
const form = document.querySelector(".form");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const cardTemplate = document.querySelector("#cardtemplate").content;
const userName = document.querySelector("#username");
const userNameInfo = document.querySelector("#usernameinfo");
const addFormInput = document.querySelector("#addform");
const imagelink = document.querySelector("#imagelink");
const placename = document.querySelector("#placename");

const profilePopup = document.querySelector(".popup__profile");
const addCardPopup = document.querySelector(".popup__add-card");
const imagePopup = document.querySelector(".popup-image");

const popUpImage = document.querySelector(".popup-image__image");
const popUpImageCloseButton = imagePopup.querySelector(".popup_close");
const popUpImageCaption = document.querySelector(".popup-image__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const saveButton = document.querySelector(".form__button");
const saveAddCardButton = document.querySelector("#addcardbutton");
const closeButton = document.querySelector(".popup_close");
const closeAddCardButton = addCardPopup.querySelector(".popup_close");

const escKeyCode = 27;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/*          CREATE A SINGLE CARD         */
function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardDeleteButton = cardElement.querySelector(
    ".elements__delete-button"
  );
  const cardLikeButton = cardElement.querySelector(".elements__icon");
  const cardText = cardElement.querySelector(".elements__text");

  cardImage.alt = name;
  cardText.textContent = name;
  cardImage.src = link;

  cardLikeButton.addEventListener("click", pressLike);
  cardDeleteButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", function () {
    popUpImage.src = cardImage.src;
    popUpImageCaption.textContent = name;
    popUpImage.alt = name;
    openImagePopup();
  });

  return cardElement;
}

/*          CREATE SIX CARDS          */
function addSixCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const card = initialCards[i];
    const name = card.name;
    const link = card.link;
    elements.prepend(createCard(name, link));
  }
}
addSixCards();

/*          OPEN POPUP          */
function openPopup(somePopup) {
  somePopup.classList.add("popup_opened");
}

/*          OPEN PROFILE POPUP          */
function openProfilePopup() {
  userName.value = profileTitle.textContent;
  userNameInfo.value = profileSubtitle.textContent;
  openPopup(profilePopup);
}
editButton.addEventListener("click", openProfilePopup);

/*          OPEN ADDCARD POPUP          */
function openAddCardPopup() {
  openPopup(addCardPopup);
}
addButton.addEventListener("click", openAddCardPopup);

/*          OPEN IMAGE POPUP          */
function openImagePopup() {
  openPopup(imagePopup);
  document.addEventListener("keydown", closeOnEsc);
}

/*          CLOSE POPUP          */
function closePopup(somePopup) {
  somePopup.classList.remove("popup_opened");
}

/*          CLOSE PROFILE POPUP          */
function closeProfilePopup() {
  userName.value = "";
  userNameInfo.value = "";
  closePopup(profilePopup);
}
closeButton.addEventListener("click", closeProfilePopup);

/*          CLOSE ADDCARD POPUP          */
function closeAddCardPopup() {
  closePopup(addCardPopup);
}
closeAddCardButton.addEventListener("click", closeAddCardPopup);

/*         CLOSE IMAGE POPUP             */
function closeImagePopup(evt) {
  if (
    (evt.target === popUpImageCloseButton || evt.target === imagePopup) &&
    evt.target !== popUpImage
  ) {
    closePopup(imagePopup);
  }
}
imagePopup.addEventListener("click", closeImagePopup);

/*          CLOSE POPUP ON ESCAPE          */
function closeOnEsc(evt) {
  if (evt.keyCode === escKeyCode) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

/*          EDIT AND SAVE PROFILE FORM          */
function savePopupEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = userNameInfo.value;
  closeProfilePopup();
}
form.addEventListener("submit", savePopupEdit);

/*           EDIT AND SAVE ADD-CARD FORM         */
function addNewCard(evt) {
  evt.preventDefault();
  const name = placename.value;
  const link = `${imagelink.value}`;
  elements.prepend(createCard(name, link));
  imagelink.value = "";
  placename.value = "";
  closeAddCardPopup();
}
addFormInput.addEventListener("submit", addNewCard);

/*          LIKE          */
function pressLike(evt) {
  evt.target.classList.toggle("elements__icon_active");
}

/*          DELETE          */ function deleteCard(evt) {
  evt.target.closest(".elements__element").remove();
}

/*          VALIDATE FORM        */
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
  const buttonElement = formElement.querySelector(".form__submit");
  buttonElement.style.marginTop = "31.34px";
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
