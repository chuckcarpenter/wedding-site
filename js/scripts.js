Y.use('squarespace-gallery-ng', function (Y) {

  var Gallery = function () {

    var els = {
        body: Y.one('body'),
        gallery: Y.one('.sqs-system-gallery'),
        slideWrapper:  Y.one('.sqs-system-gallery').one('.gallery-wrapper'),
        slidesAndControls: Y.one('.sqs-system-gallery').one('.slides-controls'),
        circles: Y.one('.sqs-system-gallery').one('.circles')
      },
      classes = {
        show: 'show',
        ready: 'sqs-system-gallery-ready',
        interaction: 'sqs-system-gallery-interaction',
        mouseenterleft: 'sqs-system-gallery-hover-slides-left',
        mouseenterright: 'sqs-system-gallery-hover-slides-right',
        init: 'sqs-system-gallery-init',
        circlesNav: 'gallery-navigation-circles',
        crop: 'gallery-auto-crop',
        iframe: 'sqs-system-gallery-video-iframe'
      },
      galleryObj = null,
      thumbnailsObj = null,
      windowWidth = window.innerWidth;

    // Current tweak value
    function getTweakValue(name, number) {
      var value = Y.Squarespace.Template.getTweakValue(name);

      if (number) {
        value = parseFloat(value);
      } else if (typeof value === 'string') {
        value = value.toLowerCase();
      }

      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }

      return value;
    }

    function getAspectRatio(tweakValue) {
      var aspectRatio = 0,
          matches = tweakValue && tweakValue.match(/(\d+):(\d+)/);

      if (matches && matches.length === 3) {
        aspectRatio = matches[1]/matches[2];
      }

      return aspectRatio;
    }

    // Remove inline styles
    function cleanSlideMeta() {
      var slide = els.gallery.one('.slide.sqs-active-slide'),
        activeSlideId = (slide && slide.getAttribute('data-slide-id')) || null,
        slideMeta = els.gallery.one('.slide-meta[data-slide-id="' + activeSlideId + '"]');

      if (slideMeta) {
        if (els.body.hasClass(classes.crop)) {
          slideMeta.setStyles({
            'top': null,
            'bottom': null,
            'left': null,
            'width': null
          });
        } else {
          if (els.body.hasClass(classes.circlesNav)) {
            slideMeta.setStyle('top', (parseFloat(slide._node.clientHeight) - parseFloat(slide.one('img')._node.clientHeight)) / 2);
            slideMeta.setStyle('bottom', null);
          } else {
            slideMeta.setStyle('top', null);
            slideMeta.setStyle('bottom', (parseFloat(slide._node.clientHeight) - parseFloat(slide.one('img')._node.clientHeight)) / 2);
          }

          slideMeta.setStyles({
            'left': slide.one('img').getComputedStyle('left'),
            'width': slide.one('img')._node.clientWidth
          });
        }
      }
    }

    // Check if current slide has title or description
    function hasSlideMeta(slide, slideMeta, check) {
      var title,
        description,
        found;

      if (slideMeta) {
        title = slideMeta.one('.title');
        description = slideMeta.one('.description');

        if ((title && title._node.innerHTML) || (description && description._node.innerHTML)) {
          if (check) {
            found = true;
          } else {
            slideMeta.addClass(classes.show);
            cleanSlideMeta();
          }
        }
      }

      return found;
    }

    // Slide title and description
    function slideChange(e) {
      var activeSlide = els.gallery.one('.slide.sqs-active-slide'),
        activeImage = activeSlide && activeSlide.one('img'),
        activeSlideId = (activeSlide && activeSlide.getAttribute('data-slide-id')) || null,
        bottom;

      els.gallery.all('.slide-meta').removeClass(classes.show);

      if (e && Modernizr && !Modernizr.touch) {
        els.gallery.addClass(classes.interaction);
      }

      // When hovering over an iframe, mouseover does not fire
      // -- Always show arrows if this happens
      if (isVideo()) {
        els.gallery.addClass(classes.iframe);
        els.gallery.removeClass(classes.mouseenterleft);
        els.gallery.removeClass(classes.mouseenterright);
      } else {
        els.gallery.removeClass(classes.iframe);

        // Show/hide arrows
        if (e && e.type === 'Gallery:currentIndexChange') {
          if (e.direction === -1) {
            els.gallery.addClass(classes.mouseenterleft);
          } else {
            els.gallery.addClass(classes.mouseenterright);
          }

        }
      }

      if (activeSlideId) {
        hasSlideMeta(activeSlide, els.gallery.one('.slide-meta[data-slide-id="' + activeSlideId + '"]'));

        if (activeImage && els.body.hasClass(classes.circlesNav)) {
          var setBottom = function() {
            bottom = Math.max(0, (parseFloat(activeSlide._node.clientHeight) - parseFloat(activeImage._node.clientHeight)) / 2);
            els.circles.setStyle('bottom', bottom);
          };
          if (activeImage.get('complete')) {
            setBottom();
          } else {
            activeImage.on('load', setBottom);
          }
        }
      }
    }

    // SQS Gallery API
    function buildGallery() {
      var galleryLoop = getTweakValue('gallery-loop'),
        galleryAutoCrop = getTweakValue('gallery-auto-crop'),
        galleryAutoplay = getTweakValue('gallery-autoplay'),
        gallerySlideTransition = getTweakValue('gallery-transitions'),
        galleryAutoplaySpeed = getTweakValue('galleryAutoplaySpeed', true) * 1000,
        galleryNavigation = getTweakValue('gallery-navigation'),
        galleryHeight = getTweakValue('gallery-aspect-ratio'),
        slideshowAspectRatio = galleryHeight.split(' ')[0],
        isGalleryGrid = !isSlideshow(),
        galleryIndex = 0;

      // Prepare height
      slideshowAspectRatio = parseInt(galleryHeight.split(':')[1], 10) / parseInt(galleryHeight.split(':')[0], 10);
      galleryHeight = els.gallery._node.clientWidth * slideshowAspectRatio;

      // Building
      els.gallery.removeClass(classes.init);
      els.gallery.removeClass(classes.ready);
      els.gallery.removeClass(classes.interaction);
      els.gallery.removeClass(classes.mouseenterleft);
      els.gallery.removeClass(classes.mouseenterright);
      els.gallery.all('.slide-meta').removeClass(classes.show);

      // Destroy and clean gallery
      if (galleryObj) {
        galleryIndex = galleryObj.get('currentIndex');

        els.gallery.all('.sqs-disabled').removeClass('sqs-disabled');
        els.gallery.all('.sqs-active-slide').removeClass('sqs-active-slide');

        // Cleanup fade / scroll related CSS
        els.gallery.all('.slide, img').setStyles({
          visibility: null,
          left: null,
          top: null,
          overflow: null,
          width: null,
          height: null
        });

        galleryObj.destroy();
      }

      // Destroy thumbnail strip
      if (thumbnailsObj) {
        els.gallery.all('.thumbnail img[data-src]').each(function (img) {
          img.setStyles({
            'height': null,
            'width': null,
            'top': null,
            'left': null
          });
        });
        thumbnailsObj.destroy();
      }

      // Adjust gallery height
      els.gallery.one('.slides-controls').setStyle('height', isGalleryGrid ? null : galleryHeight);
      els.slideWrapper.setStyle('minHeight', isGalleryGrid ? null : galleryHeight);

      // New object
      galleryObj = new Y.Squarespace.Gallery2({
        container: '.slides',
        slides: '.slide',
        currentIndex: galleryIndex,
        elements: {
          next: '.next-slide, .simple .next',
          previous: '.previous-slide, .simple .previous',
          controls: '.dots, .numbers, .circles',
          currentIndex: '.current-index',
          totalSlides: '.total-slides'
        },
        loop: galleryLoop,
        autoplay: isGalleryGrid ? false : galleryAutoplay,
        autoplayOptions: {
          randomize: false,
          timeout: galleryAutoplaySpeed,
          pauseOnMouseover: ['.thumbnail-wrapper']
        },
        lazyLoad: true,
        loaderOptions: {
          mode: isGalleryGrid ? (getTweakValue('aspect-ratio') === 'auto' ? 'none' : 'fill') : (galleryAutoCrop ? 'fill' : 'fit')
        },
        design: isGalleryGrid ? 'autocolumns' : 'stacked',
        designOptions: {
          transition: gallerySlideTransition,
          lightbox: isGalleryGrid,
          clickBehavior: 'auto',
          gutter: getTweakValue('gridSpacing', true),
          columnWidth: getTweakValue('gridSize', true),
          aspectRatio: getAspectRatio(getTweakValue('aspect-ratio'))
        },
        historyHash: true
      });

      // Set arrows
      // top: 50%; in CSS does not look good -- use px instead
      els.gallery.all('.arrow').each(function (e) {
        e.setStyle('top', els.slideWrapper._node.clientHeight / 2);
      });

      // Init Thumbnails only when required
      if (!isGalleryGrid && galleryNavigation === 'thumbnails') {

        thumbnailsObj = new Y.Squarespace.Gallery2({
          container: '.thumbnail-wrapper',
          currentIndex: galleryIndex,
          loaderOptions: {
            mode: 'fill',
            load: true
          },
          lazyLoad: true,
          design: 'strip'
        });

        galleryObj.addChild(thumbnailsObj);
      }

      // Keep track of slide changes
      galleryObj.after('currentIndexChange', slideChange);
      slideChange();

      // refresh meta positioning after images load
      galleryObj.after('image-loaded', cleanSlideMeta);
      cleanSlideMeta();

      els.gallery.addClass(classes.ready);
    }

    // Slow down fn calls
    function throttle(fn) {

      if (typeof fn === 'function') {

        if (window.throttleTimeout) {
          clearTimeout(window.throttleTimeout);
        }

        window.throttleTimeout = setTimeout(fn, 750);
      }
    }

    // Handle mouseenter/leave interaction
    function interaction(e, leave) {
      var x = e._event.offsetX || e._event.layerX;

      // Keep track of interactions
      els.gallery.addClass(classes.interaction);

      // Hover over img or Video Overlay
      if (e._event.target && (e._event.target.localName === 'img' || e._event.target.className === 'sqs-video-opaque' || e.target.hasClass('slide'))) {
        if (!leave) {
          if (x <= e._currentTarget.clientWidth / 2) {
            els.gallery.removeClass(classes.mouseenterright);
            els.gallery.addClass(classes.mouseenterleft);
          } else {
            els.gallery.removeClass(classes.mouseenterleft);
            els.gallery.addClass(classes.mouseenterright);
          }
        } else {
          els.gallery.removeClass(classes.mouseenterleft);
          els.gallery.removeClass(classes.mouseenterright);
        }
      }
    }

    // Listen for keystrokes
    function keyDown(e) {
      var key = e.keyCode;

      if (key === 37 || key === 39 && isSlideshow()) {
        els.gallery.addClass(classes.interaction);
      }
    }

    // Check if current slide is video
    function isVideo() {
      var activeSlide = els.gallery.one('.slide.sqs-active-slide');

      return (activeSlide && activeSlide.getAttribute('data-type') === 'video' && activeSlide.one('iframe'));
    }

    function isSlideshow() {
      return getTweakValue('gallery-design') !== 'grid';
    }

    // Register Events
    function events() {
      var resizer = new Y.Squarespace.ResizeEmitter({timeout: 100});
      resizer.on('resize:end', function() {
        if (window.innerWidth !== windowWidth) {
          windowWidth = window.innerWidth;
          throttle(buildGallery);
        }
      });

      if (Modernizr && !Modernizr.touch) {
        Y.on('mousemove', function (e) {
          if(isSlideshow()) {
            interaction(e, false);
          }
        }, els.gallery.one('.slides-controls'));

        Y.on('mouseleave', function (e) {
          if(isSlideshow()) {
            interaction(e, true);
            els.gallery.removeClass(classes.iframe);
          }
        }, els.gallery.one('.slides-controls'));

        Y.on('mouseenter', function (e) {
          if (isSlideshow() && isVideo()) {
            els.gallery.addClass(classes.iframe);
          }
        }, els.gallery.one('.slides-controls'));
      }

      Y.on('keydown', keyDown);
    }

    // Tweak Changes
    function watchTweak(tweakName, callback) {

      Y.Global.on('tweak', function (f) {
        if ((f.getName() === tweakName) && (typeof callback === 'function')) {
          var value = f.getValue();

          if (value === 'true') {
            value = true;
          } else if (value === 'false') {
            value = false;
          }

          callback(value);
        }
      });
    }

    // Respond to tweak changes
    function tweaks() {
      watchTweak('gallery-loop', buildGallery);
      watchTweak('gallery-transitions', buildGallery);
      watchTweak('gallery-auto-crop', buildGallery);

      watchTweak('gallery-navigation', function (newTweakValue) {
        if (newTweakValue === 'Thumbnails' && !els.gallery.one('.thumbnail-wrapper img[src]')) {
          buildGallery();
        }

        cleanSlideMeta();
      });

      watchTweak('gallery-autoplay', function (newTweakValue) {
        galleryObj.set('autoplay', newTweakValue);
      });

      watchTweak('gallery-aspect-ratio', function () {
        buildGallery();
      });

      watchTweak('galleryAutoplaySpeed', function () {
        throttle(buildGallery);
      });

      watchTweak('galleryInfoBackground', function () {
        slideChange();
      });

      watchTweak('gallery-design', buildGallery);
      watchTweak('aspect-ratio', buildGallery);
      watchTweak('gridSpacing', buildGallery);
      watchTweak('gridSize', buildGallery);

      Y.Global && Y.Global.on(['tweak:reset', 'tweak:close'], function(f){
        Y.later(500, this, buildGallery);
      },this);

    }

    // Constructor
    function init() {
      buildGallery();
      events();
      if (Y.Lang.isValue(Static.SQUARESPACE_CONTEXT.authenticatedAccount)) {
        tweaks();
      }
    }

    init();
  }

  // Ready?
  Y.on('domready', function () {
    new Gallery();
  });
});
