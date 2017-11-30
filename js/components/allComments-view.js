//定义推文下所有评论列表视图的模块
define(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
	'use strict';

	//定义单条推文评论列表（评论数组）的整体视图
	var allCommentView = Backbone.View.extend({

		//绑定至一个新的div标签
		tagName: 'div',

		//初始化class样式
		className: 'comment-container',

		//定义使用名为‘comment-template’的模板
		comment_template: _.template($('#comment-template').html()),

		//渲染评论列表视图
		render: function() {
			this.$el.html(this.comment_template(this.model.toJSON()));
			return this;
		}

	});

	return allCommentView;
});