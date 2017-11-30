//定义路由模型
define(['backbone', 'jquery', './tweets', '../common'], function(Backbone, $, tweets, Common) {
	'use strict';
	
	//定义全局app的路由，定义切换全部显示和喜欢（like）显示的URL键值对
	var TwiRouter = Backbone.Router.extend({
		routes: {
			'like': 'setLikedList',
			'all': 'setAll',
			'': 'setAll'
		},

		setLikedList: function() {
			Common.twiFilter = 'liked';
			tweets.trigger('filter');
		},
		setAll: function() {
			Common.twiFilter = 'all';
			tweets.trigger('filter');
		}
	});

	//创建新全局路由实例
	return TwiRouter;
});