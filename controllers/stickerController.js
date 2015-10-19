angular
    .module('blipparPhotoStickerApp')
    .controller('stickerController', function($scope, fileReader, localStorageService) {
        var stickersInStore = localStorageService.get('stickers');
        var mainPhoto = localStorageService.get('mainPhoto');
        $scope.stickers = stickersInStore || []; // Load stickers from local storage
        $scope.imageSrc = mainPhoto || ""; // Load main photo image from local storage
        $scope.newSticker = {};

        //Save sticker in local store
        $scope.$watch('stickers', function() {
            try {
                localStorageService.set('stickers', $scope.stickers);
            } catch (e) {
                alert("Local storage size exceeded from 5MB.");
            }
        }, true);

        //Save main photo in local store
        $scope.$watch('imageSrc', function() {
            try {
                localStorageService.set('mainPhoto', $scope.imageSrc);
            } catch (e) {
                alert("Local storage size exceeded from 5MB.");
            }
        }, true);

        $scope.getFile = function(callback) {
            $scope.progress = 0;
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    callback(null, result);
                });
        };

        $scope.dropCallback = function(event, ui) {
            var droppedImageBlock = ui.draggable[0];

            //Reset the height of dropped image parent container
            droppedImageBlock.parentElement.style.height = "0px";

            //Recreate image after drop for using mutiple times, don't recreate if image is repositioned after drop within dropped area
            if (!droppedImageBlock.title.startsWith("dropped_")) {
                var droppedImage = droppedImageBlock.getElementsByTagName("img");
                if (droppedImage && droppedImage[0]) {
                    droppedImage = droppedImage[0];
                }
                var recreateSticker = {
                    image: droppedImage.currentSrc,
                    title: droppedImageBlock.title
                };
                $scope.stickers.push(angular.copy(recreateSticker));
                droppedImageBlock.title = "dropped_" + droppedImageBlock.id;                
            }
        };

        $scope.uploadSticker = function() {
            var newSticker = angular.copy($scope.newSticker);
            $scope.stickers.push(newSticker);

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