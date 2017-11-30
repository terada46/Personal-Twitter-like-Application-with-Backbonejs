//定义APP主视图的模块
define([
	'jquery',
	'underscore',
	'backbone',
	'./tweets',
	'./tweet-view'
], function($, _, Backbone, tweets, TwiView) {
	'use strict';

	//定义app主体视图
	var AppView = Backbone.View.extend({

		//将app主体绑定到HTML上的元素
		el: '#twiapp',

		//定义创建推文的点击事件
		events: {
			'click #tweet': 'post'
		},

		//初始化一系列相关事件到app主体collection，包括创建推文、监控collection数组变化
		initialize: function() {
			this.$list = $('#tweet-list');
			this.$tweetBtn = $('#tweet');
			this.$textarea = $('textarea');
			this.$tabBox = $('#tab_box');

			this.listenTo(tweets, 'add', this.addOne);
			this.listenTo(tweets, 'change add remove reset', this.toggleHidden);
			this.listenTo(tweets, 'filter', this.filterAll);
			this.render();
		},

		//主动触发改变事件，并渲染app视图
		render: function() {
			tweets.trigger('change');
			tweets.fetch();
		},

		//监控collection数量变化，以标签栏样式（是否显示）
		toggleHidden: function() {
			var hastwi = tweets.length ? true : false;
			this.$tabBox.toggleClass('hidden', !hastwi);
			this.$tabBox.attr('aria-hidden', ( hastwi ? false : true));
			this.$list.attr('aria-hidden', ( hastwi ? false : true));
		},

		//为单个model触发visible事件
		filterOne: function(twi) {
			twi.trigger('visible');
		},

		//collection逐个执行filterOne
		filterAll: function(event) {
			tweets.each(this.filterOne, this);
		},

		//为新增model创建视图，并立即渲染至app首行
		addOne: function(twi) {
			var twiView = new TwiView({ model:twi });
			this.$list.prepend(twiView.render().el);
		},

		//创建新推文model
		post: function() {
			if ( !this.$tweetBtn.hasClass('disabled') ) {
				var nowDate = this.postDate();
				tweets.create({text: this.$textarea.val(), twiDateText: nowDate });
				this.$textarea.val('');
				this.$tweetBtn.addClass('disabled');
			}
		},

		//获取当前时间文本，将储存至新model的属性里
		postDate: function() {
			var myDate = new Date();
			return myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate() + '日';
		}
	});
	
	return AppView;
});