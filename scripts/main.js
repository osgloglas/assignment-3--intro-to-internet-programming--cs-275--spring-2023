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
const showMenuButton = document.querySelector(`#js-triggers li:first-child a`);
const menu = document.querySelector(`nav`);
let menuVisible = false;

showMenuButton.addEventListener(`click`, () => {
    if (menuVisible)
    {
        if (window.innerWidth > 736)
        {
            menu.style.top = `0`;
            menu.style.left = `50%`;
            menu.style.transform = `translateX(-50%)`;
        }
        else if (window.innerWidth <= 736)
        {
            menu.style.left = `-400px`;
            menu.style.top = `100px`;
        }
    }
    else
    {
        if (window.innerWidth > 736)
        {
            menu.style.top = `100px`;
        }
        else if (window.innerWidth <= 736)
        {
            menu.style.left = `200px`;
        }
    }
    menuVisible = !menuVisible;
});
//TODO: fix transitions (issues in CSS at bottom)
