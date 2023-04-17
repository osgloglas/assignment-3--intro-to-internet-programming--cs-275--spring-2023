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

modal.addEventListener(`click`, (onBackground) => {
    if (onBackground.target === document.querySelector(`.modal-panel`))
    {
        modal.style.display = `none`;
    }

});

//drop down menu
