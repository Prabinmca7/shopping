(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditCategoryController', EditCategoryController);



    EditCategoryController.$inject = ['$scope','$http','$state','$stateParams'];

  function EditCategoryController ($scope, $http, $state,$stateParams) {
  //var vm = this;
 
  $scope.formdata = {};
///////////////////select 0ne/////////////////////////////////
if($stateParams.id){

        var val={'id':$stateParams.id};

 $http({
        url: '/api/admin/editcat',
        method: "POST",
        data:val
    })
    .then(function(response) {
    
      $scope.formdata.category=response.data.data.category;
      $scope.formdata.id=response.data.data.cat_id;
      
    }, 
    function(response) { // optional
            // failed
    });

}


/////////////////////select/////////////////////////////
$http({
        url: '/api/admin/selectCategory',
        method: "POST",
        
    })
    .then(function(response) {
      $scope.list=response.data.data;
            // success
    }, 
    function(response) { // optional
            // failed
    });
    
 ///////////////////////insert////////////////////////////
 $scope.updatecat=function(){
       // $scope.formdata.id=$stateParams.id;
       if($scope.validation()==0){

      
        $http({
          url: '/api/admin/updatecat',
          method: "POST",
          data:$scope.formdata
      })
      .then(function(response) {
              
        $state.go('category');
              // success
      }, 

      function(response) { // optional
              // failed
      }); 
}
  }
 

  $scope.del=function(id){
          
        var val={'id':id};
           $http({
                url: '/api/admin/delcate',
                method: "POST",
                data:val
            })
            .then(function(response) {
       $state.go('category');
                   
            }, 
            function(response) { // optional
                    // failed
            });
        
        }
        function readFile(ev) {

                if (this.files && this.files[0]) {
                var FR= new FileReader();
                FR.onload = function(e) {
                  document.getElementById("imgfiles").src= e.target.result;
                 //ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result; 
              
                 //console.log(document.getElementById("imgfiles2"));
                 document.getElementById("imgfiles2").href= e.target.result;
                 
                 //ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result;
                  //document.getElementById("b64").innerHTML = e.target.result;
                };       
                FR.readAsDataURL( this.files[0] );
                }
               }
               if(document.getElementById("imgfile")!=null){
                 document.getElementById("imgfile").addEventListener("change", readFile, false); 
               }
              
               $scope.iconw=function(){
              
                document.getElementById('imgfile').click();
                
                     }

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
