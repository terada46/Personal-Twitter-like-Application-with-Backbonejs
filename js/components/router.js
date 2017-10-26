//全局Backbone应用主体变量
var app = app || {};

(function() {
	'use strict';
	
	//定义全局app的路由，定义切换全部显示和喜欢（like）显示的URL键值对
	var TwiRouter = Backbone.Router.extend({
		routes: {
			'like': 'setLikedList',
			'all': 'setAll',
			'': 'setAll'
		},

		setLikedList: function() {
			app.twiFilter = 'liked';
			app.tweets.trigger('filter');
		},
		setAll: function() {
			app.twiFilter = 'all';
			app.tweets.trigger('filter');
		}
	});

	//创建新全局路由实例
	app.twiRouter = new TwiRouter();

	//驱动路由
	Backbone.history.start();
})();