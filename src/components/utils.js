const escKey = "Escape";

export function openPopup(somePopup) {
  somePopup.classList.add("popup_opened");
  document.addEventListener("keydown", function closeOnEsc(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === escKey) {
      closePopup(openedPopup);
    }
  });
}

export function closePopup(somePopup) {
  somePopup.classList.remove("popup_opened");
}

export function pressLike(evt) {
  evt.target.classList.toggle("elements__icon_active");
}

export function deleteCard(evt) {
  evt.target.closest(".elements__element").remove();
}
