var app = app || {};

(function() {

	app.Comment = Backbone.AssociatedModel.extend({
		defaults: {
			text:'',
			commentDateText: '',
			urlRoot: '/comments'
		}
	});
}) ();