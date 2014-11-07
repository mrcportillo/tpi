<?php

header('Content-type: text/html; charset=utf-8;');
//$wkt =  $_GET['wkt'];
$capanombre = $_GET['capanombre'];


$link= pg_connect("host=localhost user=user password=user dbname=Tpi");


$queryCrear=<<<EOD
CREATE TABLE public."$capanombre"
(
nombre character varying,
geom geometry(Point,4326)
) 
WITH (
  OIDS = TRUE
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