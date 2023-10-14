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

/*--------------NAVIGATION--------------*/

const navMenu = document.querySelector('.header_nav');
const mainLogo = document.querySelector('.main_logo');

navMenu.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'a') {
    event.preventDefault();
    document.querySelector(event.target.getAttribute('href')).scrollIntoView();
  }
});

mainLogo.addEventListener('click', (event) => {
  event.preventDefault();
  scrollTo({ top: 0 });
});

/*--------------MOBILE MENU--------------*/

const mobileMenuBtn = document.getElementById('mobile_menu-btn');

function closeMenu() {
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

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('isOpened');

  if (mobileMenuBtn.classList.value === 'isOpened') {
    navMenu.classList.add('opened');
  } else {
    closeMenu();
  }
});

document.addEventListener('click', (event) => {
  if (
    !event.target.className.includes('header_nav') &&
    event.target.id !== 'mobile_menu-btn' &&
    navMenu.className.includes('opened')
  ) {
    mobileMenuBtn.classList.remove('isOpened');
    closeMenu();
  }
});

/*--------------DARK MODE--------------*/

// const modeBtn = document.getElementById('mode_btn');

// modeBtn.addEventListener('click', (event) => {
//   document.body.classList.toggle('dark');
//   console.log(this);
// });

/*----------------SECTIONS ANCHORS----------------*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

function changeActiveMenuTab() {
  const scrollFromTop = window.scrollY;

  if (scrollFromTop === 0) {
    document
      .querySelector('header nav a[href="#main_screen"]')
      .classList.add('active');

    return;
  } else {
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionOffset = section.offsetTop - sectionHeight / 4;
      const sectionId = section.getAttribute('id');

      if (
        scrollFromTop > sectionOffset &&
        scrollFromTop < sectionOffset + sectionHeight
      ) {
        navLinks.forEach((navLink) => {
          const sectionLink = document.querySelector(
            `header nav a[href='#${sectionId}']`
          );

          if (sectionLink) {
            navLink.classList.remove('active');
            sectionLink.classList.add('active');
          }
        });
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', changeActiveMenuTab);
window.addEventListener('scroll', changeActiveMenuTab);
