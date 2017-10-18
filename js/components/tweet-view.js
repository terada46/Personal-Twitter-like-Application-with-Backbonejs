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
			'click .btn-comment': 'postComment',
			'click .icon-heart': 'toggleLiked'
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
				this.commentVlidation();
				this.model.set({'isCommentsShowed': true});
			}
		},

		addComment: function() {
			var newComment = new app.NewCommentView({ model:this.model });
			this.$el.find('.comment-list').prepend(newComment.render().el);
		},

		postComment: function() {
			if ( !this.$('.btn-comment').hasClass('disabled') ) {
				this.model.get('comments').add( { text: this.$('.comment-input').val()}, {at: 0} );
				console.log(this.model.get('comments'));
				this.$('.comment-input').val('');
				this.model.trigger('change:comments');
				this.$('.btn-comment').addClass('disabled');
			}
		},

		toggleLiked: function() {
			this.model.toggleLiked();
			this.$('.icon-heart > .fa').toggleClass('fa-heart', this.model.get('liked'))
								 .toggleClass('fa-heart-o', !(this.model.get('liked')))
		},

		commentVlidation: function() {
			$('.comment-input').keyup( function(e) {
		    	$(this).parent().find('button').toggleClass('disabled', !( $(this).val() ));
		    });
		},

		clear: function() {
			this.model.destroy();
		}
	});

})(jQuery);