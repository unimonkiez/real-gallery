console.log('initializing real-gallery..');
var startTime = new Date();

var RealGalleryController = function() {
	this.init = function(){
		console.log('finished initializing real-gallery in ' + (new Date() - startTime) + 'ms!');
	}
}

realGalleryController = new RealGalleryController();

//call real gallery initialization once page is loaded
window.addEventListener('load', function() {
    realGalleryController.init();
}, false);
