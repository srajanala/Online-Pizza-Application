
<div ng-If="showUpdateView == false">
<h1>Submitted Orders</h1>

<table class="table">
	<tr>
    	<th>Pizza Size</th>
        <th>Suace</th>
        <th>Cheese</th>
        <th>Toppings</th>
        <th>Veggies</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Change Status</th>
    </tr>

  <tr ng-repeat="x in ordersDetails | filter: submittedFilter " >
    <td>{{ x.pizza_size }}</td>
    <td>{{ x.pizza_suace }}</td>
    <td>{{ x.pizza_cheese }}</td>
    <td>{{ x.pizza_toppings }}</td>
    <td>{{ x.pizza_veggies }}</td>
    <td>{{ x.amount }}</td>
    <td>{{ x.submitted_status }}</td>
    <td> 
    <select ng-model="selectedName.option" ng-change="selectChange()"  ng-options="y for y in orderStatus" class="form-control">
	</select>
     </td>
     <td> <input type="button" value="Update" class="btn btn-secondary btn-sm" ng-click="Update(x.pizzaid)" > </td>
  </tr>
</table>
</div>

<div ng-If="showUpdateView == true">
	<h1> Pizza Status Updated Successfully </h1>	

</div>