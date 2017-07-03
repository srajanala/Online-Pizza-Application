 <?php  
 //insert.php  
 
 echo "Invoked file"; 
 $connect = mysqli_connect("localhost","root","mysql","pizza");  
 $data = json_decode(file_get_contents("php://input"));  
 if(count($data) > 0)  
 {  
   
    $pizzaId = mysqli_real_escape_string($connect, $data->pizzaId); 
    $pizzaIdConvert = intval($pizzaId);     
      $pizzaStatus = mysqli_real_escape_string($connect, $data->pizzaStatus);

  if($pizzaStatus == "Prepared"){
      $query = "UPDATE pizza_orders set submitted_status = '$pizzaStatus' , prepared_datetime=now() where pizzaId='$pizzaIdConvert'";
   }elseif ($pizzaStatus == "Delivered") {
     $query = "UPDATE pizza_orders set submitted_status = '$pizzaStatus', delivery_datetime=now() where pizzaId='$pizzaIdConvert'";
   } else{
      $query = "UPDATE pizza_orders set submitted_status = '$pizzaStatus' where pizzaId='$pizzaIdConvert'";
   }  
      if(mysqli_query($connect, $query))  
      {  
           echo "Updated Successfully...";  
      }  
      else  
      {  
           echo 'Error In Insertion';  
      
      }  
 }  

 mysqli_close($connect);
 ?>  