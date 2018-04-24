<?php


$town          = $_POST['town'];
file_put_contents( "cart_items.txt", print_r( $town, true ) . "\r\n", FILE_APPEND | LOCK_EX );

$sdb_name      = "127.0.0.1"; //адрес сервера базы данных, обычно  localhost
$user_name     = "root"; //логин пользователя
$user_password = ""; //пароль пользователя
$db_name       = "mvideo_shops"; //имя базы данных MySQL
$link          = mysqli_connect( $sdb_name, $user_name, $user_password, $db_name );

$query1  = "SELECT * FROM mvideo_shops where  town='$town' ORDER BY address";
$result1 = mysqli_query( $link, $query1 );

if ( mysqli_num_rows( $result1 ) > 0 ) {
	while ( $par1 = mysqli_fetch_assoc( $result1 ) ) {

		$addressshop[] = array(
			"id" => $par1['id'],

			"town" => $par1['town'],

			"address" => $par1['address'],

			"lat" => $par1['lat'],

			"lon" => $par1['lon'],

			"rrab" => $par1['grafrab']
		);

	}


	$json = json_encode( $addressshop );

	echo $json;

}
?>