var app = app || {};

(function () {
	var Tweets = Backbone.Collection.extend({
		model: app.Tweet,
		url: '/tweets',

		localStorage: new Backbone.LocalStorage('tweet-backbone')
	});

	app.tweets = new Tweets();
})();