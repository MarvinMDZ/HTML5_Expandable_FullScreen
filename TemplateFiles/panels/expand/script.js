
var expansionDiv, closeButton, clickthroughButton, video, videoTrackingModule;
var adId, rnd, uid;

function checkIfAdKitReady(event) {
	adkit.onReady(initializeCreative);
}

function initializeCreative(event) {
	try { //try/catch just in case localPreview.js is not included
		if (window.localPreview) {
			window.initializeLocalPreview(); //in localPreview.js
		}
	}
	catch (e) { }

	//Workaround (from QB6573) for Async EB Load where Modernizr isn't properly initialized
	typeof Modernizr === "object" && (Modernizr.touch = Modernizr.touch || "ontouchstart" in window);

	window.registerInteraction = function () { }; //overwrite rI function because it will never actually be called
	initializeGlobalVariables();
}

function initializeGlobalVariables() {
	adId = EB._adConfig.adId;
	rnd = EB._adConfig.rnd;
	uid = EB._adConfig.uid;

	expansionDiv = document.getElementById("expansion");
	closeButton = document.getElementById("closeBtn");
	clickthroughButton = document.getElementById("clickBtn");
	video = document.getElementById("video");

	videoTrackingModule = new EBG.VideoModule(video);

	closeButton.addEventListener("click", handleCloseButtonClick);
	clickthroughButton.addEventListener("click", handleClickthroughButtonClick);
}

function handleCloseButtonClick() {
	pauseVideo();
	setTimeout(function () {
		EB.collapse();
	}, 200);
}


function handleClickthroughButtonClick() {
	pauseVideo();
	EB.clickthrough();
}

function pauseVideo() {
	if (video) {
		video.pause();
	}
}

window.addEventListener("load", checkIfAdKitReady);