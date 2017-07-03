'use strict';

app.service('Order', function ($rootScope, $http) {
	var self = {};

	self.total = 0; // total of all ordered pizzas
	self.time = 0;  // delivered time after purchase
	self.discount = 0;
	self.discountLevel = 5; // % level of discount
	self.discountForTotalMoreThan = 10; // order higher than this get discountLevel
	self.discountMessage = false;  // show discount message
	self.cart = [];
	self.user = {};

	self.add = function (pizza) {
		console.log('Mohan testing');
		self.time = 0;
		var newPizza = true;
		for (var i = 0; i < self.cart.length; i++) {
			if (self.cart[i].pizza.id == pizza.id) {
				self.cart[i].count += 1;
				newPizza = false;
			}
		}
		if (newPizza) {
			self.cart.push({
				"count": 1,
				"pizza": pizza
			});
		}
		self.total += pizza.price;
		if (self.total >= self.discountForTotalMoreThan) {
			if (self.discount === 0) {
				self.discountMessage = true;
			}
			self.discount = self.discountLevel;
		}
	};

	self.remove = function (index) {
		self.total -= self.cart[index].count * self.cart[index].pizza.price;
		self.cart.splice(index, 1);
		if (self.total < self.discountForTotalMoreThan) {
			self.discount = 0;
			self.discountMessage = false;
		}
	};

	self.clear = function () {
		self.total = 0;
		self.discount = 0;
		self.discountMessage = false;
		self.time = 0;
		
		self.cart = [];
	};

	self.purchase = function () {
		if (self.cart.length) {
			console.log(self.cart);
			console.log(self.cart[0].pizza.sizeSelected);
			
			var d = new Date();
			var weekday = new Array(7);
				weekday[0] =  "Sunday";
				weekday[1] = "Monday";
				weekday[2] = "Tuesday";
				weekday[3] = "Wednesday";
				weekday[4] = "Thursday";
				weekday[5] = "Friday";
				weekday[6] = "Saturday";
			
			$http.post('php/insert.php', {
				'pizza_size': self.cart[0].pizza.sizeSelected,
				'pizza_sauce': self.cart[0].pizza.suaceSelected,
				'pizza_toppings': self.cart[0].pizza.toppingSelected,
				'pizza_veggiesSelected': self.cart[0].pizza.veggiesSelected,
				'pizza_cheeseSelected': self.cart[0].pizza.cheeseSelected,
				'amount' : self.cart[0].pizza.price,
				'submitted_status': 'submitted',
				'ordered_day': weekday[d.getDay()]
			}).success(function(data) {
				self.clear();
				self.time = data.time;
			}).error(function(data, status, headers, config) {
					console.log("Failed to add the user to DB ");
			});
			self.clear();
				self.time = 35;
		}
	};

	self.setParameter= function(value, pizza){
		
		if(value == 'Large' ){
			pizza.sizeSelected = value;
			pizza.sizePrice = 93.0 + 30.0;
			pizza.sizeInd = true;
		}else if(value == 'Medium'){
			pizza.sizeSelected = value;
			pizza.sizePrice = 93.0 + 20.0;
			pizza.sizeInd = true;
		}else if(value == 'Small'){
			pizza.sizeSelected = value;
			pizza.sizePrice = 93.0 + 10.0;
			pizza.sizeInd = true;
		}else if(value == 'Marinara' || value == 'BBQ' || value == 'Buffalo' || value == 'Paramesan'){
			pizza.suaceSelected = value;
			pizza.suacePrice = 1.0;
			pizza.sauceInd = true;
		}else if(value == 'Normal cheese'){
			pizza.cheeseSelected = value;
			pizza.cheesePrice = 1.5;
			pizza.cheeseInd = true;
		}else if(value == 'Light Cheese'){
			pizza.cheeseSelected = value;
			pizza.cheesePrice = 1.0;
			pizza.cheeseInd = true;
		}else if(value == 'No Cheese'){
			pizza.cheeseSelected = value;
			pizza.cheesePrice = 1.0;
			pizza.cheeseInd = true;
		}else if(value == 'Chicken' || value == 'Ham'){
			pizza.toppingSelected = value;
			pizza.toppingPrice = 1.0;
			pizza.topInd = true;
		}else if(value == 'Bacon' || value == 'Peperoni'){
			pizza.toppingSelected = value;
			pizza.toppingPrice = 2.0;
			pizza.topInd = true;
		}else if(value == 'Pine Apple' || value == 'Green Peppers'){
			pizza.veggiesSelected = value;
			pizza.veggiePrice = 1.0;
			pizza.vegInd = true;
		}else if(value == 'Olives' || value == 'Mushrooms' || value == 'Onions'){
			pizza.veggiesSelected = value;
			pizza.veggiePrice = 0.5;
			pizza.vegInd = true;
		}
		pizza.price = pizza.sizePrice + pizza.suacePrice + pizza.cheesePrice + pizza.toppingPrice + pizza.veggiePrice;
	};

	createPersistentProperty('cart', 'fmCart', Array);
	createPersistentProperty('total', 'fmTotal', Number);

	function createPersistentProperty(localName, storageName, Type) {
		var json = localStorage[storageName];

		self[localName] = json ? JSON.parse(json) : new Type;

		$rootScope.$watch(
			function () {
				return self[localName];
			},
			function (value) {
				localStorage[storageName] = JSON.stringify(value);
			},
			true
		);
	}

	return self;
});