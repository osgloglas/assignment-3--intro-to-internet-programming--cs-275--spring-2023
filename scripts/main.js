//modal
const showModalButton = document.querySelector(`#js-triggers li:last-child a`);
const modal = document.querySelector(`.modal-panel`);

showModalButton.addEventListener(`click`, () => {
    modal.style.display = `flex`;
});

document.addEventListener(`keydown`,(k) => {
    if (k.code === `Escape`)
    {
        modal.style.display = `none`;
    }
});

showModalButton.addEventListener(`click`, () => {
    modal.style.display = `flex`;
});
//TODO: fix this to exit modal on background click
