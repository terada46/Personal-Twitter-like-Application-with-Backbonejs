var app = app || {};

(function() {
	'use strict';
	
	app.Tweet = Backbone.AssociatedModel.extend({
			relations: [{
				type: Backbone.Many,
				key: 'comments',
				collectionType: 'app.Comments',
				relatedModel: 'app.Comment'
			}],

			defaults: {
				text: '',
				twiDateText: '',
				comments: [],
				liked: false,
				isCommentsShowed: false
			},

			urlRoot: '/tweet',

			initialize: function() {
				var com = this;
				this.get('comments').url = function() {
					return '/tweet/' + com.id + '/comments';
				}
				this.save({ isCommentsShowed: false});
			},

			toggleLiked: function() {
				this.save({
					liked : !this.get('liked')
				});
			}
	});


})();