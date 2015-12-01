 var stickerController = function($scope, fileReader, localStorageService) {
     var stickersInStore = localStorageService.get('stickers');
     var mainPhoto = localStorageService.get('mainPhoto');

     var vm = this;

     vm.stickers = stickersInStore || []; // Load stickers from local storage
     vm.imageSrc = mainPhoto || ""; // Load main photo image from local storage
     vm.newSticker = {};



     //*********************************************
     // WATCHES
     //*********************************************

     //Save sticker in local store
     $scope.$watch('vm.stickers', function() {
         try {
             localStorageService.set('stickers', $scope.stickers);
         } catch (e) {
             alert("Local storage size exceeded from 5MB.");
         }
     }, true);

     //Save main photo in local store
     $scope.$watch('vm.imageSrc', function() {
         try {
             localStorageService.set('mainPhoto', vm.imageSrc);
         } catch (e) {
             alert("Local storage size exceeded from 5MB.");
         }
     }, true);

     var getFile = function(callback) {
         $scope.progress = 0;
         fileReader.readAsDataUrl($scope.vm.file, $scope)
             .then(function(result) {
                 callback(null, result);
             });
     };

     //*********************************************
     // Local Functions
     //*********************************************
     var dropCallback = function(event, ui) {
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
             vm.stickers.push(angular.copy(recreateSticker));
             droppedImageBlock.title = "dropped_" + droppedImageBlock.id;
         }
     };

     var uploadSticker = function() {
         var newSticker = angular.copy(vm.newSticker);
         vm.stickers.push(newSticker);

         //Reset sticker upload modal window
         vm.newSticker = {};
         vm.stickerImageSrc = "";
     }

     var reset = function() {
         vm.stickers = [];
         vm.imageSrc = "";
     }

     var removeSticker = function(index) {
         vm.stickers.splice(index, 1);
     }

     vm.dropCallback = dropCallback;
     vm.uploadSticker = uploadSticker;
     vm.reset = reset;
     vm.removeSticker = removeSticker;
     vm.getFile = getFile;
 }

 stickerController['$inject'] = ['$scope', 'fileReader', 'localStorageService'];
 angular.module("photoStickerApp").controller('stickerController', stickerController);