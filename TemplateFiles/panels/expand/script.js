/*******************
VARIABLES
*******************/
var lastModified = "2017-08-02";
var lastUploaded = "2017-08-02";
var templateVersion = "2.0.24";

var expansionDiv;
var closeButton;
var userActionButton;
var clickthroughButton;
var video;
var videoTrackingModule;
var sdkData;
var adId, rnd, uid;
var isMRAID;
var useCustomClose;

/*******************
INITIALIZATION
*******************/
function checkIfAdKitReady(event) {
	adkit.onReady(initializeCreative);
}

function initializeCreative(event) {
	try { //try/catch just in case localPreview.js is not included
		if (window.localPreview) {
			window.initializeLocalPreview(); //in localPreview.js
		}
	}
	catch (e) {}

	//Workaround (from QB6573) for Async EB Load where Modernizr isn't properly initialized
	typeof Modernizr === "object" && (Modernizr.touch = Modernizr.touch || "ontouchstart" in window);

	window.registerInteraction = function() {}; //overwrite rI function because it will never actually be called
	initializeGlobalVariables();
	initializeCloseButton();
	initializeVideoTracking();
	addEventListeners();
}

function initializeGlobalVariables() {
	adId = EB._adConfig.adId;
	rnd = EB._adConfig.rnd;
	uid = EB._adConfig.uid;
	
	expansionDiv = document.getElementById("expansion");
	closeButton = document.getElementById("closeButton");
	userActionButton = document.getElementById("userActionButton");
	clickthroughButton = document.getElementById("clickthroughButton");
	video = document.getElementById("video");

	if (!isMRAID) {
		sdkData = EB.getSDKData();
		isMRAID = sdkData !== null && sdkData.SDKType === "MRAID";
	}
}

function initializeCloseButton() {
	useCustomClose = !isMRAID || (isMRAID && !useDefaultCloseButtonInMRAID);
	if (useCustomClose) {
		EB.API.setStyle(closeButton, {
			display: "block"
		});
	}
}

function initializeVideoTracking() {
	videoTrackingModule = new EBG.VideoModule(video);
	if (autoPlayVideo && !EB.API.os.ios) {
		video.muted = true;
		videoTrackingModule.playVideo(false);
	}
}

function addEventListeners() {
	closeButton.addEventListener("click", handleCloseButtonClick);
	userActionButton.addEventListener("click", handleUserActionButtonClick);
	clickthroughButton.addEventListener("click", handleClickthroughButtonClick);
}

/*******************
EVENT HANDLERS
*******************/
function handleCloseButtonClick() {
	pauseVideo();
	setTimeout(function() {
		EB.collapse();
	}, 200);
}

function handleUserActionButtonClick() {
	EB.userActionCounter("CustomInteraction");
}

function handleClickthroughButtonClick() {
	pauseVideo();
	EB.clickthrough();
}

/*******************
UTILITIES
*******************/
function collapse() {
	handleCloseButtonClick();
}

function pauseVideo() {
	if (video) {
		video.pause();
	}
}

window.addEventListener("load", checkIfAdKitReady);