
var adId, rnd, uid;
var bannerDiv;
var expandButton;

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

	bannerDiv = document.getElementById("banner");
	expandButton = document.getElementById("expandBtn");
	expandButton.addEventListener("click", handleExpandButtonClick);
}

function handleExpandButtonClick() {
	adkit.expand({
		panelName: "expand",
		actionType: adkit.ActionType.USER,
		expandToMax: !0,
		useCustomClose: true
	});
}

window.addEventListener("load", checkIfAdKitReady);