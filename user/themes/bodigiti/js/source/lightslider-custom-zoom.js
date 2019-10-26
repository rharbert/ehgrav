
// Requires jQuery

jQuery(function($) {

 /////////////////////////////////////////////////////////////////////////////
 // Slider Zoom Background Image... for Lightslider ('DEF')
 /////////////////////////////////////////////////////////////////////////////

  // Image
  var defaultWidth = '800px'; /* Needs to be 2px more than CSS #lightslider-wrapper */
  var defaultHeight = '800px'; /* Needs to be 2px more than CSS #lightslider-wrapper */
  window.imagezoom = (function() {
  var defaults = {
      zoom: 0.95,
      maxZoomCount: 2,
      touchSliderOffset: 170,
      doubleClickDelta: 300,
  };
  var canvas = document.createElement('canvas');
  var main = function(img, options) {
      if (!img || !img.nodeName || img.nodeName !== 'IMG') {
          return;
      }
      var settings = {};
      var width;
      var height;
      var bgWidth;
      var bgHeight;
      var bgPosX;
      var bgPosY;
      var previousEvent;
      var cachedDataUrl;
      var mousemoveFired = false;
      var zoomCount = 0;
      var touchPos;
      var tmpBgPosX;
      var tmpBgPosY;
      var touchPosSlider;
      var touchtime = 0;
      function setSrcToBackground(img) {
          img.style.backgroundImage = 'url("' + img.src + '")';
          img.style.backgroundRepeat = 'no-repeat';
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          cachedDataUrl = canvas.toDataURL();
          img.src = cachedDataUrl;
      }
      function updateBgStyle() {
          if (bgPosX > 0) {
              bgPosX = 0;
          } else if (bgPosX < width - bgWidth) {
              bgPosX = width - bgWidth;
          }
          if (bgPosY > 0) {
              bgPosY = 0;
          } else if (bgPosY < height - bgHeight) {
              bgPosY = height - bgHeight;
          }
          img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
          img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
      }
      function reset() {
          bgWidth = width;
          bgHeight = height;
          bgPosX = bgPosY = 0;
          updateBgStyle();
          zoomCount = 0;
      }
      function zoomIn(e) {
          if (mousemoveFired === true) {
              mousemoveFired = false;
              return;
          }
          e.preventDefault();
          var rect = img.getBoundingClientRect();
          var offsetX = e.pageX - rect.left - window.pageXOffset;
          var offsetY = e.pageY - rect.top - window.pageYOffset;
          var bgCursorX = offsetX - bgPosX;
          var bgCursorY = offsetY - bgPosY;
          var bgRatioX = bgCursorX / bgWidth;
          var bgRatioY = bgCursorY / bgHeight;
          bgWidth += bgWidth * settings.zoom;
          bgHeight += bgHeight * settings.zoom;
          bgPosX = offsetX - (bgWidth * bgRatioX);
          bgPosY = offsetY - (bgHeight * bgRatioY);
          if (bgWidth <= width || bgHeight <= height || zoomCount >= settings.maxZoomCount) {
              reset();
          } else {
              updateBgStyle();
              zoomCount++;
          }
      }
      function zoomOut(e) {
          if (mousemoveFired === true) {
              mousemoveFired = false;
              return;
          }
          e.preventDefault();
          reset();
      }
      function drag(e) {
          if (zoomCount > 0) {
              mousemoveFired = true;
              e.preventDefault();
              bgPosX += (e.pageX - previousEvent.pageX);
              bgPosY += (e.pageY - previousEvent.pageY);
              previousEvent = e;
              updateBgStyle();
          }
      }
      function removeDrag() {
          document.removeEventListener('mouseup', removeDrag);
          document.removeEventListener('mousemove', drag);
      }
      function draggable(e) {
          e.preventDefault();
          previousEvent = e;
          document.addEventListener('mousemove', drag);
          document.addEventListener('mouseup', removeDrag);
      }
      function touchDrag(e) {
          if (zoomCount > 0) {
              e.preventDefault();
          }
          if (e.targetTouches.length == 1) {
              var touch = e.targetTouches[0];
              var offsetX = touch.clientX - touchPos.x;
              var offsetY = touch.clientY - touchPos.y;
              bgPosX = tmpBgPosX + offsetX;
              bgPosY = tmpBgPosY + offsetY;
              previousEvent = e;
              updateBgStyle();
          }
      }
      function removeTouchDrag() {
          img.removeEventListener('touchmove', touchDrag);
          img.removeEventListener('touchend', removeTouchDrag);
      }
      function touchDragable(e) {
          previousEvent = e;
          tmpBgPosX = bgPosX;
          tmpBgPosY = bgPosY;
          touchPos = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
          };
          img.addEventListener('touchmove', touchDrag, false);
          img.addEventListener('touchend', removeTouchDrag);
      }
      function touchNextPrev(e) {
          touchPosSlider = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
          };
          img.addEventListener('touchmove', touchNextPrevMove, false);
          img.addEventListener('touchend', removeTouchNextPrevMove);
      }
      function removeTouchNextPrevMove() {
          img.removeEventListener('touchmove', touchNextPrevMove);
          img.removeEventListener('touchend', removeTouchNextPrevMove);
      }
      function touchNextPrevMove(e) {
          if (e.targetTouches.length == 1) {
              var $target = $(e.target);
              var touch = e.targetTouches[0];
              var offsetX = touch.clientX - touchPosSlider.x;
              if (Math.abs(offsetX) > settings.touchSliderOffset) {
                  if (offsetX < -Math.abs(settings.touchSliderOffset)) {
                      if ($target.hasClass('main-slider-item') && typeof product_detail_slider.main === 'object') {
                          product_detail_slider.main.goToNextSlide();
                      } else if ($target.hasClass('large-slider-item') && typeof product_detail_slider.largesize === 'object') {
                          product_detail_slider.largesize.goToNextSlide();
                      }
                  } else if (offsetX > settings.touchSliderOffset) {
                      if ($target.hasClass('main-slider-item') && typeof product_detail_slider.main === 'object') {
                          product_detail_slider.main.goToPrevSlide();
                      } else if ($target.hasClass('large-slider-item') && typeof product_detail_slider.largesize === 'object') {
                          product_detail_slider.largesize.goToPrevSlide();
                      }
                  }
                  e.preventDefault();
              }
          }
      }
      function checkDoubleClick(e) {
          if ('boolean' === typeof bIsMobile && true === bIsMobile) {
              if (0 === touchtime) {
                  zoomIn(e);
                  touchtime = new Date().getTime();
              } else {
                  if (((new Date().getTime()) - touchtime) < settings.doubleClickDelta) {
                      zoomOut(e);
                      touchtime = 0;
                  } else {
                      zoomIn(e);
                      touchtime = new Date().getTime();
                  }
              }
          } else {
              zoomIn(e);
          }
      }
      function loadStyle(enableSetSrcToBackground) {
          var computedStyle = window.getComputedStyle(img, null);
          if (computedStyle.width !== 'auto' && computedStyle.width !== '100%') {
              defaultWidth = computedStyle.width;
              width = parseInt(computedStyle.width, 10);
          } else {
              width = parseInt(defaultWidth, 10);
          }
          if (computedStyle.height !== 'auto' && computedStyle.height !== '100%') {
              defaultHeight = computedStyle.height;
              height = parseInt(computedStyle.height, 10);
          } else {
              height = parseInt(defaultHeight, 10);
          }
          bgWidth = width;
          bgHeight = height;
          bgPosX = 0;
          bgPosY = 0;
          if (true === enableSetSrcToBackground) {
              setSrcToBackground(img);
          }
          img.style.backgroundSize = width + 'px ' + height + 'px';
          img.style.backgroundPosition = '0 0';
      }
      function load() {
          if (img.src === cachedDataUrl)
              return;
          loadStyle(true);
          img.addEventListener('imagezoom.reset', reset);
          img.addEventListener('click', checkDoubleClick);
          img.addEventListener('contextmenu', zoomOut);
          img.addEventListener('mousedown', draggable);
          img.addEventListener('touchstart', touchDragable);
          img.addEventListener('touchstart', touchNextPrev);
          window.addEventListener('resize', function() {
              loadStyle(false);
              reset();
          });
      }
      options = options || {};
      Object.keys(defaults).forEach(function(key) {
          settings[key] = options[key] !== undefined ? options[key] : defaults[key];
      });
      if (img.complete) {
          load();
      }
      img.addEventListener('load', load);
  };
  if (typeof window.getComputedStyle !== 'function') {
      return function(elements) {
          return elements;
      }
      ;
  } else {
      return function(elements, options) {
          if (elements && elements.length) {
              Array.prototype.forEach.call(elements, main, options);
          } else if (elements && elements.nodeName) {
              main(elements, options);
          }
          return elements;
      }
      ;
  }
  }());

  $(function() {
    imagezoom(document.querySelectorAll('img.imagezoom'));
  });

  /* End Zoom Background Image ('DEF')
   * -------------------------------------------------------------------------*/

});
