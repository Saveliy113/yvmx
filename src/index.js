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

window.onscroll = () => {
  console.log(window.scrollY);
};

// modeBtn.addEventListener('click', (event) => {
//   document.body.classList.toggle('dark');
//   console.log(this);
// });

/*----------------SECTIONS ANCHORS----------------*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const contactsLink = document.querySelector(
  'header nav a[href="#contacts"]'
).outerHTML;

console.log('Contacts Link: ', contactsLink);
console.log('All header links: ', navLinks);

window.onscroll = () => {
  sections.forEach((section) => {
    const scrollFromTop = window.scrollY;
    const sectionOffset = section.offsetTop - 200;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    // console.log('Section ID: ', sectionId);

    if (
      scrollFromTop > sectionOffset &&
      scrollFromTop < sectionOffset + sectionHeight
    ) {
      navLinks.forEach((navLink) => {
        navLink.classList.remove('active');
        document
          .querySelector(`header nav a[href='#${sectionId}']`)
          .classList.add('active');
      });
    }
  });
};

console.log(navLinks);
