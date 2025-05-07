const toggleButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

toggleButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
});