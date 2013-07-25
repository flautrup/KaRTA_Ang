KaRTA.controller('InformationCtrl', function InformationCtrl($scope,data) {
    
    var info=data.getInformation();
    
    $scope.format=info.format;
    $scope.venue="Test";
    $scope.vehicle="Test";
    $scope.user="Test";
    $scope.datasource="Test";
    $scope.comment="Test";
    $scope.date="Test";
    $scope.time="Test";
    $scope.samplerate="Test";
    $scope.duration="Test";
    $scope.segment="Test";
    $scope.beaconmarkers="Test";
  
 
});

