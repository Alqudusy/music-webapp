const showMenu = () => {
    const dropDownMenu = document.querySelector('.drop-down-content');
    dropDownMenu.style.display = (dropDownMenu.style.display === 'block') ? 'none' : 'block';
}

const dropDownIcon = document.querySelector('#menu-icon').addEventListener('click', () => {
    showMenu();
});

document.querySelector('#theme-toggler').addEventListener('click', () => {
    if (document.querySelector('#theme-toggler').checked) {
        document.querySelector('#theme-toggler').checked = true;
    } else {
        document.querySelector('#theme-toggler').checked = false;
    }
});
document.querySelector('#setting-icon').addEventListener('click', () => {
    const setting = document.querySelector('.setting');
    setting.style.display = (setting.style.display === 'flex') ? 'none' : 'flex';
    document.querySelector('#setting-icon').style.zIndex = '3';
});
document.querySelector('#seeking').value = 0;

const themeToggler = document.getElementById('theme-toggler');

themeToggler.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggler.checked = true;
    }
});
const checkbox = document.getElementById('theme-toggler');
const body = document.body;

function toggleBackgroundColor() {
    if (checkbox.checked) {
        body.style.backgroundColor = 'white';
    } else {
        body.style.backgroundColor = 'black';
    }
}

checkbox.addEventListener('change', toggleBackgroundColor);
