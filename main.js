const scrubMedia = function (elem) {
  let num = 0,
      scrubToValue = 0,
      scrubToTarget = scrubToValue,
      needForRAF = true;
  
  const videoElem = elem.querySelector('video'),
        clipLength = 2;


  const setupBlobs = function () {
    const dataSrc = videoElem.getAttribute('data-src');

    const req = new XMLHttpRequest();
    req.open('GET', dataSrc, true);
    req.responseType = 'blob';

    req.onload = function () {
      // Onload is triggered even on 404
      // so we need to check the status code
      if (this.status === 200) {
        const videoBlob = this.response;
        const vid = URL.createObjectURL(videoBlob); // IE10+
        // Video is now downloaded
        // and we can set it as source on the video element
        videoElem.src = vid;
        setTimeout(() => {
          videoElem.currentTime = 0.01;
        }, 750);
      }
    };
    req.onerror = function () {
      // Error
    };

    req.send();
  };


  const update = function () {
    needForRAF = true; // rAF now consumes the movement instruction so a new one can come

    // Set currentTime
    videoElem.currentTime = (scrubToValue * clipLength);
    videoElem.pause();
  }


  const mouseMove = function (event) {
    event.preventDefault();

    num = event.clientX / viewport.width();
    scrubToValue = Math.round(num * 100) / 100;

    if (needForRAF) {
      needForRAF = false;            // no need to call rAF up until next frame
      requestAnimationFrame(update); // request 60fps animation
    }; 
  }


  const mouseListener = function () {
    elem.addEventListener('mousemove', mouseMove, false);
  };


  const initScrubMedia = function () {
    setupBlobs();
    mouseListener();
  };


  return {
    init: initScrubMedia,
  };
};


document.addEventListener('DOMContentLoaded', function(event) {
  const videos = [];
  const scrubElems = document.querySelectorAll('.js-scrubMedia');
  if (scrubElems.length > 0) {
    for (let i = 0; i < scrubElems.length; i += 1) {
      videos[i] = scrubMedia(scrubElems[i]);
      videos[i].init();
    }
  }
});