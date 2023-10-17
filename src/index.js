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

const modeBtn = document.getElementById('mode_btn');

modeBtn.addEventListener('click', (event) => {
  document.body.classList.toggle('dark');
  console.log(this);
});

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

/*--------------GALLERY--------------*/
const galleryImages = document.querySelectorAll('.gallery_image');
const galleryPopup = document.querySelector('.gallery_popup');
const galleryCollapseBtn = document.querySelector('#popup_collapse-btn');
const popupImage = document.querySelector('#popup_image');
const galleryLeftButton = document.querySelector('#gallery_left');
const galleryRightButton = document.querySelector('#gallery_right');
let currentImage = 1;

galleryImages.forEach((image, id) => {
  image.addEventListener('click', () => {
    galleryPopup.classList.toggle('active');
    document.body.style.overflowY = 'hidden';
    updateImage(id + 1);
  });
});

galleryLeftButton.addEventListener('click', () => {
  currentImage -= 1;

  if (currentImage <= 0) {
    currentImage = galleryImages.length;
  }

  updateImage(currentImage);
});

galleryRightButton.addEventListener('click', () => {
  currentImage += 1;

  if (currentImage > galleryImages.length) {
    currentImage = 1;
  }

  updateImage(currentImage);
});

galleryCollapseBtn.addEventListener('click', () => {
  closePopup();
});

function updateImage(i) {
  popupImage.src = `./assets/images/gallery_${i}.jpg`;
}

function closePopup() {
  galleryPopup.classList.remove('active');
  galleryPopup.classList.add('closing');
  galleryPopup.addEventListener(
    'animationend',
    () => {
      galleryPopup.classList.remove('closing');
      document.body.style.overflowY = 'unset';
    },
    { once: true }
  );
}

/*--------------ONSCROLL ANIMATIONS--------------*/

const animItems = document.querySelectorAll('._anim-items');
console.log(animItems);

if (animItems.length > 0) {
  window.addEventListener('scroll', animateOnScroll);

  function animateOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = elementOffset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        window.scrollY > animItemOffset - animItemPoint &&
        window.scrollY < animItemOffset + animItemHeight
      ) {
        animItem.classList.add('_animate');
      } else {
        if (!animItem.classList.contains('_anim-no-repeat')) {
          animItem.classList.remove('_animate');
        }
      }
    }
  }
  
  function elementOffset(element) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  
  animateOnScroll();
}

console.log(document.documentElement.scrollTop);