(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditProtaxgroupsController', EditProtaxgroupsController);

    EditProtaxgroupsController.$inject = ['$scope','$http','$state','$stateParams'];

  function EditProtaxgroupsController ($scope, $http, $state,$stateParams) {
  //var vm = this;
 
  $scope.formdata = {};
///////////////////select 0ne/////////////////////////////////




        $scope.rmerrorclass=function(){
                angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
                }
                $scope.adderrorclass=function(cls){
                angular.element(document.querySelector(cls)).addClass('validationErr');
                }
                
                $scope.validation=function(){
                var error=0;
                $scope.rmerrorclass();
                  
                  if($scope.formdata.category=='' || angular.isUndefined($scope.formdata.category) ){
                    $scope.adderrorclass(".cat");
                    error=1;
                    
                    }
                  
                    return error;    
            }



 }
}());
