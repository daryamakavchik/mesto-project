/*           OPEN FORM          */
let editButton = document.querySelector('.profile__edit-button');
let displayForm = document.querySelector('.popup_closed');
function openEditForm () {
  displayForm.classList.remove('popup_closed');
}
editButton.addEventListener('click', openEditForm);

/*           EDIT AND SAVE FORM         */
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
  display.classList.add('popup_closed');
}
closeButton.addEventListener('click', closeEditForm);


/*          OPEN ADD-CARD FORM          */
let addButton = document.querySelector('.profile__add-button');
let displayAddCard = document.querySelector('.popup__add-card');
function openAddForm () {
  displayAddCard.classList.remove('popup__add-card_closed');
}
addButton.addEventListener('click', openAddForm);


/*          EDIT AND SAVE ADD-CARD FORM          */
let saveAddCardButton = document.querySelector('#addcardbutton'); /*addbutton*/
const addFormInput = document.querySelector('#addform'); /*addform*/  
const placeName = document.querySelector('#placename'); /*input placename*/
const imageLink = document.querySelector('#imagelink'); /*input link*/
const cardTemplate = document.querySelector('#cardtemplate').content; /*template content*/
const elements = document.querySelector('.elements'); /*where to place template*/
const cardElement = elements.querySelector('.elements__element').cloneNode(true); /*copy template content*/

function addFormSubmitHandler (evt) {
  evt.preventDefault(); 
  cardElement.querySelector('.elements__image').src = imageLink.value; /*source of image of a new card = input link*/
  cardElement.querySelector('.elements__text').textContent = placeName.value; /*text of a new card = input text*/
  elements.prepend(cardElement); /*add template content to elements*/ 
}
  addFormInput.addEventListener('submit', addFormSubmitHandler); /*submit addform and insert link+image*/
  saveAddCardButton.addEventListener('click', closeAddCardForm); /*close addform*/

/*           CLOSE ADD-CARD FORM          */
let closeAddCardButton = document.querySelector('.popup__add-card-close-button');
function closeAddCardForm () {
  displayAddCard.classList.add('popup__add-card_closed');
}
closeAddCardButton.addEventListener('click', closeAddCardForm);



