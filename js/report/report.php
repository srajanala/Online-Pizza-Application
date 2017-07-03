<div>

<h1>Pizza weekly Report</h1>

<p>{{msg}}</p>

<table class="table">
	<tr>
		<th>Ordered Placed Day</th>
    	<th>Pizza Size</th>
        <th>Suace</th>
        <th>Cheese</th>
        <th>Toppings</th>
        <th>Veggies</th>        
        <th>Status</th>
        <th>Preparation Time</th>
        <th>Delivered Time</th>
        <th>Location</th>
    </tr>

  <tr ng-repeat="x in reportDetails | filter: reportFilter" >
  	<td>{{ x.ordered_day }}</td>
    <td>{{ x.pizza_size }}</td>
    <td>{{ x.pizza_suace }}</td>
    <td>{{ x.pizza_cheese }}</td>
    <td>{{ x.pizza_toppings }}</td>
    <td>{{ x.pizza_veggies }}</td>    
    <td>{{ x.submitted_status }}</td>
    <td>{{ x.preparedTime }} minutes</td>
    <td>{{ x.DeleiveredTime }} minutes</td>
    <td>Lee's Summit</td>
    <td> 
    </tr>
</table>


<h1>Most Ordered Pizza's</h1>

<table class="table">
	<tr>
		<th>Pizza Size</th>
    	<th>Count</th>
        
    </tr>

  <tr ng-repeat="x in reportDetails | filter: mostPizza" >
  	<td>{{ x.pizza_size }}</td>
  	<td>{{ x.pizzaCount }}</td>
   
    </tr>
</table>


<div>
	<h1>Weekly Report Chart</h1>
	<canvas id="myChart"></canvas>

</div>

<div>
	<h1>Most Ordered Pizza Count Report</h1>
	<canvas id="pizzaChart"></canvas>

</div>
</div>