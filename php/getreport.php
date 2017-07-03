<?php
   
   
   
   $orderDetails = array();
   $conn = mysqli_connect("localhost","root","mysql","pizza"); 
   
   $delivered = "Delivered";

   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
   
   
   $sql = "select pizza_size, pizza_suace, pizza_cheese, pizza_toppings, pizza_veggies, ordered_day, 
            submitted_status, TIMESTAMPDIFF( MINUTE,submitted_datetime,delivery_datetime) DeleiveredTime ,  
            TIMESTAMPDIFF(MINUTE,submitted_datetime, prepared_datetime) preparedTime from pizza_orders order by ordered_day;";
   
   $sql .= "select pizza_size, count(*) pizzaCount from pizza_orders where submitted_status ='Delivered' group by pizza_size;";

   $sql .= "select ordered_day, count(*) dayCount from pizza_orders group by(ordered_day) order by ordered_day";


   if (mysqli_multi_query($conn,$sql))
      {
        do
          {
          // Store first result set
          if ($result=mysqli_store_result($conn)) {
            // Fetch one and one row
            while ($row=mysqli_fetch_assoc($result))
              {
                $orderDetails[] = $row;
              }
            // Free result set
            mysqli_free_result($result);
            }
          }
        while (mysqli_next_result($conn));
      }

     



  /* $retval = mysqli_query( $conn, $sql );
   
   
   if(! $retval ) {
      die('Could not get data: ' . mysqli_error());
   }
   
    while($row = mysqli_fetch_assoc($retval)) {
            $orderDetails[] = $row;
    }*/

   echo json_encode($orderDetails);
   
   
   //echo "Fetched data successfully\n";
   
   mysqli_close($conn);
?>