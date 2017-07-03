'use strict';

app.controller('reportController', function ($scope, $http) {

	$scope.msg = "Report Summary";
	
	 var countArray = 0;
	 var weekReportCount = 0;




	 var options = {
		  type: 'line',
		  data: {
		    "labels": ['Large', 'Medium', 'Small'],
		    datasets: [{
		      label: 'Pizza Count',
		      data: [6,5,7],
		      backgroundColor: "rgba(255,153,0,0.4)"
		    }]
		  }
		};

	var weekReportOptions = {
		  type: 'bar',
		  data: {
		    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
		    datasets: [{
		      label: 'Weekly Report',
		      data: [12, 19, 3, 17, 6, 3, 7],
		      backgroundColor: "rgba(153,255,51,0.4)"
		    }]
		  }
		};	

var pizza_chart = document.getElementById('pizzaChart').getContext('2d');
		

var ctx = document.getElementById('myChart').getContext('2d');
				
	 

	$http.get('php/getreport.php').success(function(data) {
				$scope.reportDetails = data;
				console.log('Data retrieved from DB');
				console.log(data);

				for( var i = 0; i < data.length; i++ ){
					if(data[i].pizzaCount > 0 && data[i].pizza_size ===  "Large")
						options.data.datasets[0].data[countArray++] =parseInt(data[i].pizzaCount);
					else if(data[i].pizzaCount > 0 && data[i].pizza_size ===  "Medium")
							options.data.datasets[0].data[countArray++] = parseInt(data[i].pizzaCount);
					else if(data[i].pizzaCount > 0 && data[i].pizza_size ===  "Small")
							options.data.datasets[0].data[countArray++] = parseInt(data[i].pizzaCount);
					 if(data[i].dayCount > 0){
					 	switch(data[i].ordered_day){
					 		case "Tuesday":
					 			weekReportOptions.data.datasets[0].data[1] =parseInt(data[i].dayCount);
					 			break;
					 		case "Monday":
					 			weekReportOptions.data.datasets[0].data[0] =parseInt(data[i].dayCount);
					 			break;
					 		case "Saturday":
					 			weekReportOptions.data.datasets[0].data[5] =parseInt(data[i].dayCount);
					 			break;
					 		case "Sunday":
					 			weekReportOptions.data.datasets[0].data[6] =parseInt(data[i].dayCount);
					 			break;
					 		case "Friday":
					 			weekReportOptions.data.datasets[0].data[4] =parseInt(data[i].dayCount);
					 			break;	
					 		case "Thursday":
					 			weekReportOptions.data.datasets[0].data[3] =parseInt(data[i].dayCount);
					 			break;
					 		case "Wednesday":
					 			weekReportOptions.data.datasets[0].data[2] =parseInt(data[i].dayCount);
					 			break;					
					 	}
					 }			
				}

				console.log(options);

				var myChart1 = new Chart(pizza_chart, options);
				var myChart = new Chart(ctx, weekReportOptions);
				
				
			}).error(function(data, status, headers, config) {
					console.log("Failed to add the user to DB ");
			});


	$scope.reportFilter = function(item){
		if (item.submitted_status === 'Delivered' ) {
		  return item;
		 }
	}	

	$scope.mostPizza = function(item){
		if (item.pizzaCount > 0 ) {
		  return item;
		 }
	}



});