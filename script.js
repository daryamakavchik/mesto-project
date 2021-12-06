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
};

/*           DELETE CARD        */   /*!!!!!!!!!!!!!!!!!!!!*/
function cardDelete(event){
  const elements = document.querySelector('.elements');
  elements.removeChild(event.target.parentNode.parentNode);
  event.stopPropagation();
}

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
const elements = document.querySelector('.elements'); /*where to place template*/

  function addNewCard (placeName, imageLink) {
  const cardTemplate = document.querySelector('#cardtemplate').content; 
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__image').src = imageLink;
  cardElement.querySelector('.elements__text').textContent = placeName;
  elements.prepend(cardElement);  /*add template content to elements*/ 
  }

 /*close addform and insert text+link*/
  saveAddCardButton.addEventListener('click', function(){
  const imagelink = document.querySelector('#imagelink');
  const placename = document.querySelector('#placename');
  addNewCard(placename.value, imagelink.value); 
  imagelink.value = '',
  placename.value = '';
  closeAddCardForm();
});
 

  const likeButton = document.querySelectorAll('.elements__icon');  /*like button*/
  likeButton.forEach(function(el){
  el.addEventListener('click', function (evt) {
  evt.target.classList.toggle('elements__icon_active');
   });
  });


/*           CLOSE ADD-CARD FORM          */
let closeAddCardButton = document.querySelector('.popup__add-card-close-button');
function closeAddCardForm () {
  displayAddCard.classList.add('popup__add-card_closed');
}
closeAddCardButton.addEventListener('click', closeAddCardForm);



