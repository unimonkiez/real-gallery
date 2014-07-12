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
            realGalleryElement.toggle = function() {
                this.classList.toggle('active');
                var thereIsActive = false;

                thereIsActive = this.classList.contains('active');
                if (!thereIsActive) {
                    for (var idx = obj.realGalleryElements.length - 1; idx >= 0; idx--) {
                        currRealGallery = obj.realGalleryElements[idx];
                        thereIsActive = currRealGallery.classList.contains('active')
                        if (thereIsActive) {
                            break;
                        }
                    }
                };

                if (thereIsActive) {
                    window.addEventListener('resize', obj.resizeListenFunc, false);
                } else {
                    window.removeEventListener('resize', obj.resizeListenFunc, false);
                }
            }
            realGalleryElement.forward = function() {
                var newSlide = this.currSlideIdx + 1;
                if (newSlide > this.maxSlide) {
                    newSlide = 0;
                }
                this.toSlide(newSlide);
            }
            realGalleryElement.back = function() {
                var newSlide = this.currSlideIdx - 1;
                if (newSlide < 0) {
                    newSlide = this.maxSlide;
                }
                this.toSlide(newSlide);
            }
            realGalleryElement.toSlide = function(num) {
                if (typeof(num) == "undefined" ||
                    num == null) {
                    num = 0;
                }
                this.currSlideIdx = num;
                if (this.currSlide) {
                    this.currSlide.classList.remove('active');
                }

                var newSlide = this.slides.getElementsByTagName('slide')[this.currSlideIdx];
                newSlide.classList.add('active');

                this.slides.style.marginLeft = (this.currSlideIdx * 100 * (-1)) + "%";

                var sliderImg = newSlide.getElementsByTagName('img')[0];
                sliderImg.onResize();

                if (!this.classList.contains('active')) {
                    this.classList.add('active');
                    window.addEventListener('resize', obj.resizeListenFunc, false);
                }
            }
        }

        obj.singleGalleryInit(realGalleryElement);
        console.log('real-gallery initialized in ' + (new Date() - startTime) + 'MS!');
    }

    this.resizeListenFunc = function(ev) {
        for (var idx = obj.realGalleryElements.length - 1; idx >= 0; idx--) {
            currRealGallery = obj.realGalleryElements[idx];
            if (currRealGallery.classList.contains('active')) {
                var slideImgs = currRealGallery.getElementsByTagName('slides')[0].getElementsByTagName('img');
                for (var slideImgIdx = slideImgs.length - 1; slideImgIdx >= 0; slideImgIdx--) {
                    slideImgs[slideImgIdx].onResize();
                };
            }

        }
    }

    /** This function will initialize the function being made for each real-gallery element     
     */
    this.singleGalleryInit = function(realGalleryElement) {

        // Get 'gallery' tag and 'slider' which are mandatory for the plug-in.
        // Add toggle function to them
        var realGalleryElementGallery = realGalleryElement.getElementsByTagName('gallery')[0];
        realGalleryElementGallery.toggle = function() {
            realGalleryElement.toggle();
        }
        realGalleryElementGallery.toSlide = function(num) {
            realGalleryElement.toSlide(num);
        }
        var realGalleryElementSlider = realGalleryElement.getElementsByTagName('slider')[0];
        realGalleryElementSlider.toggle = function() {
            realGalleryElement.toggle();
        }
        var realGallerySlides = realGalleryElement.getElementsByTagName('slides')[0];
        realGalleryElementSlider.toggle = function() {
            realGalleryElement.toggle();
        }
        var navControls = realGalleryElementSlider.getElementsByTagName('nav')[0];
        if (navControls) {
            navControls.toggle = function() {
                realGalleryElement.toggle();
            }
            navControls.back = function() {
                realGalleryElement.back();
            }
            navControls.forward = function() {
                realGalleryElement.forward();
            }
        }

        realGalleryElement.gallery = realGalleryElementGallery;
        realGalleryElement.slider = realGalleryElementSlider;
        realGalleryElement.slides = realGallerySlides;
        realGalleryElement.nav = navControls;


        // Get all elements with class 'gallery' in a 'real-gallery' tag.
        // Irritate through them and call 'singleRealGalleryImgInit'
        var galleryImgs = realGalleryElementGallery.getElementsByTagName('img');
        var sliderslides = realGallerySlides.getElementsByTagName('slide');

        realGalleryElement.maxSlide = sliderslides.length - 1;
        var slidesWidth = (realGalleryElement.maxSlide + 1) * 100 + '%';
        var slideWidth = (100 / sliderslides.length) + '%';
        realGallerySlides.style.width = slidesWidth;

        for (var galleryImgIndex = galleryImgs.length - 1; galleryImgIndex >= 0; galleryImgIndex--) {
            var galleryImg = galleryImgs[galleryImgIndex];
            obj.singleGalleryImgInit(realGalleryElement, realGalleryElementSlider, galleryImg);
        };

        for (var sliderslideIndex = sliderslides.length - 1; sliderslideIndex >= 0; sliderslideIndex--) {
            var slide = sliderslides[sliderslideIndex];
            slide.style.width = slideWidth;
            if (sliderslideIndex == realGalleryElement.currSlideIdx) {
                slide.classList.add('active');
                realGalleryElement.currSlide = slide;
            }

            var slideImgs = slide.getElementsByTagName('img');

            for (var sliderImgIndex = slideImgs.length - 1; sliderImgIndex >= 0; sliderImgIndex--) {
                var sliderImg = slideImgs[sliderImgIndex];
                obj.singleSliderImgInit(sliderImg, slide, navControls);
            };

        };


    }

    this.singleGalleryImgInit = function(realGalleryElement, realGalleryElementSlider, galleryImg) {
        // galleryImg.onclick = function() {
        //     realGalleryElement.toggle();
        // }
    }

    this.singleSliderImgInit = function(sliderImg, slide, navControls) {
        var sliderImgRatio = sliderImg.naturalWidth / sliderImg.naturalHeight;
        var slideRatio = slide.offsetWidth / slide.offsetHeight;
        if (slideRatio < sliderImgRatio) {
            sliderImg.classList.toggle('maxW');
            sliderImg.style.marginTop = (-(sliderImg.height / 2)) + 'px';
            sliderImg.style.marginLeft = '0px';
        } else {
            sliderImg.classList.toggle('maxH');
            sliderImg.style.marginTop = '0px';
            sliderImg.style.marginLeft = (-(sliderImg.width / 2)) + 'px';
        }
        if (navControls && slide.classList.contains('active')) {
            navControls.style.width = sliderImg.width + 'px';
            navControls.style.height = sliderImg.height + 'px';
            navControls.style.top = sliderImg.offsetTop + 'px';
            navControls.style.left = sliderImg.offsetLeft + 'px';
        }

        sliderImg.onResize = function() {
            var sliderImgRatio = sliderImg.naturalWidth / sliderImg.naturalHeight;
            var slideRatio = slide.offsetWidth / slide.offsetHeight;
            var isClassMaxH = sliderImg.classList.contains('maxH');
            var isClassMaxW = !isClassMaxH;

            if (slideRatio < sliderImgRatio && isClassMaxH) {
                sliderImg.classList.toggle('maxW');
                sliderImg.classList.toggle('maxH');
            } else if (slideRatio >= sliderImgRatio && isClassMaxW) {
                sliderImg.classList.toggle('maxW');
                sliderImg.classList.toggle('maxH');
            }
            if (sliderImg.classList.contains('maxW')) {
                sliderImg.style.marginTop = (-(sliderImg.height / 2)) + 'px';
                sliderImg.style.marginLeft = '0px';
            } else {
                sliderImg.style.marginTop = '0px';
                sliderImg.style.marginLeft = (-(sliderImg.width / 2)) + 'px';
            }

            if (navControls && slide.classList.contains('active')) {

                navControls.style.width = sliderImg.width + 'px';
                navControls.style.height = sliderImg.height + 'px';
                navControls.style.top = sliderImg.offsetTop + 'px';
                navControls.style.left = sliderImg.offsetLeft + 'px';
            }
        }
    }
}

// Creating an Instance of RealGallery Object
var realGallery = new RealGallery();

//call real gallery initialization once page is loaded
window.addEventListener('load', realGallery.init, false);
