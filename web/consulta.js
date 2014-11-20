var dibujoconsulta = new ol.interaction.DragBox(
      {
          //condicion mediante la cual se activa la interaccion
	condition: ol.events.condition.shiftKeyOnly,
        //estilo del rectangulo a dibujar (dragbox)
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
		    color: [255, 255, 255, 1] //RGB
		})
	    })
      }
 );
 //agrego la interaccion al mapa
 map.addInteraction(dibujoconsulta);
 
 dibujoconsulta.on('boxend', function(evt){
     console.log('boxend', dibujoconsulta.getGeometry().getCoordinates());
     
     consultar (dibujoconsulta.getGeometry().getCoordinates());
 });
 
 
 var consultar =function(coordinate){
     console.log(coordinate);
     for (i=1;i<=(capasnombres.length-1);i++) {
         var capaSelec = document.getElementById('check_layer_'+i+'').checked;
         if (capaSelec){
            var capa = document.getElementById('check_layer_'+i+'').value;
         }
     }
    console.log(capa);
     if(coordinate.length==2){
		//es un punto [lon,lat]
		var wkt='POINT('+coordinate[0]+' ' +coordinate[1]+')';
	}else{
		//es un poligono en la forma [ [ [lon,lat],[lon,lat],....] ]
		var wkt = 'POLYGON((';
		for(var i=0;i<coordinate[0].length - 1;i++){
			wkt+=coordinate[0][i][0]+ ' ' + coordinate[0][i][1]+ ',';
		}
		wkt+=coordinate[0][0][0]+' '+coordinate[0][0][1]+'))';
	}
	console.log(wkt);
	window.open('php/consulta.php?wkt='+wkt+'&capa='+capa+'');
        return;
 };
 
 var clickEnMapa = function (evt){
    console.log(evt.coordinate);
    consultar(evt.coordinate);
 };
 
 var realizarConsulta = function(){
      //remover capas e interacciones de atributos
    map.removeInteraction(dibujoatributo);
    //remover interacciones y capas de medicion
    map.removeInteraction(dibujomedicion);
    
    map.addInteraction(dibujoconsulta);
    map.on('click', clickEnMapa);
    
 };
 