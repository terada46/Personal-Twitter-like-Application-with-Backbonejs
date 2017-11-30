//定义推文下关联的评论模型集合
define(['backbone', './comment'], function(Backbone, comment) {
	'use strict';
	
	//定义评论数组的collection
	var commentCollection = Backbone.Collection.extend({
		model: comment,
		url: function() {
			return '/comments';
		}
	});

	return new commentCollection();
});