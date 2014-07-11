console.log('initializing real-gallery..');
var startTime = new Date();

RealGallery = function() {
    // Pointer to the object itself
    var obj = this;

    /** Declaration for the real gallery plug-in initialization function
     */
    this.init = function() {
        // Irritate through all the realGalleryElements and call 'singleRealGalleryInit' for each 'real-gallery' element found
        obj.realGalleryElements = document.getElementsByTagName('real-gallery');
        for (var realGalleryElementIndex = obj.realGalleryElements.length - 1; realGalleryElementIndex >= 0; realGalleryElementIndex--) {
            var realGalleryElement = obj.realGalleryElements[realGalleryElementIndex];

            realGalleryElement.toggle = function() {
                this.classList.toggle('active');
            }

            obj.singleGalleryInit(realGalleryElement);
        };
        console.log('real-gallery initialized in ' + (new Date() - startTime) + 'MS!');
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
        var realGalleryElementSlider = realGalleryElement.getElementsByTagName('slider')[0];
        realGalleryElementSlider.toggle = function() {
            realGalleryElement.toggle();
        }
        var realGalleryElementImages = realGalleryElement.getElementsByTagName('images')[0];
        realGalleryElementSlider.toggle = function() {
            realGalleryElement.toggle();
        }

        // Get all elements with class 'gallery' in a 'real-gallery' tag.
        // Irritate through them and call 'singleRealGalleryImgInit'
        var galleryImgs = realGalleryElementGallery.getElementsByTagName('img');
        var sliderImgs = realGalleryElementImages.getElementsByTagName('img');

        var imagesWidth = sliderImgs.length * 100 + '%';
        realGalleryElementImages.style.width = imagesWidth;

        for (var realGalleryElementImgIndex = galleryImgs.length - 1; realGalleryElementImgIndex >= 0; realGalleryElementImgIndex--) {
            var realGalleryElementImg = galleryImgs[realGalleryElementImgIndex];
            obj.singleImgInit(realGalleryElement, realGalleryElementSlider, realGalleryElementImg);
        };
    }

    this.singleImgInit = function(realGalleryElement, realGalleryElementSlider, realGalleryElementImg) {
        // Get 
        var bigAttr = realGalleryElementImg.getAttribute('big');

        realGalleryElementImg.onclick = function() {
            realGalleryElement.toggle();
        }
        console.log(realGalleryElementImg.getAttribute('big'));
    }
}

// Creating an Instance of RealGallery Object
var realGallery = new RealGallery();

//call real gallery initialization once page is loaded
window.addEventListener('load', realGallery.init, false);
