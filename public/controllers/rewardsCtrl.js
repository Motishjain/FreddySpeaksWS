angular.module('myApp').controller('rewardsCtrl',
  ['$scope','$http','$window','$location','$uibModal','Upload', function ($scope, $http, $window, $location, $uibModal,Upload) {
 	var vm = this;

 	// get all rewards data
 	$http.post('/dataRewards').success(function(data, status, headers, config) {
      vm.rewardsdata = data;
      console.log(data);

    });
 	// open add modal
    vm.add = function(){
      $("#addModal").modal();
    }

    // add new reward
    vm.submit = function(){ 
    	  
    	console.log(vm.rewards);
    	if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            if (vm.rewards.name.length > 0 && vm.rewards.cost.length>0){     //check required fild
              
              vm.upload(vm.file); //call upload function
            }  
        }
    }
    vm.upload = function (file) {
        Upload.upload({
            url: '/addRewards', //webAPI exposed to upload the file
            data:{file:file, data: vm.rewards} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                 swal({   
                      title: "Success!",   
                      text: "Reward added successfully",
                      type: "success",   
                      timer: 2000,   
                      showConfirmButton: false });
              vm.rewardsdata.push(resp.data.dataObj);
              setTimeout(function(){   
              	$("#addModal").modal('hide');
              	vm.rewards = {};  
              	vm.file = ''; 
               }, 2000);
           
              

            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress =progressPercentage + '%'; // capture upload progress
        });
    };

    // edit reward
    var editIndex = 0;
    vm.edit = function(index, curent){
    	console.log(index, curent);
    	editIndex = index;
    	vm.edit_reward = curent;
    	vm.editImage = './dist/uploads/'+curent.image;
    	$('#editModal').modal()
    }

    vm.update = function(id){
    	console.log(vm.edit_reward);

    	 var data = angular.toJson(vm.edit_reward)
      	 data = angular.fromJson(data);
      	 delete data['__v'];
      	 delete data['_id'];
      	 console.log(data);
    	 if(vm.editfile == undefined){
         	sUpdate(id, data);
          }else{
          	iUpdate(id, data);
          }
    }
    function sUpdate(id, data){
    	
    	 $http.post('/editRewards', {id: id, newfile: false, data: data})
                .success(function(data, status, headers, config) {
                  if(data.error_code === 0){ //validate success
	                 swal({   
	                      title: "Success!",   
	                      text: "Reward edited successfully ",
	                      type: "success",   
	                      timer: 2000,   
	                      showConfirmButton: false 
	                    });
	             $("#editModal").modal('hide');
          		}
              });
    }
    function iUpdate(id, data){
    	console.log(vm.editfile);
		console.log(data);
		Upload.upload({
            url: '/editiRewards' , //webAPI exposed to upload the file
            data:{
                id:id,
                newfile: true,
                file:vm.editfile, 
                data: data
                } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                //$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                swal({   
                      title: "Success!",   
                      text: "Cocktail edited successfully ",
                      type: "success",   
                      timer: 2000,   
                      showConfirmButton: false 
                    });
               	vm.rewardsdata[editIndex].image = resp.data.img;
                $("#editModal").modal('hide');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
        });
    }
    // delete reward
    vm.remove  = function(index, id){
	       swal({   
            title: "Are you sure?",   
            text: "You will not be able to recover this imaginary file!",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false,
            showLoaderOnConfirm: true, 
          }, function(isConfirm){   
             if(isConfirm){
              $http.post('/removeRewards', {id: id}).success(function(data, status, headers, config) {
                  swal({   
                      title: "Deleted!",   
                      text: "Reward has been deleted.",
                      type: "success",   
                      timer: 2000,   
                      showConfirmButton: false 
                    });
                  vm.rewardsdata.splice(index, 1);
                });
              }

           });
    }
    
  }
 ])
angular.module('myApp').directive('file', function(){
    return {
        scope: {
            file: '='
        },
        link: function(scope, el, attrs){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];
                scope.file = file ? file.name : undefined;
                scope.$apply();
            });
        }
    };
});