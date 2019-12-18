define({
	"format": "expandableBanner",
	"defaultBanner": "Main_Banner",
	"defaultPanel": "expand",
	"polite": "instant",
	"banners": [
		{
			"name": "Main_Banner",
			"asset": "index.html",
			"width": "1",
			"height": "1",
			"defaultImage": "images/backup.jpg"
		}
	],
	"panels": [
		{
			"name": "expand",
			"asset": "panels/expand/index.html",
			"width": "1920",
			"height": "1080",
			"autoCollapse": "never",
			"delayedExpansion": "boolean",
			"positionType": "pageRelativePercentage",
			"x": "0",
			"y": "0"
		}
	]
});