var app = app || {};

(function ($) {

	app.AppView = Backbone.View.extend({

		el: '#twiapp',

		events: {
			'click #tweet': 'post'
		},

		initialize: function() {
			this.$list = $('#tweet-list');
			this.$tweetBtn = $('#tweet');
			this.$textarea = $('textarea');

			this.listenTo(app.tweets, 'add', this.addOne);
			this.listenTo(app.tweets, 'reset', this.render);
			this.render();
		},

		render: function() {
			app.tweets.each(this.addOne, this);
			return this;
		},

		addOne: function(twi) {
			var twiView = new app.TwiView({ model:twi });
			this.$list.prepend(twiView.render().el);
		},

		post: function() {
			if ( !this.$tweetBtn.hasClass('disabled') ) {
				app.tweets.create({text: this.$textarea.val()});
				this.$textarea.val('');
				this.$tweetBtn.addClass('disabled');
				
			}
		}
	});

})(jQuery);
