//定义单条评论模型
define(['backbone', 'backboneAssociations'], function(Backbone) {
	'use strict';

	//定义评论model，包括文本字符串、时间字符串、url属性
	var twiComment = Backbone.AssociatedModel.extend({
		defaults: {
			text:'',
			commentDateText: '',
			urlRoot: '/comments'
		}
	});

	return twiComment;
});