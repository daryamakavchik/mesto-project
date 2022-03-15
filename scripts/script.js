const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

initialCards.forEach(cardCreate);

/*            CREATE CARDS FROM ARRAY             */
function cardCreate(element){
  const elements = document.querySelector('.elements'); 
  const cardElement = document.createElement('div');
  const cardImageBox = document.createElement('div');
  const cardImage = document.createElement('img'); 
  const cardDeleteButton = document.createElement('button');
  cardImageBox.setAttribute('style', `background-image: url(${element.link})`);
  const cardCaption = document.createElement('div'); 
  const cardText = document.createElement('h2'); 
  cardText.textContent = element.name;
  const cardLike = document.createElement('button'); 
  
  cardElement.classList.add('elements__element');
  cardImageBox.classList.add('elements__image-box');
  cardImage.classList.add('elements__image');
  cardDeleteButton.classList.add('elements__delete-button');
  cardCaption.classList.add('elements__caption');
  cardText.classList.add('elements__text');
  cardLike.classList.add('elements__icon');

  cardImageBox.appendChild(cardImage);
  cardImageBox.appendChild(cardDeleteButton);
  cardCaption.appendChild(cardText);
  cardCaption.appendChild(cardLike);
  cardElement.appendChild(cardImageBox);
  cardElement.appendChild(cardCaption);
  elements.appendChild(cardElement);

  cardDeleteButton.addEventListener('click', cardDelete);
  
  /*           OPEN IMAGE POPUP         */
  const popUpImageCloseButton = document.querySelector('.popup-image__close-button');
  const popUpImageBox = document.querySelector('.popup-image');
  const popUpImage = document.querySelector('.popup-image__image');
  const popUpImageCaption = document.querySelector('.popup-image__caption');
  
  cardImageBox.addEventListener('click', function() {
    popUpImageBox.classList.add('popup-image_opened');
    popUpImage.src = element.link;
    popUpImageCaption.textContent = element.name;
  });
  
  popUpImageCloseButton.addEventListener('click', function() {
  popUpImageBox.classList.remove('popup-image_opened');
});
}

/*           DELETE CARD        */  
function cardDelete(event){
  const elements = document.querySelector('.elements');
  elements.removeChild(event.target.parentNode.parentNode);
  event.stopPropagation();
}

/*           OPEN MAIN FORM         */
let editButton = document.querySelector('.profile__edit-button');
let displayForm = document.querySelector('.popup');
function openEditForm () {
  displayForm.classList.add('popup_opened');
}
editButton.addEventListener('click', openEditForm);

/*           EDIT AND SAVE MAIN FORM       */   
let saveButton = document.querySelector('.form__button');
const formInput = document.querySelector('.form');
const userName = document.querySelector('#username');
const userNameInfo = document.querySelector('#usernameinfo');
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = userName.value;
  document.querySelector('.profile__subtitle').textContent = userNameInfo.value;
  closeEditForm();
}
  formInput.addEventListener('submit', formSubmitHandler);

/*           CLOSE MAIN FORM         */
let closeButton = document.querySelector('.popup__close-button');
function closeEditForm () {
  userName.value = '';
  userNameInfo.value = '';
  displayForm.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closeEditForm);

/*          OPEN ADD-CARD FORM          */
let addButton = document.querySelector('.profile__add-button');
let displayAddCard = document.querySelector('.popup__add-card');
function openAddForm () {
  displayAddCard.classList.add('popup__add-card_opened');
}
addButton.addEventListener('click', openAddForm);

/*          EDIT AND SAVE ADD-CARD FORM      */
const saveAddCardButton = document.querySelector('#addcardbutton'); 
const addFormInput = document.querySelector('#addform');
const imagelink = document.querySelector('#imagelink');
const placename = document.querySelector('#placename');
  function addFormSubmitHandler(evt){
  evt.preventDefault();
  const elements = document.querySelector('.elements'); 
  const cardTemplate = document.querySelector('#cardtemplate').content; 
  const cardAddedElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const imagelink = document.querySelector('#imagelink');
  const placename = document.querySelector('#placename');
  cardAddedElement.querySelector('.elements__image').src = imagelink.value;
  cardAddedElement.querySelector('.elements__text').textContent = placename.value;
  elements.prepend(cardAddedElement); 
  closeAddCardForm();
  imagelink.value = '';
  placename.value = '';
  cardAddedElement.querySelector('.elements__icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__icon_active');
     });
  cardAddedElement.querySelector('.elements__delete-button').addEventListener('click', cardDelete);
  }
addFormInput.addEventListener('submit', addFormSubmitHandler);

/*           CLOSE ADD-CARD FORM          */
let closeAddCardButton = document.querySelector('.popup__add-card-close-button');
function closeAddCardForm () {
  displayAddCard.classList.remove('popup__add-card_opened');
}
closeAddCardButton.addEventListener('click', closeAddCardForm);

/*                  LIKE               */
const likeButton = document.querySelectorAll('.elements__icon'); 
likeButton.forEach(function cardLike(el){
  el.addEventListener('click', function (evt) {
  evt.target.classList.toggle('elements__icon_active');
   });
  });

  