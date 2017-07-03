 <?php  
 //insert.php  
 
 echo "Invoked file Vinayaka"; 
 $connect = mysqli_connect("localhost","root","mysql","pizza");  
 $data = json_decode(file_get_contents("php://input"));  
 if(count($data) > 0)  
 {  
   
		$pizza_size = mysqli_real_escape_string($connect, $data->pizza_size);       
      $pizza_sauce = mysqli_real_escape_string($connect, $data->pizza_sauce);
      $pizza_toppings = mysqli_real_escape_string($connect, $data->pizza_toppings);
      $pizza_veggiesSelected = mysqli_real_escape_string($connect, $data->pizza_veggiesSelected);
	  $pizza_cheeseSelected = mysqli_real_escape_string($connect, $data->pizza_cheeseSelected);
      $amount = mysqli_real_escape_string($connect, $data->amount);
	  $floatamount = floatval($amount);
      $submitted_status = mysqli_real_escape_string($connect, $data->submitted_status);
      $ordered_day = mysqli_real_escape_string($connect, $data->ordered_day);
	$query = "INSERT INTO pizza_orders(pizza_size, pizza_suace, pizza_cheese, pizza_toppings, pizza_veggies, amount, submitted_status, ordered_day) 
					VALUES ('$pizza_size',
					'$pizza_sauce', 
					'$pizza_cheeseSelected', 
					'$pizza_toppings', 
					'$pizza_veggiesSelected', 
					'$floatamount', 
					'$submitted_status',
					'$ordered_day')";
      if(mysqli_query($connect, $query))  
      {  
           echo "Data Inserted...";  
      }  
      else  
      {  
           echo 'Error In Insertion';  
		   
		   echo $pizza_size;
		   echo $pizza_sauce;
		   echo $pizza_toppings;
		   echo $pizza_veggiesSelected ;
		   echo $pizza_cheeseSelected;
		   echo $floatamount;
		   echo $submitted_status;
		   echo $ordered_day;
		   
      }  
 }  
 ?>  