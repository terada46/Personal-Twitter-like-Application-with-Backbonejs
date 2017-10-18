var app = app || {};

(function() {

	app.Comment = Backbone.AssociatedModel.extend({
		defaults: {
			text:'',
			commentDateText: '',
			urlRoot: '/comments'
		},

		initialize: function() {
			var commentDate = new Date();
			var minites = commentDate.getMinutes() > 9 ? commentDate.getMinutes() : '0' + commentDate.getMinutes();
			var nowDate = commentDate.getHours() + ':' + minites + ' - ' +
						commentDate.getFullYear() + '年' + (commentDate.getMonth()+1) + '月' + commentDate.getDate() + '日';
			this.save({ commentDateText: nowDate });
		}
	});
}) ();