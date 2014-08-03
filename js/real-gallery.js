console.log('initializing real-gallery..');
var startTime = new Date();

var RealGalleryController = function() {
    this.realGalleries;

    this.init = function() {
        console.log('finished initializing real-gallery in ' + (new Date() - startTime) + 'ms!');
        return this;
    }

    return this.init();
}

var RealGallery = function(id) {
    this.id = id;
    this.element;
    this.gallery;
    this.slider;

    this.init = function() {
        this.element = this.getElement(this.id);
        this.gallery = this.getGallery(this.element);
        this.slider = this.getSlider(this.element);
        return this;
    }

    this.getElement = function(id) {
        if (!id || id == undefined) {
            throw new Error('Id was not given.');
        }
        var element = document.getElementById(id);

        if (!element || element == undefined || element.tagName !== 'REAL-GALLERY') {
            throw new Error('RealGallery element was not found.');
        }
        return element;
    }

    this.getGallery = function(element) {
        var gallery = element.getElementsByTagName('gallery')[0];
        return gallery;
    }

    this.getSlider = function(element) {
        var slider = element.getElementsByTagName('slider')[0];
        slider.nav = getNav(slider);
        slider.slides = getSlides(slider);
        return slider;
    }

    this.getNav = function(slider) {
        var nav = slider.getElementsByTagName('nav')[0];
        return nav;
    }

    this.getSlides = function(slider) {
        var slides = slider.getElementsByTagName('slides')[0];
        slides.slidesInSlider = getSlidesInSlider(slides);
        return slides;
    }

    this.getSlidesInSlider = function(slides) {
        var slidesInSlider = slides.getElementsByTagName('slide');
        slidesInSlider.init = function() {
            for (var i = slidesInSlider.length - 1; i >= 0; i--) {
                var slide = slidesInSlider[i];
            };
        }
        slidesInSlider.init();
        return slidesInSlider;
    }

    // Initialize the object
    return this.init();
}

var realGalleryController = new RealGalleryController();

//call real gallery initialization once page is loaded
// window.addEventListener('load', function() {
//     realGalleryController.init();
// }, false);
