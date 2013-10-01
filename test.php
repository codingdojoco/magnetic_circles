	<form action="" method="post">
		<input type="text" name="email" />
		<input type="password" name="password" />
		<input type="submit" value="Submit" />
	</form>


<?php

	//Assume that in the login page, user posted email and password

	$email = mysql_real_escape_string($_POST['email']);
	$password = mysql_real_escape_string($_POST['password']);

	$query = "SELECT * FROM users WHERE email = '{$email}' AND password = '{$password}'";

	echo $query;
	die();

	$num_rows_returned = num_of_rows($query);
	if($num_rows_returns == 1)
	{
		echo "correct login info!";
	}
	else
	{
		echo "incorrect login info!";
	}