var app = app || {};

(function() {
	app.Tweet = Backbone.AssociatedModel.extend({
			relations: [{
				type: Backbone.Many,
				key: 'comments',
				relatedModel: 'app.Comment'
			}],


			defaults: {
				text: '',
				twidate: '',
				comments: [],
				isCommentsShowed: false
			},

			initialize: function() {
				var myDate = new Date();
				var nowDate = myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate() + '日';
				this.save({ twidate: nowDate});
			}
	});
})();