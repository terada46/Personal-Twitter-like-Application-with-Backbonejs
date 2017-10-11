var app = app || {};

window.template = function(id) {
		return _.template( $('#' + id).html() );
};

(function ($) {
	app.TwiView = Backbone.View.extend({

		tagName: 'li',

		twi_template: template('li-template'),

		events: {
			'click .destroy': 'clear',
			'click .icon-comment': 'showComment',
			'click .btn-comment': 'postComment'
		},

		initialize: function() {
			this.commentView = new app.CommentView({ model:this.model });
			this.$commentList = this.$('.comment-list');
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'change:comments', this.addComment);
		},
		
		render: function() {
			this.$el.html(this.twi_template(this.model.toJSON()));
			return this;
		},

		showComment: function() {
			var isCommentsShowed = this.model.get('isCommentsShowed');
	
			if (isCommentsShowed == true) {
				console.log('12');
				this.commentView.remove();
				this.model.set({'isCommentsShowed': false});
			} else if (isCommentsShowed == false){
				console.log(this.commentView);
				console.log(this.model.get('comments'));
				
				this.$el.append(this.commentView.render().el);
				this.model.set({'isCommentsShowed': true});
			}
		},

		addComment: function() {
			var newComment = new app.NewCommentView({ model:this.model });
			this.$el.find('.comment-list').prepend(newComment.render().el);
		},

		postComment: function() {
			console.log(this.$('.comment-input').val());
			this.model.get('comments').add({ text: this.$('.comment-input').val()}, {at: 0} );
			this.$('.comment-input').val('');
			this.model.trigger('change:comments');
			this.$commentInput = this.$('.comment-input');
			return this;
		},

		clear: function() {
			this.model.destroy();
		}
	});

})(jQuery);