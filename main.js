const splash = (function () {
  let splashElement;
  let splashHeight;
  let context;
  let working;


  const scrollUpdate = function () {
    if ((context.pageYOffset || context.scrollTop) - (context.clientTop || 0) >= splashHeight) {
      if (splashElement) { // why bother if it's already removed!
        context.removeChild(splashElement);
        splashElement = null;
        document.body.classList.remove('init');
        context.scrollTop = 1;
      }
    }
    working = false;
  };


  const resizeEvent = function () {
    window.addEventListener('resize', () => {
      if (splashElement) {
        splashHeight = getSize(splashElement).height;
      }
    });
  };


  const scrollEvent = function () {
    context.addEventListener('scroll', () => {
      if (!working) {
        requestAnimationFrame(scrollUpdate);
        working = true;
      }
    }, false);
  };


  const initSplash = function () {
    context = document.querySelectorAll('.wrap')[0];
    splashElement = document.querySelectorAll('.preload')[0];

    resizeEvent();
    scrollEvent();

    setTimeout(() => {
      splashHeight = getSize(splashElement).height;
    }, 500);
  };

  return {
    init: initSplash,
  };
}());