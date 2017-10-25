var app = app || {};

(function ($) {
	'use strict';

	app.AppView = Backbone.View.extend({

		el: '#twiapp',

		events: {
			'click #tweet': 'post'
		},

		initialize: function() {
			this.$list = $('#tweet-list');
			this.$tweetBtn = $('#tweet');
			this.$textarea = $('textarea');
			this.$tabBox = $('#tab_box');

			this.listenTo(app.tweets, 'add', this.addOne);
			this.listenTo(app.tweets, 'change add remove reset', this.toggleHidden);
			this.listenTo(app.tweets, 'filter', this.filterAll);
			this.render();
		},

		render: function() {
			app.tweets.trigger('change');
			app.tweets.fetch();
		},

		toggleHidden: function() {
			var hastwi = app.tweets.length ? true : false;
			this.$tabBox.toggleClass('hidden', !hastwi);
			this.$tabBox.attr('aria-hidden', ( hastwi ? false : true));
			this.$list.attr('aria-hidden', ( hastwi ? false : true));
		},

		filterOne: function(twi) {
			twi.trigger('visible');
		},

		filterAll: function(event) {
			app.tweets.each(this.filterOne, this);
		},

		addOne: function(twi) {
			var twiView = new app.TwiView({ model:twi });
			this.$list.prepend(twiView.render().el);
		},

		post: function() {
			if ( !this.$tweetBtn.hasClass('disabled') ) {
				var nowDate = this.postDate();
				app.tweets.create({text: this.$textarea.val(), twiDateText: nowDate });
				this.$textarea.val('');
				this.$tweetBtn.addClass('disabled');
			}
		},

		postDate: function() {
			var myDate = new Date();
			return myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate() + '日';
		}
	});

})(jQuery);
