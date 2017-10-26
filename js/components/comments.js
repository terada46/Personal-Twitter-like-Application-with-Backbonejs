//全局Backbone应用主体变量
var app = app || {};

(function() {

	//定义评论数组的collection
	app.Comments = Backbone.Collection.extend({
		model: app.Comment,
		url: function() {
			return '/comments';
		}
	});
})();