var app = app || {};

window.template = function(id) {
		return _.template( $('#' + id).html() );
};

(function ($) {
	app.TwiView = Backbone.View.extend({

		tagName: 'li',

		twi_template: template('li-template'),

		events: {
			'click .destroy': 'clear'
		},
		
		render: function() {
			this.listenTo(this.model, 'destroy', this.remove);
			this.$el.html(this.twi_template(this.model.toJSON()));
			return this;
		},

		clear: function() {
			this.model.destroy();
		}
	});

})(jQuery);