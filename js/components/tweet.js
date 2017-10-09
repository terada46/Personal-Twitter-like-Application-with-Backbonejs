var app = app || {};

(function() {
	app.Tweet = Backbone.Model.extend({
			defaults: {
				text: ''
			},

			initialize: function() {
				var myDate = new Date();
				this.twidate = displayDate = myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate();
				return this.twidate;
			}
	});
})();