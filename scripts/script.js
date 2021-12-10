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
const editButton = document.querySelector('.profile__edit-button');
const displayForm = document.querySelector('.popup');
const userName = document.querySelector('#username');
const userNameInfo = document.querySelector('#usernameinfo');
const saveButton = document.querySelector('.form__button');
const formInput = document.querySelector('.form');
const closeButton = document.querySelector('.popup_close');
const addButton = document.querySelector('.profile__add-button');
const cardAddedElement = document.querySelector('.popup__add-card');
const saveAddCardButton = document.querySelector('#addcardbutton'); 
const addFormInput = document.querySelector('#addform');
const imagelink = document.querySelector('#imagelink');
const placename = document.querySelector('#placename');
const closeAddCardButton = cardAddedElement.querySelector('.popup_close');
const cardLike = document.querySelectorAll('.elements__icon'); 


/*            CREATE CARDS FROM ARRAY             */
function createCards(element){
  const elements = document.querySelector('.elements'); 
  const cardElement = document.createElement('div');
  const cardImageBox = document.createElement('div');
  const cardImage = document.createElement('img'); 
  const cardDeleteButton = document.createElement('button');
  const cardCaption = document.createElement('div'); 
  const cardText = document.createElement('h2'); 
  const cardLike = document.createElement('button'); 

  cardImage.src = element.link;
  cardImage.setAttribute("alt", element.name);
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
  popUpImageBox.classList.add('popup_opened');
  popUpImage.src = element.link;
  popUpImageCaption.textContent = element.name;
  });
  popUpImageCloseButton.addEventListener('click', function() {
  popUpImageBox.classList.remove('popup_opened');
  });

         /*            LIKE CARD FROM ARRAY             */
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__icon_active');
    });

       /*            DELETE CARD FROM ARRAY             */
  function deleteCard(event){
    elements.removeChild(event.target.parentNode.parentNode);
    event.stopPropagation();
  }
  cardDeleteButton.addEventListener('click', deleteCard);    
}
initialCards.forEach(createCards);


/*      OPEN POPUP  */
function openPopup() {
document.querySelector('.popup').classList.add('popup_opened');
}

/*            OPEN PROFILE FORM            */
function openPopupEdit () {
  userName.value = document.querySelector('.profile__title').textContent;
  userNameInfo.value = document.querySelector('.profile__subtitle').textContent;
  openPopup();
}
editButton.addEventListener('click', openPopupEdit);


/*           EDIT AND SAVE PROFILE FORM            */
function savePopupEdit (evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = userName.value;
  document.querySelector('.profile__subtitle').textContent = userNameInfo.value;
  closePopupEdit();
}
formInput.addEventListener('submit', savePopupEdit);


/*             CLOSE PROFILE FORM            */
function closePopupEdit () {
  document.querySelector('.popup').classList.remove('popup_opened');
  userName.value = '';
  userNameInfo.value = '';
}
closeButton.addEventListener('click', closePopupEdit);


/*             OPEN ADD FORM            */
function openPopupAddCard() {
  document.querySelector('.popup__add-card').classList.add('popup_opened');
}
addButton.addEventListener('click', openPopupAddCard);


/*             EDIT AND SAVE ADD FORM            */
function editPopupAddCard(evt){
  evt.preventDefault();  
  const cardTemplate = document.querySelector('#cardtemplate').content; 
  let cardAddedElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardAddedElement.querySelector('.elements__image').src = imagelink.value;
  cardAddedElement.querySelector('.elements__image').setAttribute("alt", placename.value);
  cardAddedElement.querySelector('.elements__text').textContent = placename.value;
  elements.prepend(cardAddedElement); 
         /*            OPEN POPUP IMAGE FROM ADDED CARD             */
  imagelink.value = '';
  placename.value = '';
  closePopupAddCard();

  const popUpImageBox = document.querySelector('.popup-image');
  const popUpImage = document.querySelector('.popup-image__image');
  const popUpImageCloseButton = popUpImageBox.querySelector('.popup_close');
  const popUpImageCaption = document.querySelector('.popup-image__caption');
  const cardImageBox = cardAddedElement.querySelector('.elements__image-box');
  const cardDeleteButton = cardAddedElement.querySelector('.elements__delete-button');
  const cardLikeAdded = cardAddedElement.querySelectorAll('.elements__icon');

  cardImageBox.addEventListener('click', function() {
    popUpImageBox.classList.add('popup_opened');
    popUpImage.src = cardAddedElement.querySelector('.elements__image').src;
    popUpImageCaption.textContent = cardAddedElement.querySelector('.elements__text').textContent;
  });
  popUpImageCloseButton.addEventListener('click', function() {
    popUpImageBox.classList.remove('popup_opened');
  });

           /*            DELETE ADDED CARD             */
  function deleteCard(event){
    elements.removeChild(event.target.parentNode.parentNode);
    event.stopPropagation();
  }
  cardDeleteButton.addEventListener('click', deleteCard); 

         /*            LIKE ADDED CARD              */
  cardLikeAdded.forEach(function(el){
    el.addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__icon_active');
    });
    });
}
addFormInput.addEventListener('submit', editPopupAddCard);


/*             CLOSE ADD FORM            */
function closePopupAddCard () {
 document.querySelector('.popup__add-card').classList.remove('popup_opened');
}
closeAddCardButton.addEventListener('click', closePopupAddCard);




