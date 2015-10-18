angular
    .module('blipparPhotoStickerApp')
    .controller('stickerController', function($scope, fileReader) {
        $scope.stickers = [];
        $scope.newSticker = {};
        $scope.stickerCounter = 0;

        $scope.getFile = function(callback) {
            $scope.progress = 0;
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    callback(null, result);
                });
        };

        $scope.$on("fileProgress", function(e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.dropCallback = function(event, ui) {
            var droppedImage = ui.draggable[0];

            //Reset the height of dropped image parent container
            droppedImage.parentElement.style.height = "0px";

            //Remove span for image title
            var removeButton = droppedImage.parentElement.getElementsByTagName("button");
            var titleSpan = droppedImage.parentElement.getElementsByTagName("span");
            if (titleSpan && titleSpan[0] && removeButton && removeButton[0]) {
                droppedImage.parentElement.removeChild(titleSpan[0]);
                droppedImage.parentElement.removeChild(removeButton[0]);
            }

            //Recreate image after drop for using mutiple times, don't recreate if image is repositioned after drop
            if (!droppedImage.title.startsWith("dropped_")) {
                var recreateSticker = {
                    id: ++$scope.stickerCounter,
                    image: droppedImage.currentSrc,
                    title: droppedImage.title
                };
                $scope.stickers.push(recreateSticker);                
                droppedImage.title = "dropped_"+ droppedImage.id;
            }
        };

        $scope.uploadSticker = function() {
            $scope.stickers.push(angular.copy($scope.newSticker));
            //Reset sticker upload modal window
            $scope.newSticker = {};
            $scope.stickerImageSrc = "";
        }

        $scope.reset = function() {
            $scope.stickers = [];
            $scope.imageSrc = "";
        }

        $scope.removeSticker = function(index) {
            $scope.stickers.splice(index, 1);
        }
    });