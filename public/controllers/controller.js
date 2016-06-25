var myApp= angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',
	function($scope,$http){
		console.log("Hello World From Controller");

	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			console.log("I Got data from requested");
			$scope.contactlist = response;
			$scope.contact = "";
		});
	};

	refresh();

		$scope.addContact = function (){
			console.log($scope.contact);
			$http.post('/contactlist',$scope.contact).success(function(response){
				console.log(response);
				refresh();
			});
		};

		$scope.remove = function(id){
			console.log(id);
			$http.delete('/contactlist/' + id).success(function(response){
				refresh();
			});
		};

		$scope.edit = function(id){
			console.log(id);
			$http.get('/contactlist/' + id).success(function(response){
				$scope.contact = response;
			});
		};

		$scope.update = function(id){
			console.log($scope.contact._id);
			$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
				refresh();
			});
		};

		// person1 = {
		// 	name: 'Tom',
		// 	email: 'tom@live.com',
		// 	number: '123-456789'
		// };
		// person2 = {
		// 	name: 'jhon',
		// 	email: 'jhon@gmail.com',
		// 	number: '321-987654'
		// };
		// person3 = {
		// 	name: 'max',
		// 	email: 'maxter@yahoo.com',
		// 	number: '987-654321'
		// };
		// var contactlist = [person1, person2, person3];
		// $scope.contactlist = contactlist;
	}]);

// function AppCtrl() {
// 	// body...
// 	console.log("Hello World From Controller")
// }