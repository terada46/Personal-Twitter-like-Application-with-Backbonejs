var app = app || {};

(function ($) {
	'use strict';

	app.TwiView = Backbone.View.extend({

		tagName: 'li',

		twi_template: template('li-template'),

		events: {
			'click .destroy': 'clear',
			'click .icon-comment': 'showComment',
			'click .comment-btn': 'postComment',
			'click .icon-heart': 'toggleLiked',
			'click .dropdown-btn': 'toggleDropdownBtn'
		},

		initialize: function() {
			this.commentView = new app.CommentView({ model:this.model });
			this.$commentList = this.$('.comment-list');
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'change:comments', this.addComment);
			this.listenTo(this.model, 'visible change', this.isVisible);
			this.isVisible();
		},
		
		render: function() {
			this.$el.html(this.twi_template(this.model.toJSON()));
			return this;
		},

		isVisible: function() {
			if (app.twiFilter === 'liked' && !this.model.get('liked')) {
				this.$el.hide();
				this.toggleTabClass();
			} else if (app.twiFilter === 'all') {
				this.$el.show();
				this.toggleTabClass();
			}
		},

		toggleTabClass: function() {
			var ifLiked = function(){return app.twiFilter === 'liked'};
			$('#like-tab').toggleClass('tab-clicked', ifLiked());
			$('#all-tab').toggleClass('tab-clicked', !ifLiked());
		},

		toggleDropdownBtn: function() {
			this.$destroy = this.$('.destroy');
			if (this.$destroy.hasClass('show') || this.$destroy.hasClass('fadeOutDown')) {
				this.$destroy.toggleClass('show');
				this.$destroy.toggleClass('fadeOutDown');
			}
			if (this.$destroy.hasClass('show')) {
				$('.destroy').not(this.$destroy).removeClass('show').addClass('fadeOutDown');
			}
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
			if ( !this.$('.comment-btn').hasClass('disabled') ) {
				var nowDate = this.commentDate();
				this.model.get('comments').add( { text: this.$('.comment-input').val(), commentDateText: nowDate }, {at: 0} );
				this.model.save();
				this.$('.comment-input').val('');
				this.model.trigger('change:comments');
				this.$('.comment-btn').addClass('disabled');
			}
		},

		commentDate: function() {
			var commentDate = new Date();
			var minites = commentDate.getMinutes() > 9 ? commentDate.getMinutes() : '0' + commentDate.getMinutes();
			return commentDate.getHours() + ':' + minites + ' - ' +
						commentDate.getFullYear() + '年' + (commentDate.getMonth()+1) + '月' + commentDate.getDate() + '日';
		},

		toggleLiked: function() {
			this.model.toggleLiked();
			this.$('.icon-heart > .fa').toggleClass('fa-heart', this.model.get('liked'))
								 .toggleClass('fa-heart-o', !(this.model.get('liked')))
		},

		commentVlidation: function() {
			$('.comment-input').bind('input propertychange', function(e) {
		    	$(this).parent().find('button').toggleClass('disabled', !( $(this).val() ));
		    });
		},

		clear: function() {
			this.model.destroy();
		}
	});

})(jQuery);