//定义创建新评论的单独临时视图
define(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
	'use strict';

	//定义新创建一条评论的单独视图
	var newCommentView = Backbone.View.extend({

		//绑定至一个新的li标签
		tagName: 'li',

		//定义使用名为‘new-comment’的模板
		new_comment_template: _.template($('#new-comment').html()),

		//渲染新评论模型视图
		render: function() {
			this.$el.html(this.new_comment_template(this.model.toJSON()));
			return this;
		}
	});

	return newCommentView;
});