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
				// if ( this.twiDateText === '') {
				// 	var myDate = new Date();
				// 	var minites = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes();
				// 	var nowDate = myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate() + '日' + minites;
				// 	return Backbone.Model.prototype.save.call(this, { isCommentsShowed: false, twiDateText: nowDate });
				// } else {
				// 	return Backbone.Model.prototype.save.call(this, { isCommentsShowed: false });
				// }
			},

			toggleLiked: function() {
				this.save({
					liked : !this.get('liked')
				});
			}
	});


})();