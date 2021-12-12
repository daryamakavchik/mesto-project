/*             CONSTANTS           */
const elements = document.querySelector('.elements'); 
const cardTemplate = document.querySelector('#cardtemplate').content;
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

const popUpImageBox = document.querySelector('.popup-image');
const popUpImage = document.querySelector('.popup-image__image');
const popUpImageCloseButton = popUpImageBox.querySelector('.popup_close');
const popUpImageCaption = document.querySelector('.popup-image__caption');

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



/*          CREATE CARD FROM ARRAY          */
 function createCard(card){
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardDeleteButton = cardElement.querySelector('.elements__delete-button');
  const cardLikeButton = cardElement.querySelector('.elements__icon');
  const cardText = cardElement.querySelector('.elements__text');

  cardImage.alt = card.name;
  cardText.textContent = card.name;
  cardImage.src = card.link;

  cardLikeButton.addEventListener('click', pressLike);
  cardDeleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', function showPhoto() {
    popUpImageBox.classList.add('popup_opened');
    popUpImage.src = cardImage.src;
    popUpImageCaption.textContent = card.name;
    popUpImageCloseButton.addEventListener('click', function() {
    popUpImageBox.classList.remove('popup_opened');
    });
  });

  return cardElement
}



/*          CREATE 6 CARDS          */
initialCards.forEach(function (card) {
  elements.prepend(createCard(card));
});



/*          LIKE          */
function pressLike(evt){
  evt.target.classList.toggle('elements__icon_active');
}

/*          DELETE          */;
function deleteCard(event){
  elements.removeChild(event.target.parentNode.parentNode);
  event.stopPropagation();
}



/*          OPEN PROFILE POPUP          */        
function openPopupEdit () {
  document.querySelector('.popup').classList.add('popup_opened');
  userName.value = document.querySelector('.profile__title').textContent;
  userNameInfo.value = document.querySelector('.profile__subtitle').textContent;
}
editButton.addEventListener('click', openPopupEdit);

/*          OPEN ADDCARD POPUP          */  
function openPopupAddCard() {
  document.querySelector('.popup__add-card').classList.add('popup_opened');
}
addButton.addEventListener('click', openPopupAddCard);



/*          EDIT AND SAVE PROFILE FORM          */            
function savePopupEdit (evt) {
  evt.preventDefault(); 
  document.querySelector('.profile__title').textContent = userName.value;
  document.querySelector('.profile__subtitle').textContent = userNameInfo.value;
  closePopupEdit();
}
formInput.addEventListener('submit', savePopupEdit);

/*          EDIT AND SAVE ADDCARD FORM          */      
function editPopupAddCard(evt){
  evt.preventDefault(); 
  const cardAddedElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardAddedImage = cardAddedElement.querySelector('.elements__image');
  const cardAddedDeleteButton = cardAddedElement.querySelector('.elements__delete-button');
  const cardAddedLikeButton = cardAddedElement.querySelector('.elements__icon');
  cardAddedImage.src = `${imagelink.value}`;
  cardAddedImage.setAttribute("alt", placename.value);
  cardAddedElement.querySelector('.elements__text').textContent = placename.value;
  elements.prepend(cardAddedElement); 

cardAddedLikeButton.addEventListener('click', pressLike);
cardAddedDeleteButton.addEventListener('click', deleteCard); 
cardAddedImage.addEventListener('click', function showPhoto() {
  popUpImageBox.classList.add('popup_opened');
  popUpImage.src = cardAddedImage.src;
  popUpImageCaption.textContent = cardAddedElement.querySelector('.elements__text').textContent;
  popUpImageCloseButton.addEventListener('click', function() {
  popUpImageBox.classList.remove('popup_opened');
  });
});
         
imagelink.value = '';
placename.value = '';
closePopupAddCard();
}
addFormInput.addEventListener('submit', editPopupAddCard);



/*          CLOSE PROFILE POPUP          */         
function closePopupEdit () {
  document.querySelector('.popup').classList.remove('popup_opened');
  userName.value = '';
  userNameInfo.value = '';
}
closeButton.addEventListener('click', closePopupEdit);

/*          CLOSE ADDCARD POPUP          */    
function closePopupAddCard () {
 document.querySelector('.popup__add-card').classList.remove('popup_opened');
}
closeAddCardButton.addEventListener('click', closePopupAddCard);