//全局Backbone应用主体变量
var app = app || {};

(function() {

	//定义评论model，包括文本字符串、时间字符串、url属性
	app.Comment = Backbone.AssociatedModel.extend({
		defaults: {
			text:'',
			commentDateText: '',
			urlRoot: '/comments'
		}
	});
}) ();