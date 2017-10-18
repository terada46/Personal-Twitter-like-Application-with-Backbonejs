var app = app || {};

(function() {
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
				var myDate = new Date();
				var nowDate = myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate() + '日';
				this.save({ twiDateText: nowDate });
			},

			toggleLiked: function() {
				this.save({
					liked : !this.get('liked')
				});
			}
	});


})();