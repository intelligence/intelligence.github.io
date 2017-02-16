const scrubMedia = function (elem) {
  let scrollToValue = 0;
  let scrollToTarget = scrollToValue;
  const videoElem = elem.querySelector('video');


  const createBlob = function () {
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


  const setupBlobs = function () {
    createBlob(elem);
  };


  const scrubVideo = function (event) {
    const num = event.clientX / viewport.width();
    const scrubToValue = Math.round(num * 100) / 100;

    // Set currentTime
    videoElem.currentTime = (scrubToValue * 2);
  };


  const mouseListener = function () {
    elem.addEventListener('mousemove',
      event => scrubVideo(event), false);
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