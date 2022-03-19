export function openPopup(somePopup) {
  somePopup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape); 
}

export function closePopup(somePopup) {
  somePopup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
