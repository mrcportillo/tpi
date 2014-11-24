<?php

header('Content-type: text/html; charset=utf-8;');
$wkt =  $_GET['wkt'];
$capa = $_GET['capa'];


$link= pg_connect("host=localhost port=5432 user=user password=user dbname=Tpi");

// para ver la consulta pasando parametros wkt y capa en la url 
// $query=<<<EOD
// SELECT * FROM $capa WHERE 
// ST_Intersects(
// ST_GeomFromText(ST_AsText('$wkt'),4326),
// geom
// )
// LIMIT 100
// EOD; 

$query=<<<EOD
SELECT * FROM public."$capa" WHERE 
ST_Intersects(
ST_GeomFromText('$wkt',4326),
geom
)
LIMIT 100
EOD;


echo $query;
$result = pg_query($query);

$nro_campos = pg_num_fields($result);
$nro_registros = pg_num_rows($result);

$header = '<tr>';
while ($i < $nro_campos) { 
	$fieldName = pg_field_name($result, $i); 
	
	if($fieldName!='geom'){
		$header.= '<td>' . $fieldName .'</td>'; 
	}
	$i++; 
	
}
$header .= '</tr>';

$cuerpo='';
while ($row = pg_fetch_row($result)) { 
	$cuerpo.= '<tr>'; 
	//$count = count($row); 
	$i=0;
	while ($i < $nro_campos) { 
		 if(pg_field_name($result, $i)!='geom'){
			 $cuerpo.= '<td>' . $row[$i] . '</td>';
		}
		$i++;
	} 
	$cuerpo.= '</tr>'; 
	
}



?>
<!doctype html>
<html lang="en">
	<head>
		<style>
			body, table{
				font-family: Arial, Helvetica, sans-serif;
				font-size: 11px;			
			}
		</style>
	</head>
<body>

<h3>Nro. Registros: <?php echo $nro_registros;?></h3>
<table border=1 cellpading=0 cellspacing=0>
<?php echo $header ?>
<?php echo $cuerpo ?>
</table>
</body>
</html>