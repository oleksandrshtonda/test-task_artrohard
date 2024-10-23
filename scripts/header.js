let ticking = false;
const NAV_LINK_ACTIVE_CLASS = 'navigation__link--active';

function updateActiveLink() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.navigation__link');

  if (!ticking) {
    window.requestAnimationFrame(function() {
      let index = sections.length;

      while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

      navLinks.forEach((link) => link.classList.remove(NAV_LINK_ACTIVE_CLASS));
      navLinks[index].classList.add(NAV_LINK_ACTIVE_CLASS);
      ticking = false;
    });

    ticking = true;
  }
}

function debounce(callback, wait = 10, immediate = true) {
  let timeout;

  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) callback.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      callback.apply(context, args)
    }
  };
}

const optimizedUpdateActiveLink = debounce(updateActiveLink);
window.addEventListener('scroll', optimizedUpdateActiveLink);
