KaRTA.controller('AppCtrl', function AppCtrl($scope, data) {
    var file;

    $scope.loadData = function() {
        $scope.info = data.getInformation();
    }

    $scope.setFile = function(element) {
        $scope.$apply(function() {
            $scope.file = element.files[0];
        })

        data.loadFileContent($scope.file);
    };
    
    $scope.loadFile= function() {
        data.loadFileContent($scope.file);
    }

});
