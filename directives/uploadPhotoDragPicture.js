//*********************************************
// Directive to upload base image
//*********************************************
angular
    .module('photoStickerApp')
    .directive('uploadImage', uploadImage);

function uploadImage() {
    var directive = {
        link: linkFunc,
        controller: stickerController,
        controllerAs: 'vm',
        bindToController: true
    }
    return directive;

    function linkFunc($scope, element, attrs) {
        //Read selected image and show in photo area
        element.bind("change", function(e) {
            $scope.vm.file = (e.srcElement || e.target).files[0];
            $scope.vm.getFile(function(err, result) {
                $scope.vm.imageSrc = result;
            });
        });
    }
}

//*********************************************
// Directive to upload sticker
//*********************************************
angular
    .module('photoStickerApp')
    .directive('uploadSticker', uploadSticker);

function uploadSticker() {
    var directive = {
        link: linkFunc,
        controller: stickerController,
        controllerAs: 'vm',
        bindToController: true
    }
    return directive;

    function linkFunc($scope, element, attrs) {
        //Read selected image and show in photo area
        element.bind("change", function(e) {
            $scope.vm.file = (e.srcElement || e.target).files[0];
            $scope.vm.getFile(function(err, result) {
                $scope.vm.newSticker = {
                    image: result
                };
                $scope.vm.stickerImageSrc = result;
            });
        });
    }
}