<?php
	$arr = $_REQUEST;  
	$name = $arr['username'];
	$pwd = $arr['password'];

	echo json_encode(array('name'=>$name, 'pwd'=>$pwd));
?>