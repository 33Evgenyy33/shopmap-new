<?php
/**
 * Created by IntelliJ IDEA.
 * User: 33Evg
 * Date: 24.04.2018
 * Time: 1:23
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Магазины М.Видео на карте - API Яндекс.Карт версии 2.х Новая версия</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="http://api-maps.yandex.ru/2.1.63/?lang=ru_RU" type="text/javascript"></script>
	<script src="js.js" type="text/javascript"></script>
	<style>
		#shopconteyner {
			width: 100%;
		}

		#shops {
			float: left;
			width: 30%;
		}

		#YMapsID {
			margin-left: 40%;
			width: 60%;
			height: 600px;
		}
	</style>


</head>
<body>
<div id="searchform">
	<select id="selecttown">
		<option value="Екатеринбург">Екатеринбург</option>
		<option value="Казань">Казань</option>
		<option value="Нижний Новгород">Нижний Новгород</option>
		<option value="Пермь">Пермь</option>
		<option value="Самара">Самара</option>
		<option value="Санкт-Петербург">Санкт-Петербург</option>
	</select>
</div>

<div id="shopconteyner">
	<div id="shops"></div>
	<div id="YMapsID"></div>
</div>
</body>
</html>
