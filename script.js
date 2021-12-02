let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.form__button');
let displayForm = document.querySelector('.popup_closed');

function openEditForm () {
  displayForm.classList.remove('popup_closed');
}
editButton.addEventListener('click', openEditForm);

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


let closeButton = document.querySelector('.popup__close-button');
function closeEditForm () {
  display.classList.add('popup_closed');
}
closeButton.addEventListener('click', closeEditForm);


let addButton = document.querySelector('.profile__add-button');
let displayAddCard = document.querySelector('.popup__add-card');
function openAddForm () {
  displayAddCard.classList.remove('popup__add-card_closed');
}
addButton.addEventListener('click', openAddForm);

let closeAddCardButton = document.querySelector('.popup__add-card-close-button');
function closeAddCardForm () {
  displayAddCard.classList.add('popup__add-card_closed');
}
closeAddCardButton.addEventListener('click', closeAddCardForm);