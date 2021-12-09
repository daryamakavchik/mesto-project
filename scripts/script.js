/*             CONSTANTS           */
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

const elements = document.querySelector('.elements'); 
const cardElement = document.querySelector('.elements__element');
const cardImageBox = document.querySelector('.elements__image-box');
const cardImage = document.querySelector('.elements__image');
const cardDeleteButton = document.querySelector('.elements__delete-button');
const cardCaption = document.querySelector('.elements__caption');
const cardText = document.querySelector('.elements__text');
const cardLike = document.querySelector('.elements__icon');
const editButton = document.querySelector('.profile__edit-button');
const displayForm = document.querySelector('.popup');
const userName = document.querySelector('#username');
const userNameInfo = document.querySelector('#usernameinfo');
const saveButton = document.querySelector('.form__button');
const formInput = document.querySelector('.form');
const closeButton = document.querySelector('.popup_close');
const addButton = document.querySelector('.profile__add-button');
const displayAddCard = document.querySelector('.popup__add-card');
const saveAddCardButton = document.querySelector('#addcardbutton'); 
const addFormInput = document.querySelector('#addform');
const imagelink = document.querySelector('#imagelink');
const placename = document.querySelector('#placename');
const cardTemplate = document.querySelector('#cardtemplate').content; 
const cardAddedElement = cardTemplate.querySelector('.elements__element').cloneNode(true); 
const closeAddCardButton = displayAddCard.querySelector('.popup_close');
const likeButton = document.querySelectorAll('.elements__icon'); 



/*            CREATE CARDS FROM ARRAY             */
function cardCreate(element){
  const elements = document.querySelector('.elements'); 
  const cardElement = document.createElement('div');
  const cardImageBox = document.createElement('div');
  const cardImage = document.createElement('img'); 
  const cardDeleteButton = document.createElement('button');
  const cardCaption = document.createElement('div'); 
  const cardText = document.createElement('h2'); 
  const cardLike = document.createElement('button'); 

  cardImage.src = element.link;
  cardText.textContent = element.name;

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

       /*            OPEN POPUP IMAGE FROM ARRAY             */
  const popUpImageBox = document.querySelector('.popup-image');
  const popUpImage = document.querySelector('.popup-image__image');
  const popUpImageCloseButton = popUpImageBox.querySelector('.popup_close');
  const popUpImageCaption = document.querySelector('.popup-image__caption');

  cardImageBox.addEventListener('click', function() {
  popUpImageBox.classList.add('popup-image_opened');
  popUpImage.src = element.link;
  popUpImageCaption.textContent = element.name;
  });
  popUpImageCloseButton.addEventListener('click', function() {
  popUpImageBox.classList.remove('popup-image_opened');
  });

       /*            DELETE CARD FROM ARRAY             */
  function cardDelete(event){
    elements.removeChild(event.target.parentNode.parentNode);
    event.stopPropagation();
  }
  cardDeleteButton.addEventListener('click', cardDelete);    

       /*            LIKE CARD FROM ARRAY             */
likeButton.forEach(function cardLike(el){
  el.addEventListener('click', function (evt) {
  evt.target.classList.toggle('elements__icon_active');
  });
});

}
initialCards.forEach(cardCreate);



/*            OPEN PROFILE FORM            */
function openEditForm () {
  displayForm.classList.add('popup_opened');
  userName.value = document.querySelector('.profile__title').textContent;
  userNameInfo.value = document.querySelector('.profile__subtitle').textContent;
}
editButton.addEventListener('click', openEditForm);



/*           EDIT AND SAVE PROFILE FORM            */
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = userName.value;
  document.querySelector('.profile__subtitle').textContent = userNameInfo.value;
  closeEditForm();
}
formInput.addEventListener('submit', formSubmitHandler);



/*             CLOSE PROFILE FORM            */
function closeEditForm () {
  userName.value = '';
  userNameInfo.value = '';
  displayForm.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closeEditForm);



/*             OPEN ADD FORM            */
function openAddForm () {
  displayAddCard.classList.add('popup__add-card_opened');
}
addButton.addEventListener('click', openAddForm);



/*             EDIT AND SAVE ADD FORM            */
function addFormSubmitHandler(evt){
  evt.preventDefault(); 
  cardAddedElement.querySelector('.elements__image').src = imagelink.value;
  cardAddedElement.querySelector('.elements__text').textContent = placename.value;
  elements.prepend(cardAddedElement); 

         /*            OPEN POPUP IMAGE FROM ADDED CARD             */
  const popUpImageBox = document.querySelector('.popup-image');
  const popUpImage = document.querySelector('.popup-image__image');
  const popUpImageCloseButton = popUpImageBox.querySelector('.popup_close');
  const popUpImageCaption = document.querySelector('.popup-image__caption');
  const cardImageBox = cardAddedElement.querySelector('.elements__image-box');
  const cardDeleteButton = cardAddedElement.querySelector('.elements__delete-button');
  const cardLike = cardAddedElement.querySelector('.elements__icon');

  cardImageBox.addEventListener('click', function() {
    popUpImageBox.classList.add('popup-image_opened');
    popUpImage.src = cardAddedElement.querySelector('.elements__image').src;
    popUpImageCaption.textContent = cardAddedElement.querySelector('.elements__text').textContent;
  });
  popUpImageCloseButton.addEventListener('click', function() {
    popUpImageBox.classList.remove('popup-image_opened');
  });

           /*            DELETE ADDED CARD             */
  function cardDelete(event){
    elements.removeChild(event.target.parentNode.parentNode);
    event.stopPropagation();
  }
  cardDeleteButton.addEventListener('click', cardDelete); 

         /*            LIKE ADDED CARD              */
likeButton.forEach(function cardLike(el){
  el.addEventListener('click', function (evt) {
  evt.target.classList.toggle('elements__icon_active');
  });
});

  closeAddCardForm();
  imagelink.value = '';
  placename.value = '';
  cardAddedElement.querySelector('.elements__icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__icon_active');
  });
  cardAddedElement.querySelector('.elements__delete-button').addEventListener('click', cardDelete);
}
addFormInput.addEventListener('submit', addFormSubmitHandler);



/*             CLOSE ADD FORM            */
function closeAddCardForm () {
  displayAddCard.classList.remove('popup__add-card_opened');
}
closeAddCardButton.addEventListener('click', closeAddCardForm);




