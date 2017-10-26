//全局Backbone应用主体变量
var app = app || {};

(function() {
	'use strict';
	
	//使用Backbone.Association插件
	//定义推文model，以及其所关联的评论collection和评论model
	//定义推文model的属性，包括创建时间字符串、like状态、评论展开状态
	app.Tweet = Backbone.AssociatedModel.extend({
			relations: [{
				type: Backbone.Many,
				key: 'comments',
				collectionType: 'app.Comments',
				relatedModel: 'app.Comment'
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


})();