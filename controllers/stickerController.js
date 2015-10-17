angular
    .module('blipparPhotoStickerApp')
    .controller('stickerController', function($scope, fileReader){
        $scope.stickers =[];
    $scope.getFile = function (callback) {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          callback(null,result);
                      });
    };
 
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

    $scope.dropCallback = function(event, ui) {
        
    };

    $scope.dragCallback = function(event, ui){
        var draggingImage = event.target.currentSrc;
        $scope.stickers.push(draggingImage);

    }
 	
});