angular
    .module('blipparPhotoStickerApp')
    .controller('stickerController', function($scope, fileReader, localStorageService) {
        var stickersInStore = localStorageService.get('stickers');
        var mainPhoto = localStorageService.get('mainPhoto');
        $scope.stickers = stickersInStore || []; // Load stickers from local storage
        $scope.imageSrc = mainPhoto || ""; // Load main photo image from local storage
        $scope.newSticker = {};
        $scope.stickerCounter = 0;

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

            //Recreate image after drop for using mutiple times, don't recreate if image is repositioned after drop within dropped area
            if (!droppedImage.title.startsWith("dropped_")) {
                var recreateSticker = {
                    id: ++$scope.stickerCounter,
                    image: droppedImage.currentSrc,
                    title: droppedImage.title
                };
                $scope.stickers.push(recreateSticker);
                droppedImage.title = "dropped_" + droppedImage.id;
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