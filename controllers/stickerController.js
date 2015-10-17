angular
    .module('blipparPhotoStickerApp')
    .controller('stickerController', function($scope, fileReader){
        $scope.stickers =[];
        $scope.newSticker ={};
        $scope.stickerCounter = 0;

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
        var droppedImage = ui.draggable[0];
        var droppedImageIndex = $scope.stickers.findIndex(function(element, index){
             return element.id === droppedImage.id ? index : -1;
        });
        //Recreate dropped image for providing the option to drop mutiple times
        if(droppedImageIndex > -1){
            //Reset the height of dropped image parent container
            droppedImage.parentElement.style.height = "0px";
            
            var recreateSticker = {
                            id: ++$scope.stickerCounter,
                            image: droppedImage.currentSrc
                        };
            $scope.stickers.push(recreateSticker);
        }
    };

    $scope.uploadSticker = function(){
        $scope.stickers.push(angular.copy($scope.newSticker));
        //Reset sticker upload modal window
        $scope.newSticker ={};
        $scope.stickerImageSrc = "";
    }
 	
});