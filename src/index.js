import './styles/index.scss';
import './styles/header.scss';
import './styles/mainScreen.scss';
import './styles/aboutUs.scss';
import './styles/disciplines.scss';
import './styles/services.scss';
import './styles/trainings.scss';
import './styles/gallery.scss';
import './styles/joinUs.scss';
import './styles/footer.scss';
import './styles/contacts.scss';
import './styles/darkMode.scss';

// const modeBtn = document.getElementById('mode_btn');
const mobileMenuBtn = document.getElementById('mobile_menu-btn');
const navMenu = document.querySelector('.header_nav');
console.log(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('isOpened');

  if (mobileMenuBtn.classList.value === 'isOpened') {
    navMenu.classList.add('opened');
  } else {
    navMenu.classList.remove('opened');
    navMenu.classList.add('closing');
    navMenu.addEventListener(
      'animationend',
      () => {
        navMenu.classList.remove('closing');
      },
      { once: true }
    );
  }
});

// modeBtn.addEventListener('click', (event) => {
//   document.body.classList.toggle('dark');
//   console.log(this);
// });
