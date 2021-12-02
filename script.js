let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.form__button');
let display = document.querySelector('.popup_closed');

function openEditForm () {
  display.classList.remove('popup_closed');
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