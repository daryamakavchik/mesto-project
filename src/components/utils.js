const openedPopup = document.querySelector(".popup_opened");

export function openPopup(somePopup) {
  somePopup.classList.add("popup_opened");
}

export function closePopup(somePopup) {
  somePopup.classList.remove("popup_opened");
}

export function closeOnEsc(evt) {
  const escKeyCode = 27;
  if (evt.keyCode === escKeyCode) {
    closePopup(openedPopup);
  }
}

export function pressLike(evt) {
  evt.target.classList.toggle("elements__icon_active");
}

export function deleteCard(evt) {
  evt.target.closest(".elements__element").remove();
}