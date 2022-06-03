function ui() {
  const container = document.querySelector('.container');
  const headerLinksCollection = container.querySelectorAll('.header-link');
  const burgerMenuLinksCollection = container.querySelectorAll('.burger-menu-popup-list-item-link');
  const burgerMenuWrapper = container.querySelector('.burger-menu_wrapper');
  const burgerMenuGrid = burgerMenuWrapper.querySelector('.burger-menu');
  const burgerMenuGridMiddleLine = burgerMenuGrid.querySelector('.burger-menu-middle-line');
  const popupMenu = burgerMenuWrapper.querySelector('.burger-menu-popup');
  const popupMenuList = burgerMenuWrapper.querySelector('.burger-menu-popup-list');
  const listItemHeadingCollection = burgerMenuWrapper.querySelectorAll('.burger-menu-popup-list-item-heading');
  let animation = true;

  for (const headerLink of headerLinksCollection) {
    headerLink.addEventListener('click', (event) => {
      const className = event.currentTarget.firstElementChild.classList[1];
      setTimeout(() => {
        container.querySelector(`.section-${className}`).scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 400);
    });
  }

  for (const burgerMenuLink of burgerMenuLinksCollection) {
    burgerMenuLink.addEventListener('click', (event) => {
      const className = event.currentTarget.firstElementChild.classList[1];
      setTimeout(() => {
        container.querySelector(`.section-${className}`).scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 1000);
    });
  }

  function hideBurgerWhenChangeSize() {
    if (window.innerWidth >= 768 && !popupMenu.classList.contains('hide')) {
      popupMenu.classList.remove('animation-popup-menu-shadow-area-unhide');
      popupMenu.classList.remove('animation-popup-menu-shadow-area-hide');
      burgerMenuGrid.classList.remove('animation-burger-menu-rotation-open');
      burgerMenuGrid.classList.remove('animation-burger-menu-rotation-closed');
      burgerMenuGridMiddleLine.remove('animation-burger-menu-middle-line-open');
      burgerMenuGridMiddleLine.remove('animation-burger-menu-middle-line-closed');
      popupMenuList.classList.remove('animation-popup-menu-list-open');
      popupMenuList.classList.remove('animation-popup-menu-list-closed');

      for (const heading of listItemHeadingCollection) {
        heading.classList.remove('animation-popup-menu-list-hide-text');
        heading.classList.remove('animation-popup-menu-list-unhide-text');
        heading.classList.remove('animation-popup-list-item-heading-increase-font-size');
        heading.classList.remove('animation-popup-list-item-heading-decrease-font-size');
      }

      popupMenu.classList.add('hide');
      document.body.style.overflow = 'auto';
    }
  }

  const resizeControl = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        hideBurgerWhenChangeSize();
      }
    }
  });

  resizeControl.observe(popupMenu);

  function show() {
    burgerMenuGrid.classList.add('animation-burger-menu-rotation-open');
    burgerMenuGridMiddleLine.classList.add('animation-burger-menu-middle-line-open');
    popupMenu.classList.add('animation-popup-menu-shadow-area-unhide');
    popupMenuList.classList.add('animation-popup-menu-list-open');
    for (const heading of listItemHeadingCollection) {
      heading.classList.add('animation-popup-list-item-heading-increase-font-size');
    }
  }

  function changeVisibilityBurgerMenu() {
    if (burgerMenuGrid.classList.contains('animation-burger-menu-rotation-closed')) {
      return;
    }

    if (!popupMenu.classList.contains('hide') && animation === true) {
      return;
    }

    if (popupMenu.classList.contains('hide')) {
      popupMenu.classList.remove('hide');
      show();
      document.body.style.overflow = 'hidden';
    } else if (burgerMenuGrid.classList.contains('animation-burger-menu-rotation-open')) {
      for (const heading of listItemHeadingCollection) {
        heading.classList.remove('animation-popup-list-item-heading-increase-font-size');
      }
      for (const heading of listItemHeadingCollection) {
        heading.classList.add('animation-popup-menu-list-hide-text');
      }
    }
  }

  burgerMenuGrid.addEventListener('click', () => {
    changeVisibilityBurgerMenu();
  });

  popupMenu.addEventListener('click', () => {
    changeVisibilityBurgerMenu();
  });

  for (const heading of listItemHeadingCollection) {
    heading.addEventListener('click', () => {
      changeVisibilityBurgerMenu();
    });
  }

  listItemHeadingCollection[0].addEventListener('animationend', () => {
    if (listItemHeadingCollection[0].classList.contains('animation-popup-menu-list-unhide-text')) {
      animation = false;
    }

    if (listItemHeadingCollection[0].classList.contains('animation-popup-menu-list-hide-text')) {
      for (const heading of listItemHeadingCollection) {
        heading.classList.remove('animation-popup-menu-list-unhide-text');
        heading.classList.add('animation-popup-list-item-heading-decrease-font-size');
      }
    }

    if (listItemHeadingCollection[0].classList.contains('animation-popup-list-item-heading-increase-font-size')) {
      for (const heading of listItemHeadingCollection) {
        heading.classList.add('animation-popup-menu-list-unhide-text');
      }
    }

    if (listItemHeadingCollection[0].classList.contains('animation-popup-menu-list-hide-text')) {
      for (const heading of listItemHeadingCollection) {
        heading.classList.remove('animation-popup-menu-list-hide-text');
      }

      for (const heading of listItemHeadingCollection) {
        heading.classList.add('animation-popup-list-item-heading-decrease-font-size');
      }
      popupMenu.classList.remove('animation-popup-menu-shadow-area-unhide');
      popupMenu.classList.add('animation-popup-menu-shadow-area-hide');
      burgerMenuGrid.classList.remove('animation-burger-menu-rotation-open');
      burgerMenuGrid.classList.add('animation-burger-menu-rotation-closed');
      burgerMenuGridMiddleLine.classList.remove('animation-burger-menu-middle-line-open');
      burgerMenuGridMiddleLine.classList.add('animation-burger-menu-middle-line-closed');
      popupMenuList.classList.remove('animation-popup-menu-list-open');
      popupMenuList.classList.add('animation-popup-menu-list-closed');
    }
  });

  burgerMenuGrid.addEventListener('animationend', () => {
    if (burgerMenuGrid.classList.contains('animation-burger-menu-rotation-closed')) {
      popupMenu.classList.add('hide');
      document.body.style.overflow = 'auto';
      animation = true;

      popupMenu.classList.remove('animation-popup-menu-shadow-area-hide');
      burgerMenuGrid.classList.remove('animation-burger-menu-rotation-closed');
      burgerMenuGridMiddleLine.classList.remove('animation-burger-menu-middle-line-closed');
      popupMenuList.classList.remove('animation-popup-menu-list-closed');
      for (const heading of listItemHeadingCollection) {
        heading.classList.remove('animation-popup-list-item-heading-decrease-font-size');
      }
    }
  });
}

ui();
