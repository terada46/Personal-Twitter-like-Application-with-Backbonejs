//全局Backbone应用主体变量
var app = app || {};

(function ($) {

	//定义评论列表（评论数组）的整体视图
	app.CommentView = Backbone.View.extend({

		//绑定至一个新的div标签
		tagName: 'div',

		//初始化class样式
		className: 'comment-container',

		//定义使用名为‘comment-template’的模板
		comment_template: template('comment-template'),

		//渲染评论列表视图
		render: function() {
			this.$el.html(this.comment_template(this.model.toJSON()));
			return this;
		}

	});

	//定义新创建一条评论的单独视图
	app.NewCommentView = Backbone.View.extend({

		//绑定至一个新的li标签
		tagName: 'li',

		//定义使用名为‘new-comment’的模板
		new_comment_template: template('new-comment'),

		//渲染新评论模型视图
		render: function() {
			this.$el.html(this.new_comment_template(this.model.toJSON()));
			return this;
		}

	})
})(jQuery);