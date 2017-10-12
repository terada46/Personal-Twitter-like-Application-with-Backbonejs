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
				this.commentView.remove();
				this.model.set({'isCommentsShowed': false});
			} else if (isCommentsShowed == false){			
				this.$el.append(this.commentView.render().el);
				this.comVlidation();
				this.model.set({'isCommentsShowed': true});
			}
		},

		addComment: function() {
			var newComment = new app.NewCommentView({ model:this.model });
			this.$el.find('.comment-list').prepend(newComment.render().el);
		},

		postComment: function() {
			if ( !this.$('.btn-comment').hasClass('disabled') ) {
				this.model.get('comments').add({ text: this.$('.comment-input').val()}, {at: 0} );
				this.$('.comment-input').val('');
				this.model.trigger('change:comments');
				this.$('.btn-comment').addClass('disabled');
				this.$commentInput = this.$('.comment-input');
			}
		},

		comVlidation: function() {
			$('.comment-input').keyup( function() {
		    	$('.btn-comment').toggleClass('disabled', !($('.comment-input').val()));
		    });
		},

		clear: function() {
			this.model.destroy();
		}
	});

})(jQuery);