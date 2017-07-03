'use strict';

app.controller('ViewOrderController', function ($scope, $http) {
	
	 $scope.selectedName={};
	 $scope.changeStatus="";
	 $scope.msg = 'View Orders List';
	 $scope.showUpdateView = false;

	 $scope.orderStatus = ["Prepared", "Delivered", "Cancel"];

	 $http.get('php/getPizzaOrder.php').success(function(data) {
				$scope.ordersDetails = data;
				console.log('Data retrieved from DB');
				console.log(data);
				
			}).error(function(data, status, headers, config) {
					console.log("Failed to add the user to DB ");
			});

	$scope.Update = function(id){
		console.log('button clicked');
		console.log(id);
		console.log($scope.selectedName.option);
		console.log($scope.changeStatus);

		$http.post('php/updateStatus.php', {
				'pizzaId': id,
				'pizzaStatus': $scope.changeStatus				
			}).success(function(data) {
				console.log('Updated Successfully');
				$scope.showUpdateView = true;
			}).error(function(data, status, headers, config) {
					console.log("Failed to update ");
			});
		
	}		

	$scope.submittedFilter = function(item){
		if (item.submitted_status === 'submitted' || item.submitted_status === 'Prepared') {
		  return item;
		 }
	}


	$scope.selectChange = function(){
		console.log('Select value changed 1');
		console.log($scope.selectedName);
		$scope.changeStatus=$scope.selectedName.option;
		console.log($scope.changeStatus);
		$scope.selectedName={};
		console.log($scope.selectedName);
	}
	
});