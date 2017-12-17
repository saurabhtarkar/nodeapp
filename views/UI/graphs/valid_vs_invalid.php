<?php
	session_start();
	include "../dbconnect.php";
	//$sql = " select sum(Smscs.count) as count ,verifySmscs.verified as verified  from Smscs, verifySmscs group by verifySmscs.verified";
	$sql = " select sum(Smscs.count) as count ,Smscs.verified as verified  from Smscs group by Smscs.verified";
	$result = $conn->query($sql);
	$is_verified = array();
    	while($row =mysqli_fetch_assoc($result)){
        	$is_verified[] = $row;
	}
	echo json_encode($is_verified);
?>