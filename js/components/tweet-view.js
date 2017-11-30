//定义单条推文视图
define([
	'backbone', 
	'jquery', 
	'underscore',
	'./allComments-view',
	'./newComment-view',
	'../common'
], function(Backbone, $, _, commentsView, newCommentView, Common) {
	'use strict';

	//推文视图
	var twiView = Backbone.View.extend({

		//绑定至一个新的li标签
		tagName: 'li',

		//定义使用名为‘li-template’的模板
		twi_template: _.template($('#li-template').html()),

		//定义删除视图、展开评论、提交评论、切换like状态、切换下拉按钮的点击事件
		events: {
			'click .destroy': 'clear',
			'click .icon-comment': 'showComment',
			'click .comment-btn': 'postComment',
			'click .icon-heart': 'toggleLiked',
			'click .dropdown-btn': 'toggleDropdownBtn'
		},

		//初始化一个评论区视图，并绑定删除、新增评论、切换可见状态事件到当前模型
		initialize: function() {
			this.commentView = new commentsView({ model:this.model });
			this.$commentList = this.$('.comment-list');
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'change:comments', this.addComment);
			this.listenTo(this.model, 'visible change', this.isVisible);
			this.isVisible();
		},
		
		//渲染当前模型视图
		render: function() {
			this.$el.html(this.twi_template(this.model.toJSON()));
			return this;
		},

		//根据路由定义的全局变量app.twiFilter切换当前视图是否显示
		//同时执行切换标签栏样式方法
		isVisible: function() {
			if (Common.twiFilter === 'liked' && !this.model.get('liked')) {
				this.$el.hide();
				this.toggleTabClass();
			} else if (Common.twiFilter === 'all') {
				this.$el.show();
				this.toggleTabClass();
			}
		},

		//根据全局变量app.twiFilter切换标签栏样式
		toggleTabClass: function() {
			var ifLiked = function(){return Common.twiFilter === 'liked'};
			$('#like-tab').toggleClass('tab-clicked', ifLiked());
			$('#all-tab').toggleClass('tab-clicked', !ifLiked());
		},

		//切换删除按键的显示/隐藏状态，并相应切换动画效果
		toggleDropdownBtn: function() {
			this.$destroy = this.$('.destroy');
			if (this.$destroy.hasClass('show') || this.$destroy.hasClass('fadeOutDown')) {
				this.$destroy.toggleClass('show');
				this.$destroy.toggleClass('fadeOutDown');
			}
			if (this.$destroy.hasClass('show')) {
				$('.destroy').not(this.$destroy).removeClass('show').addClass('fadeOutDown');
			}
		},

		//切换评论视图的显示/隐藏
		showComment: function() {
			var isCommentsShowed = this.model.get('isCommentsShowed');
	
			if (isCommentsShowed == true) {
				this.commentView.remove();
				this.model.set({'isCommentsShowed': false});
			} else if (isCommentsShowed == false){			
				this.$el.append(this.commentView.render().el);		
				this.commentVlidation();
				this.model.set({'isCommentsShowed': true});
			}
		},

		//创建新评论视图、并立即渲染至评论列表视图的首行
		addComment: function() {
			var newComment = new newCommentView({ model:this.model });
			this.$el.find('.comment-list').prepend(newComment.render().el);
		},

		//添加新评论
		//创建新评论模型，添加至当前推文model已关联的评论数组内，保存至本地存储
		postComment: function() {
			if ( !this.$('.comment-btn').hasClass('disabled') ) {
				var nowDate = this.commentDate();
				this.model.get('comments').add( { text: this.$('.comment-input').val(), commentDateText: nowDate }, {at: 0} );
				this.model.save();
				this.$('.comment-input').val('');
				this.model.trigger('change:comments');
				this.$('.comment-btn').addClass('disabled');
			}
		},

		//获取当前时间文本，将储存至新评论model的属性里
		commentDate: function() {
			var commentDate = new Date();
			var minites = commentDate.getMinutes() > 9 ? commentDate.getMinutes() : '0' + commentDate.getMinutes();
			return commentDate.getHours() + ':' + minites + ' - ' +
						commentDate.getFullYear() + '年' + (commentDate.getMonth()+1) + '月' + commentDate.getDate() + '日';
		},

		//切换当前model的like布尔值，同时根据布尔值切换like按键（heart）的样式
		toggleLiked: function() {
			this.model.toggleLiked();
			this.$('.icon-heart > .fa').toggleClass('fa-heart', this.model.get('liked'))
								 .toggleClass('fa-heart-o', !(this.model.get('liked')))
		},

		//检测评论输入文本框的值的变化(是否空白)，以控制按键是否可用
		commentVlidation: function() {
			$('.comment-input').bind('input propertychange', function(e) {
		    	$(this).parent().find('button').toggleClass('disabled', !( $(this).val() ));
		    });
		},

		//清除当前model
		clear: function() {
			this.model.destroy();
		}
	});
	
	return twiView;
});