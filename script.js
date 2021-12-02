/*const initialCards = [
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

function cardCreate(name, link){
  const cardElementBox = document.createElement('div');
  const cardImage = document.createElement('img');
  const cardCaption = document.createElement('div');
  const cardText = document.createElement('h2');
  const cardLike = document.createElement('button');
  const elements = document.querySelector('elements');
 
    cardElementBox.classList.add('elements__element');
    cardImage.classList.add('elements__image');
    cardCaption.classList.add('elements__caption');
    cardText.classList.add('elements__text');
    cardLike.classList.add('elements__icon');

    cardText.textContent = name;
    cardImage.setAttribute('style', `background-image: url(${link})`);

    cardCaption.appendChild(cardText);
    cardCaption.appendChild(cardLike);
    cardElementBox.appendChild(cardImage);
    cardElementBox.appendChild(cardCaption);
    elements.appendChild(cardElementBox);
}


function addCard() {
  for (let i = 0; i < initialCards.length; i++) {
      const data = initialCards[i];
      const name = data.name;
      const link = data.link;
      cardCreate(name, link);
  }
}
addCard();*/


/*           OPEN FORM         */
let editButton = document.querySelector('.profile__edit-button');
let displayForm = document.querySelector('.popup_closed');
function openEditForm () {
  displayForm.classList.remove('popup_closed');
}
editButton.addEventListener('click', openEditForm);

/*           EDIT AND SAVE FORM       */   
let saveButton = document.querySelector('.form__button');
const formInput = document.querySelector('.form');
const userName = document.querySelector('#username');
const userNameInfo = document.querySelector('#usernameinfo');
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = userName.value;
  document.querySelector('.profile__subtitle').textContent = userNameInfo.value;
}
  formInput.addEventListener('submit', formSubmitHandler);
  saveButton.addEventListener('click', closeEditForm);

/*           CLOSE FORM         */
let closeButton = document.querySelector('.popup__close-button');
function closeEditForm () {
  displayForm.classList.add('popup_closed');
}
closeButton.addEventListener('click', closeEditForm);


/*          OPEN ADD-CARD FORM          */
let addButton = document.querySelector('.profile__add-button');
let displayAddCard = document.querySelector('.popup__add-card');
function openAddForm () {
  displayAddCard.classList.remove('popup__add-card_closed');
}
addButton.addEventListener('click', openAddForm);


/*          EDIT AND SAVE ADD-CARD FORM         */
let saveAddCardButton = document.querySelector('#addcardbutton'); /*addbutton*/

const addFormInput = document.querySelector('#addform'); /*addform**/
const placeName = document.querySelector('#placename'); /*input placename*/
const imageLink = document.querySelector('#imagelink'); /*input link*/
const cardTemplate = document.querySelector('#cardtemplate').content; /*template content*/
const elements = document.querySelector('.elements'); /*where to place template*/
const cardElement = elements.querySelector('.elements__element').cloneNode(true); /*copy template content*/

function addFormSubmitHandler (evt) {
  evt.preventDefault(); 
  cardElement.querySelector('.elements__image').src = imageLink.value; /*source of image of a new card = input link*/
  cardElement.querySelector('.elements__text').textContent = placeName.value; /*text of a new card = input text*/
  elements.prepend(cardElement);  /*add template content to elements*/
}
  addFormInput.addEventListener('submit', addFormSubmitHandler); /*submit addform and insert link+image*/
  saveAddCardButton.addEventListener('click', closeAddCardForm); /*close addform*/

  const likeButton = document.querySelector('.elements__icon');
  likeButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('elements__icon_active');
   });

/*           CLOSE ADD-CARD FORM          */
let closeAddCardButton = document.querySelector('.popup__add-card-close-button');
function closeAddCardForm () {
  displayAddCard.classList.add('popup__add-card_closed');
}
closeAddCardButton.addEventListener('click', closeAddCardForm);



