 <?php  
 //insert.php  
 
 echo "Invoked file"; 
 $connect = mysqli_connect("localhost","root","mysql","pizza");  
 $data = json_decode(file_get_contents("php://input"));  
 if(count($data) > 0)  
 {  
      $pizza_size = mysqli_real_escape_string($connect, $data->pizza_size);       
      $pizza_sauce = mysqli_real_escape_string($connect, $data->pizza_sauce);
      $pizza_toppings = mysqli_real_escape_string($connect, $data->pizza_toppings);
      $pizza_veggiesSelected = mysqli_real_escape_string($connect, $data->pizza_veggiesSelected);
      $amount = mysqli_real_escape_string($connect, $data->amount);
      $submitted_status = mysqli_real_escape_string($connect, $data->submitted_status);
      $ordered_day = mysqli_real_escape_string($connect, $data->ordered_day);  
      $query = "INSERT INTO pizza_orders (pizza_size, pizza_suace, pizza_cheese, pizza_toppings, pizza_veggies, amount, submitted_status, ordered_day) VALUES ('$pizza_size', '$pizza_sauce', '$pizza_toppings', '$pizza_veggiesSelected', '$amount', '$submitted_status','$ordered_day')";  
      if(mysqli_query($connect, $query))  
      {  
           echo "Data Inserted...";  
      }  
      else  
      {  
           echo 'Error In Insertion';  
      }  
 }  
 ?>  