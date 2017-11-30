//定义推文数据模型
define([
	'backbone', 
	'./comments', 
	'./comment'
], function(Backbone, comments, comment) {
	'use strict';
	
	//使用Backbone.Association插件
	//定义推文model，以及其所关联的评论collection和评论model
	//定义推文model的属性，包括创建时间字符串、like状态、评论展开状态
	var tweet = Backbone.AssociatedModel.extend({
			relations: [{
				type: Backbone.Many,
				key: 'comments',
				collectionType: 'comments',
				relatedModel: comment
			}],

			defaults: {
				text: '',
				twiDateText: '',
				comments: [],
				liked: false,
				isCommentsShowed: false
			},

			urlRoot: '/tweet',

			//初始化关联的评论collection的url，及评论展开状态布尔值（关闭）
			initialize: function() {
				var com = this;
				this.get('comments').url = function() {
					return '/tweet/' + com.id + '/comments';
				}
				this.save({ isCommentsShowed: false});
			},

			//切换like布尔值
			toggleLiked: function() {
				this.save({
					liked : !this.get('liked')
				});
			}
	});

	return tweet;
});