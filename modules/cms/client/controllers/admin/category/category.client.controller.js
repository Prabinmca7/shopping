(function () {
  'use strict';
  angular
    .module('core')
    .controller('CategoryController', CategoryController);
  CategoryController.$inject = ['$scope','$http','$state','$stateParams'];
  function CategoryController ($scope, $http, $state) {
   $scope.formdata = {};
/////////////////////defaultLang//////////
  $http({
        url: '/api/admin/getdefaultLang',
        method: "POST",       
    })
    .then(function(response) {
     
      $scope.formdata.defaultlang=response.data.data;
     
    }, 
    function(response) { // optional
            // failed
    });
$scope.formdata.catlang='0';
     $http({
  url: '/api/admin/getallLanguages',
  method: "POST",
  
})
.then(function(response) {
$scope.listlang=response.data.data;
     


}, 
function(response) { // optional
      // failed
});
 
 /////////////////////select/////////////////////////////
 $http({
        url: '/api/admin/selectCategory',
        method: "POST",       
    })
    .then(function(response) {
      $scope.list=response.data.data;
	  
	  
           
    }, 
    function(response) { // optional
            // failed
    });

 ///////////////////////insert////////////////////////////
 $scope.insCategory=function(){
        if($scope.validation()==0){
        $http({
          url: '/api/admin/insCategory',
          method: "POST",
          data:$scope.formdata
      })
      .then(function(response) {
        $state.reload();
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
             $state.reload();
            }, 
            function(response) { // optional
                    // failed
            });
        }
        $scope.rmerrorclass=function(){
                angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
                angular.element(document.querySelectorAll('.tabvalidationErr')).removeClass('tabvalidationErr');
                }
                $scope.adderrorclass=function(cls){
                angular.element(document.querySelector(cls)).addClass('validationErr');
                }
                $scope.taberrorclass=function(cls){
                  angular.element(document.querySelector(cls)).addClass('tabvalidationErr');
                  }

                $scope.validation=function(){
                var error=0;
                $scope.rmerrorclass();
                  if($scope.formdata.category=='' || angular.isUndefined($scope.formdata.category) ){
                    $scope.adderrorclass(".cat");
                    $scope.taberrorclass(".tcat");
                    error=1;
                    }

                    return error;          
            }

///////////////////////////////////////////////////////////////////////
$scope.addCategory=function(){


   $http({
        url: '/api/admin/addCategory',
        method: "POST",
        data:$scope.formdata
    })
    .then(function(response) {
    
            // success
    }, 
    function(response) { // optional
            // failed
     });
   }
    $scope.validation2=function(){
                var error=0;
                $scope.rmerrorclass();
                  if($scope.formdata.categorylang=='' || angular.isUndefined($scope.formdata.categorylang) ){
                    $scope.adderrorclass(".categorylang");
                    error=1;
                    }
                     if($scope.formdata.catlang=='0' || angular.isUndefined($scope.formdata.catlang) ){
                    $scope.adderrorclass(".catlang");
                    error=1;
                    }
                    return error;          
            }
  $scope.openLangModel=function(id){
    
    $scope.formdata.id=id;
  }
 $scope.insCategoryLang=function(){
        if($scope.validation2()==0){
          $('#myModal').modal('hide');
        $http({
          url: '/api/admin/insCategoryLang',
          method: "POST",
          data:$scope.formdata
      })
      .then(function(response) {
        $state.reload();
              // success
      }, 
      function(response) { // optional
              // failed
      });
  }
}


function readFile(ev) {

  if (this.files && this.files[0]) {
  var FR= new FileReader();
  FR.onload = function(e) {
    document.getElementById("imgfiles").src= e.target.result;
   //ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result; 

   console.log(document.getElementById("imgfiles2"));
   document.getElementById("imgfiles2").href= e.target.result;
   ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result;
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

 function getActionBtns(){


 $scope.addpage  = document.querySelectorAll(".add-action");
 $scope.addpage[0].addEventListener("click", $scope.newpage, false);

 $scope.editpage= document.querySelectorAll(".edit-action");
 $scope.editpage[0].addEventListener("click", $scope.editpages, false);

 var delpage= document.querySelectorAll(".delete-action");
 delpage[0].addEventListener("click", $scope.delpage, false);



 }
$scope.chkall=function(){
$scope.editpage[0].removeAttribute("href");
 
}
$scope.addchkval=function(linkid){
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
console.log(linkid)
console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/cms/editcat/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('addcategory');
}
$scope.editpages=function(){
  
   var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
if($scope.editpage[0].getAttribute("href")){
document.location=$scope.editpage[0].getAttribute("href");
}
 }

 
}
$scope.chkValue=[];


$scope.delpage=function(){
  $scope.chkValue=[];
 
  //$state.go('addlanguage');
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
 
}
setTimeout(getActionBtns, 2500);
 }
}());
