<?php
	echo $_POST["email"];
?>

<HTML>
	<HEAD><TITLE>Pub-Sub</TITLE></HEAD>
	<BODY>
		<FORM action="#" method="post">
			Full Name:</br>
			<input type="text" name="name"></br>
			Email:</br>
			<input type="email" name="email"></br>
			Username:</br>
			<input type="text" name="username"><a>Check availability</a><br>
			Role:</br>
			<select name="role">
				<option value="pub">Publisher</option>
				<option value="sub">Subscriber</option>
			</select></br>
			Create Password:</br>
			<input type="password" name="password"></br>
			Re-enter Password:</br>
			<input type="password" name="confirmPassword"></br>
			<input type="submit">
		</FORM>
	</BODY>
</HTML>