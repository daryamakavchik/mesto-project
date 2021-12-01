let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.form__button');
let display = document.querySelector('.popup_closed');

function openEditForm () {
  display.classList.remove('popup_closed');
}
editButton.addEventListener('click', openEditForm);

function saveEditForm() {
  display.classList.add('popup_closed');
}
saveButton.addEventListener('click', saveEditForm);

let closeButton = document.querySelector('.popup__close-button');

function closeEditForm () {
  display.classList.add('popup_closed');
}
closeButton.addEventListener('click', closeEditForm);