console.log('initializing real-gallery..');
var startTime = new Date();

RealGallery = function() {
    // Pointer to the object itself
    var obj = this;
    obj.realGalleryElements;

    /** Declaration for the real gallery plug-in initialization function
     */
    this.init = function() {
        // Irritate through all the realGalleryElements and call 'singleRealGalleryInit' for each 'real-gallery' element found
        obj.realGalleryElements = document.getElementsByTagName('real-gallery');
        for (var realGalleryElementIndex = obj.realGalleryElements.length - 1; realGalleryElementIndex >= 0; realGalleryElementIndex--) {
            var realGalleryElement = obj.realGalleryElements[realGalleryElementIndex];
            realGalleryElement.currSlideIdx = 0;
            realGalleryElement.currSlide;

            realGalleryElement.keyFunc = function(ev) {
                obj.buttonListenFunc(realGalleryElement, ev);

            }
            realGalleryElement.turnOn = function() {
                this.classList.add('active');
                window.addEventListener('resize', obj.resizeListenFunc, false);
                if (realGalleryElement.isKeys) {
                    window.addEventListener('keyup', realGalleryElement.keyFunc, false);
                }
            }
            realGalleryElement.turnOff = function() {
                this.classList.remove('active');
                this.nav.style.visibility = 'hidden';
                var thereIsActive = false;

                for (var idx = obj.realGalleryElements.length - 1; idx >= 0; idx--) {
                    currRealGallery = obj.realGalleryElements[idx];
                    thereIsActive = currRealGallery.classList.contains('active')
                    if (thereIsActive) {
                        break;
                    }
                }

                if (thereIsActive) {
                    window.addEventListener('resize', obj.resizeListenFunc, false);
                    if (realGalleryElement.isKeys) {
                        window.addEventListener('keyup', realGalleryElement.keyFunc, false);
                    }
                } else {
                    window.removeEventListener('resize', obj.resizeListenFunc, false);
                    if (realGalleryElement.isKeys) {
                        window.removeEventListener('keyup', realGalleryElement.keyFunc, false);
                    }
                }
            }

            realGalleryElement.toggle = function() {
                if (this.classList.contains('active')) {
                    this.turnOff();
                } else {
                    this.turnOn();
                }
            }
            realGalleryElement.forward = function() {
                var newSlide = this.currSlideIdx + 1;
                if (newSlide > this.maxSlide) {
                    newSlide = 0;
                }
                this.slideTo(newSlide, this.animateSpeed);
            }
            realGalleryElement.back = function() {
                var newSlide = this.currSlideIdx - 1;
                if (newSlide < 0) {
                    newSlide = this.maxSlide;
                }
                this.slideTo(newSlide, this.animateSpeed);
            }
            realGalleryElement.slideTo = function(num, animateSpeed) {
                if (this.isAnimatingNow) {
                    return;
                }
                if (typeof(num) == "undefined" ||
                    num == null) {
                    num = 0;
                }
                if (typeof(animateSpeed) == "undefined" ||
                    animateSpeed == null) {
                    animateSpeed = false;
                }

                this.currSlideIdx = num;
                if (this.currSlide) {
                    this.currSlide.classList.remove('active');
                }

                var newSlide = this.slides.getElementsByTagName('slide')[this.currSlideIdx];
                newSlide.classList.add('active');
                var nav = this.nav;

                // this.slides.style.marginLeft = (this.currSlideIdx * 100 * (-1)) + "%";
                $(this.slides).velocity({
                    marginLeft: (this.currSlideIdx * 100 * (-1)) + "%"
                }, {
                    duration: animateSpeed ? animateSpeed : 0,
                    begin: function() {
                        if (nav && animateSpeed) {
                            nav.style.visibility = 'hidden';
                        }
                        realGalleryElement.isAnimatingNow = true;
                    },
                    complete: function() {
                        var sliderImg = newSlide.getElementsByTagName('img')[0];
                        sliderImg.onResize();
                        realGalleryElement.isAnimatingNow = false;
                    }
                });
                this.turnOn();
            }
            realGalleryElement.func = {
                    turnOff: function() {
                        realGalleryElement.turnOff();
                    },
                    turnOn: function() {
                        realGalleryElement.turnOn();
                    },
                    slideTo: function(num, animateSpeed) {
                        realGalleryElement.slideTo(num, animateSpeed);
                    },
                    back: function() {
                        realGalleryElement.back();
                    },
                    forward: function() {
                        realGalleryElement.forward();
                    },
                    toggle: function() {
                        realGalleryElement.toggle();
                    }
                }
                // Get 'gallery' tag and 'slider' which are mandatory for the plug-in.
                // Add toggle function to them
            var realGalleryElementGallery = realGalleryElement.getElementsByTagName('gallery')[0];
            realGalleryElementGallery.func = realGalleryElement.func;

            var realGalleryElementSlider = realGalleryElement.getElementsByTagName('slider')[0];
            realGalleryElementSlider.func = realGalleryElement.func;

            var realGallerySlides = realGalleryElement.getElementsByTagName('slides')[0];
            realGallerySlides.func = realGalleryElement.func;

            var navControls = realGalleryElementSlider.getElementsByTagName('nav')[0];
            if (navControls) {
                navControls.func = realGalleryElement.func;
            }

            realGalleryElement.gallery = realGalleryElementGallery;
            realGalleryElement.slider = realGalleryElementSlider;
            realGalleryElement.slides = realGallerySlides;
            realGalleryElement.nav = navControls;
            realGalleryElement.isKeys = realGalleryElement.classList.contains('keys');
            realGalleryElement.animateSpeed = realGalleryElement.getAttribute('speed');


            // Get all elements with class 'gallery' in a 'real-gallery' tag.
            // Irritate through them and call 'singleRealGalleryImgInit'
            var galleryImgs = realGalleryElementGallery.getElementsByTagName('img');
            var sliderslides = realGallerySlides.getElementsByTagName('slide');

            realGalleryElement.maxSlide = sliderslides.length - 1;
            var slidesWidth = (realGalleryElement.maxSlide + 1) * 100 + '%';
            var slideWidth = (100 / sliderslides.length) + '%';
            realGallerySlides.style.width = slidesWidth;

            for (var sliderslideIndex = sliderslides.length - 1; sliderslideIndex >= 0; sliderslideIndex--) {
                var slide = sliderslides[sliderslideIndex];
                slide.style.width = slideWidth;
                if (sliderslideIndex == realGalleryElement.currSlideIdx) {
                    realGalleryElement.currSlide = slide;
                }

                var slideImgs = slide.getElementsByTagName('img');

                for (var sliderImgIndex = slideImgs.length - 1; sliderImgIndex >= 0; sliderImgIndex--) {
                    var sliderImg = slideImgs[sliderImgIndex];
                    obj.singleSliderImgInit(sliderImg, slide, navControls);
                };

            };
        }

        console.log('real-gallery initialized in ' + (new Date() - startTime) + 'MS!');
    }

    this.resizeListenFunc = function(ev) {
        for (var idx = obj.realGalleryElements.length - 1; idx >= 0; idx--) {
            currRealGallery = obj.realGalleryElements[idx];
            if (currRealGallery.classList.contains('active')) {
                var slideImgs = currRealGallery.slides.getElementsByTagName('img');
                for (var slideImgIdx = slideImgs.length - 1; slideImgIdx >= 0; slideImgIdx--) {
                    slideImgs[slideImgIdx].onResize();
                };
            }

        }
    }
    this.buttonListenFunc = function(ele, ev) {
        switch (ev.keyCode) {
            // Left
            case 37:
                ele.back();
                break;
                // Right
            case 39:
                ele.forward();
                break;
                // Esc
            case 27:
                ele.turnOff();
                break;
        }
    }

    this.singleSliderImgInit = function(sliderImg, slide, navControls) {
        var sliderImgRatio = sliderImg.naturalWidth / sliderImg.naturalHeight;
        var slideRatio = slide.offsetWidth / slide.offsetHeight;

        sliderImg.onResize = function() {
            var sliderImgRatio = sliderImg.naturalWidth / sliderImg.naturalHeight;
            var slideRatio = slide.offsetWidth / slide.offsetHeight;
            var isClassMaxH = sliderImg.classList.contains('maxH');
            var isClassMaxW = sliderImg.classList.contains('maxW');

            if ((slideRatio < sliderImgRatio && isClassMaxH) || (slideRatio >= sliderImgRatio && isClassMaxW)) {
                sliderImg.classList.toggle('maxW');
                sliderImg.classList.toggle('maxH');
            } else if (slideRatio < sliderImgRatio) {
                sliderImg.classList.add('maxW');
            } else if (slideRatio >= sliderImgRatio) {
                sliderImg.classList.add('maxH');
            }

            var isClassMaxH = sliderImg.classList.contains('maxH');
            var isClassMaxW = sliderImg.classList.contains('maxW');

            if (isClassMaxW) {
                sliderImg.style.marginTop = (-(sliderImg.height / 2)) + 'px';
                sliderImg.style.marginLeft = '0px';
                // $(sliderImg).velocity({ marginLeft: 0 }, { duration: 0 }); 
                // $(sliderImg).velocity({
                //     marginTop: (-(sliderImg.height / 2))
                // }, 1000, 'swing');
                // $(sliderImg).velocity({
                //     marginLeft: 0
                // }, 1000, 'swing');
            } else if (isClassMaxH) {
                sliderImg.style.marginTop = '0px';
                // $(sliderImg).velocity({ marginTop: 0 }, { duration: 0 }); 
                sliderImg.style.marginLeft = (-(sliderImg.width / 2)) + 'px';
                // $(sliderImg).velocity({
                //     marginTop: 0
                // }, 1000, 'swing');
                // $(sliderImg).velocity({
                //     marginLeft: (-(sliderImg.width / 2))
                // }, 1000, 'swing');
            }

            if (navControls && slide.classList.contains('active')) {
                // $(navControls).velocity({
                //     width: sliderImg.width,
                //     height: sliderImg.height,
                //     top: ((slide.offsetHeight / 2) - (sliderImg.height / 2)),
                //     left: ((slide.offsetWidth / 2) - (sliderImg.width / 2))
                // }, {
                //     duration: 1000
                // });
                navControls.style.visibility = 'visible';
                navControls.style.width = sliderImg.width + 'px';
                navControls.style.height = sliderImg.height + 'px';
                navControls.style.top = ((slide.offsetHeight / 2) - (sliderImg.height / 2)) + 'px';
                navControls.style.left = ((slide.offsetWidth / 2) - (sliderImg.width / 2)) + 'px';

            }
        }
        sliderImg.onResize();
    }
}

// Creating an Instance of RealGallery Object
var realGallery = new RealGallery();

//call real gallery initialization once page is loaded
window.addEventListener('load', realGallery.init, false);
