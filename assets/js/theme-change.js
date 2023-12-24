const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

if (currentTheme) {
    setTheme(currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';
}

function switchTheme() {
    const newTheme = toggleSwitch.checked ? 'dark' : 'light';
    setTheme(newTheme);
}

toggleSwitch.addEventListener('change', switchTheme);
