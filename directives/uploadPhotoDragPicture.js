'use strict';

/* Directives */
angular
    .module('blipparPhotoStickerApp')
     .directive('uploadImage', function() {
        return {
            link: function($scope, element, attrs) {
                element.bind("change", function(e){      
                    $scope.file = (e.srcElement || e.target).files[0];
                    $scope.getFile(function(err, result){
                        $scope.imageSrc = result;
                    });
                  });
            }
        };
    })
    .directive('uploadSticker', function() {
        return {
            link: function($scope, element, attrs) {
                element.bind("change", function(e){      
                    $scope.file = (e.srcElement || e.target).files[0];
                    $scope.getFile(function(err, result){
                        $scope.stickers.push({image:result});
                        $scope.stickerImageSrc = result;
                    });
                });
            }
        };
});