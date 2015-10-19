/**
 *  Module
 *
 * Description
 */
app = angular.module('blipparPhotoStickerApp', ['ngDragDrop', 'LocalStorageModule'])
	.config(['localStorageServiceProvider',
		function(localStorageServiceProvider) {
			localStorageServiceProvider.setPrefix('blippar');
		}
	])