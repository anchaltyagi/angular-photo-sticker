/**
 *  Module
 *
 * Description
 */
angular.module('photoStickerApp', ['ngDragDrop', 'LocalStorageModule'])
	.config(['localStorageServiceProvider',
		function(localStorageServiceProvider) {
			localStorageServiceProvider.setPrefix('sticker');
		}
	])