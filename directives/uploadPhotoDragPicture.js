'use strict';

/* Directives */
angular
    .module('blipparPhotoStickerApp')
    .directive('uploadImage', function() {
        return {
            link: function($scope, element, attrs) {
                //Read selected image and show in photo area
                element.bind("change", function(e) {
                    $scope.file = (e.srcElement || e.target).files[0];
                    $scope.getFile(function(err, result) {
                        $scope.imageSrc = result;
                    });
                });
            }
        };
    })
    .directive('uploadSticker', function() {
        return {
            link: function($scope, element, attrs) {
                //Read selected image and create new model scope for sticker modal window
                element.bind("change", function(e) {
                    $scope.file = (e.srcElement || e.target).files[0];
                    $scope.getFile(function(err, result) {
                        $scope.newSticker = {
                            image: result
                        };
                        $scope.stickerImageSrc = result;
                    });
                });
            }
        };
    });