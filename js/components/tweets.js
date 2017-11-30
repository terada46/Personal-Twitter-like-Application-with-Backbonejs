//定义推文数据模型集合
define(['backbone', 'underscore', 'backboneLocalstorage', './tweet'], function(Backbone, _, Store, tweet) {
	'use strict';

	//定义推文collection，保存至localstorage本地存储
	var TweetCollection = Backbone.Collection.extend({
		model: tweet,
		url: '/tweets',

		//保存所有推文model到本地存储命名为‘tweet-backbone’
		localStorage: new Store('tweet-backbone')
	});

	return new TweetCollection();
});