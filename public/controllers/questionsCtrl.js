angular.module('myApp')
.controller('questionsCtrl',
  ['$scope','$http','$window','$location', function ($scope, $http, $window, $location) {
  	var vm = this;


 	// get all rewards data
 	$http.post('/dataQuestions').success(function(data, status, headers, config) {
      vm.questionsdata = data;
      console.log(data);

    });

  	vm.operators = [];
  	vm.values = [];
  	for(var i=1;i<=15;i++){
  		vm.operators.push(i)
  	}
  	vm.types = [
	  	{value:'t1',name:'Type 1'},
	  	{value:'t2',name:'Type 2'},
	  	{value:'t3',name:'Type 3'}
  	]
  	// open add modal
    vm.add = function(){
      $("#addModal").modal();
    }
    vm.numbers = [];
   
    vm.setValue = function(){
     vm.numbers = [];
      var count = vm.ratingNumbers;
      for(var i=0;i<count;i++){
      	vm.numbers.push({});
      }
    }

 
    // add new reward
    vm.submit = function(){ 
    vm.questions={
      ratingValues: [],
      emoticonIds:[]
     }  
		vm.numbers.forEach(function(v,k){
      console.log(vm.questions.ratingValues);
      console.log(vm.questions.emoticonIds);
      console.log(v.emid);
      console.log(v.val);
      if(v.val !== undefined && v.emid !== undefined){
        vm.questions.ratingValues.push(v.val)
        vm.questions.emoticonIds.push(v.emid)
      }
    		
    	})
    	console.log(vm.questions);
    	$http.post('/addQuestions', {data: vm.questions})
                .success(function(data, status, headers, config) {
                  if(data.error_code === 0){ //validate success
	                 swal({   
	                      title: "Success!",   
	                      text: "Questions added successfully ",
	                      type: "success",   
	                      timer: 2000,   
	                      showConfirmButton: false 
	                    });
	              vm.questionsdata.push(data.dataObj);   
	             $("#addModal").modal('hide');
	             vm.questions = {};
               vm.ratingNumbers = '';
               vm.numbers = {};
          		}
              });
    }
    //edit
    vm.edit_numbers = [];
     vm.edit = function(index, curent){
    	console.log(index, curent);
    	vm.edit_ratingNumbers = curent.ratingValues.length.toString();
    	console.log(curent.ratingValues.length);
    	vm.edit_question = curent;
    	vm.edit_numbers = [];
    	curent.ratingValues.forEach(function(v,i){
    		vm.edit_numbers.push({
    			val: v,
    			emid: curent.emoticonIds[i]
    		})
    	})
    	console.log(vm.edit_numbers);
    	$('#editModal').modal()
    }
    vm.eSetValue = function(){
     vm.edit_numbers = [];
      var count = vm.edit_ratingNumbers;
      for(var i=0;i<count;i++){
      	vm.edit_numbers.push({});
      }
    }

    vm.update = function(id){
      vm.edit_question.ratingValues = [];
     vm.edit_question.emoticonIds = [];
    	vm.edit_numbers.forEach(function(v,k){
    		vm.edit_question.ratingValues.push(v.val)
    		vm.edit_question.emoticonIds.push(v.emid)
    	})
    	 var data = angular.toJson(vm.edit_question)
      	 data = angular.fromJson(data);
      	 delete data['__v'];
      	 delete data['_id'];
    	 $http.post('/editQuestions', {id: id,  data: data})
                .success(function(data, status, headers, config) {
                  if(data.error_code === 0){ //validate success
	                 swal({   
	                      title: "Success!",   
	                      text: "Questions edited successfully ",
	                      type: "success",   
	                      timer: 2000,   
	                      showConfirmButton: false 
	                    });
	             $("#editModal").modal('hide');
          		}
              });
    }
     // delete 
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
              $http.post('/removeQuestions', {id: id}).success(function(data, status, headers, config) {
                  swal({   
                      title: "Deleted!",   
                      text: "Reward has been deleted.",
                      type: "success",   
                      timer: 2000,   
                      showConfirmButton: false 
                    });
                  vm.questionsdata.splice(index, 1);
                });
              }

           });
    }


  }
 ])