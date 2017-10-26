//全局Backbone应用主体变量
var app = app || {};

(function () {
	'use strict';
	
	//定义推文collection，保存至localstorage本地存储
	var Tweets = Backbone.Collection.extend({
		model: app.Tweet,
		url: '/tweets',

		//保存所有推文model到本地存储命名为‘tweet-backbone’
		localStorage: new Backbone.LocalStorage('tweet-backbone')
	});

	//创建全局的推文collection
	app.tweets = new Tweets();
})();