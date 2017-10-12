var app = app || {};

(function ($) {

	app.CommentView = Backbone.View.extend({

		tagName: 'div',

		className: 'comment-container',

		comment_template: template('comment-template'),

		render: function() {
			this.$el.html(this.comment_template(this.model.toJSON()));
			return this;
		}

	});

	app.NewCommentView = Backbone.View.extend({
		tagName: 'li',

		new_comment_template: template('new-comment'),

		render: function() {
			this.$el.html(this.new_comment_template(this.model.toJSON()));
			return this;
		}

	})
})(jQuery);