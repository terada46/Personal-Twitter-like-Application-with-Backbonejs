'use strict';

//配置需要加载的第三方库
require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		"jquery": "./lib/jquery.min",
		"backbone": "./lib/backbone",
		"backboneLocalstorage": "./lib/backbone.localStorage",
		"underscore": "./lib/underscore-min",
		"backboneAssociations": "./lib/backbone-associations-min",
		"bootstrap": "./lib/bootstrap.min"
	}
});


require([
	'components/app-view', 
	'backbone', 
	'components/router', 
	'underscore'
], function(AppView, Backbone, Workspace, _) {

	//判断输入事件改变按键样式
	$(document).ready(function(){
		$('#tweet').addClass('disabled');
		$('textarea').bind('input propertychange', function() {
		   $('#tweet').toggleClass('disabled', !($('textarea').val()));
		});
	 });

	//推文删除按键的一个点击事件
	$(document).on('click', function(event) {
		if (!$(event.target).closest($('.dropdown-btn')).length) {
			$('.destroy').removeClass('show').addClass('fadeOutDown');
		}
	});

	//驱动路由
	new Workspace;
	Backbone.history.start();
	
	//创建APP（主视图）
	new AppView();
});

