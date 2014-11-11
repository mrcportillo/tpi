<?php

header('Content-type: text/html; charset=utf-8;');
$coordenadas =  $_GET['coordenadas'];
$capanombre = $_GET['capanombre'];
$atributo = $_GET['atributonombre'];


$link= pg_connect("host=localhost user=user password=user dbname=Tpi");

//$queryCrear="CREATE TABLE public."+capanombre+"";

$queryCrear=<<<EOD
INSERT INTO public."$capanombre"
VALUES('$atributo',ST_geomfromtext('$coordenadas',4326)
) 
;
      
EOD;


echo $queryCrear;
$result = pg_query($queryCrear);


?>
<!doctype html>
<html lang="en">
		<style>
			body, table{
				font-family: Arial, Helvetica, sans-serif;
				font-size: 11px;			
			}
		</style>
	</head>
<body>

<h3>Resultados<?php echo $result;?></h3>

</body>