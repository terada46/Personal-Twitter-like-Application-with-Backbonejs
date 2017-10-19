var app = app || {};

(function() {
	var TwiRouter = Backbone.Router.extend({
		routes: {
			'like': 'setLikedList',
			'all': 'setAll',
			'': 'setAll'
		},

		setLikedList: function() {
			console.log('Like router work!');
			app.twiFilter = 'liked';
			app.tweets.trigger('filter');
		},
		setAll: function() {
			console.log('All router work!');
			app.twiFilter = 'all';
			app.tweets.trigger('filter');
		}
	});

	app.twiRouter = new TwiRouter();
	Backbone.history.start();
})();