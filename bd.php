<?php
 
$sdb_name = "localhost"; //адрес сервера базы данных, обычно  localhost
$user_name = "root"; //логин пользователя
$user_password = ""; //пароль пользователя
$db_name = "mvideo_shops"; //имя базы данных MySQL
 
// соединение с сервером базы данных
if(!$link = mysqli_connect($sdb_name, $user_name, $user_password, $db_name))
{
  echo "<br>Не могу соединиться с сервером базы данных<br>";
  exit();
}

mysqli_query($link,'SET NAMES utf8');
