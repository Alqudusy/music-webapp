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