<?php
   
   
   
   $orderDetails = array();
   $conn = mysqli_connect("localhost","root","mysql","pizza"); 
   
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
   
   
   $sql = 'SELECT pizzaid, pizza_size, pizza_suace, pizza_cheese, pizza_toppings, pizza_veggies, amount, submitted_status  FROM pizza_orders';
   
   $retval = mysqli_query( $conn, $sql );
   
   
   if(! $retval ) {
      die('Could not get data: ' . mysqli_error());
   }
   
    while($row = mysqli_fetch_assoc($retval)) {
            $orderDetails[] = $row;
    }

   echo json_encode($orderDetails);
   
   
   //echo "Fetched data successfully\n";
   
   mysqli_close($conn);
?>