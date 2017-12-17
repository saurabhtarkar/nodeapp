<?php
	session_start();
	$smsc=$_GET['smsc'];
	//$smsc= "+9198478378939999";
	//Number of Ideas submitted unitwise
	include "../dbconnect.php";
	$sql = "select imsi as imsi ,sum(count) as count from Smscs where smsc=$smsc group by imsi";
	$result = $conn->query($sql);
	$imsiarray = array();
	while($row =mysqli_fetch_assoc($result)){
		$imsiarray[] = $row;}
	echo json_encode($imsiarray);
?>

