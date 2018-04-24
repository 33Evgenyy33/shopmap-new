<?php


$town          = $_POST['town'];

$sdb_name      = "127.0.0.1"; //адрес сервера базы данных, обычно  localhost
$user_name     = "root"; //логин пользователя
$user_password = ""; //пароль пользователя
$db_name       = "mvideo_shops"; //имя базы данных MySQL
$link          = mysqli_connect( $sdb_name, $user_name, $user_password, $db_name );

$query1  = "SELECT * FROM mvideo_shops where  town='$town' ORDER BY address";
$result1 = mysqli_query( $link, $query1 );

if ( mysqli_num_rows( $result1 ) > 0 ) {

	$addressshop = array();
	$addressshop['type'] = 'FeatureCollection';
	$i_id = 0;
	while ( $par1 = mysqli_fetch_assoc( $result1 ) ) {

		$addressshop['features'][] = array(
			"type" => "Feature",
			"id"=> intval($par1['id']),
			"geometry" => array (
				"type" => "Point",
				"coordinates" => [floatval($par1['lon']), floatval($par1['lat'])]
			),
			"properties" => array (
				"balloonContentHeader" => "<div style='color:#ff0303;font-weight:bold'> {$par1["address"]} </div>",
				"balloonContentBody" => "<div style='font-size:13px;'><div><strong>Адрес:</strong> {$par1["address"]}<br><strong>Режим работы:</strong>{$par1["grafrab"]}<br></div></div>",
			)
		);

		$addressshop['address'][] = array('id' => intval($par1['id']), 'city' => $par1['town'], 'address'=> $par1['address'], 'lat' => $par1['lat'], 'lon' => $par1['lon']);

//		$addressshop['features'][] = array(
//			"id" => $i_id,
//
//			"town" => $par1['town'],
//
//			"address" => $par1['address'],
//
//			"lat" => $par1['lat'],
//
//			"lon" => $par1['lon'],
//
//			"rrab" => $par1['grafrab']
//		);

		$i_id++;
	}

	$json = json_encode( $addressshop, JSON_UNESCAPED_UNICODE);

//	file_put_contents( __DIR__."/json.txt", print_r( $json, true ) . "\r\n", FILE_APPEND | LOCK_EX );


	echo $json;

}
?>