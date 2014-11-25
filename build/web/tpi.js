
  //diccionario de capas
var capas = new Array();
capas[1]='actividades_agropecuarias';
capas[2]='actividades_economicas';
capas[3]='complejo_de_energia_ene';
capas[4]='curso_de_agua_hid';
capas[5]='curvas_de_nivel';
capas[6]='edif_construcciones_turisticas';
capas[7]='edif_depor_y_esparcimiento';
capas[8]='edif_educacion';
capas[9]='edificio_de_salud_ips';
capas[10]='edificio_de_seguridad_ips';
capas[11]='edificio_publico_ips';
capas[12]='edificios_ferroviarios';
capas[13]='edif_religiosos';
capas[14]='ejido';
capas[15]='espejo_de_agua_hid';
capas[16]='estructuras_portuarias';
capas[17]='infraestructura_aeroportuaria_punto';
capas[18]='infraestructura_hidro';
capas[19]='isla';
capas[20]='limite_Politico_administrativo_lim';
capas[21]='localidades';
capas[22]='l├нneas_de_conducci├│n_ene';
capas[23]='marcas_y_se├▒ales';
capas[24]='muro_embalse';
capas[25]='obra_de_comunicaci├│n';
capas[26]='obra_portuaria';
capas[27]='otras_edificaciones';
capas[28]='pais_lim';
capas[29]='provincias';
capas[30]='puente_red_vial_puntos';
capas[31]='puntos_de_alturas_topograficas';
capas[32]='puntos_del_terreno';
capas[33]='red_ferroviaria';
capas[34]='red_vial';
capas[35]='salvado_de_obstaculo';
capas[36]='se├▒alizaciones';
capas[37]='sue_congelado';
capas[38]='sue_consolidado';
capas[39]='sue_costero';
capas[40]='sue_hidromorfologico';
capas[41]='sue_no_consolidado';
capas[42]='veg_arborea';
capas[43]='veg_arbustiva';
capas[44]='veg_cultivos';
capas[45]='veg_hidrofila';
capas[46]='veg_suelo_desnudo';
capas[47]='vias_secundarias';
capas[48]='capaprueba';
var capasnombres = new Array();
capasnombres[1]='Actividades Agropecuarias';
capasnombres[2]='Actividades Economicas';
capasnombres[3]='Complejo de energia ene.';
capasnombres[4]='Curso de agua hid.';
capasnombres[5]='Curvas de nivel';
capasnombres[6]='Edificio const. turisticas';
capasnombres[7]='Edificio deporte y esparcimiento';
capasnombres[8]='Edificio educacion';
capasnombres[9]='Edificio de salud ips';
capasnombres[10]='Edificio de seguridad ips';
capasnombres[11]='Edificio publico ips';
capasnombres[12]='Edificios ferroviarios';
capasnombres[13]='Edificios religiosos';
capasnombres[14]='Ejido';
capasnombres[15]='Espejo de agua hid.';
capasnombres[16]='Estructuras portuarias';
capasnombres[17]='Infraestructura aeroportuaria';
capasnombres[18]='Infraestructura hidro.';
capasnombres[19]='Isla';
capasnombres[20]='Limite politico administrativo';
capasnombres[21]='Localidades';
capasnombres[22]='Líneas de conducción ene.';
capasnombres[23]='Marcas y señales';
capasnombres[24]='Muro embalse';
capasnombres[25]='Obra de comunicación';
capasnombres[26]='Obra portuaria';
capasnombres[27]='Otras edificaciones';
capasnombres[28]='Pais limitrofes';
capasnombres[29]='Provincias';
capasnombres[30]='Puente red vial puntos';
capasnombres[31]='Puntos de alturas topograficas';
capasnombres[32]='Puntos del terreno';
capasnombres[33]='Red ferroviaria';
capasnombres[34]='Red vial';
capasnombres[35]='Salvado de obstaculo';
capasnombres[36]='Señalizaciones';
capasnombres[37]='Sue. congelado';
capasnombres[38]='Sue. consolidado';
capasnombres[39]='Sue. costero';
capasnombres[40]='Sue. hidromorfologico';
capasnombres[41]='Sue. no consolidado';
capasnombres[42]='Veg. arborea';
capasnombres[43]='Veg. arbustiva';
capasnombres[44]='Veg. cultivos';
capasnombres[45]='Veg. hidrofila';
capasnombres[46]='Veg. suelo desnudo';
capasnombres[47]='Vias Secundarias';
capasnombres[48]='Capa Prueba';

var vectormedicion; //vector
var vectoratributo; //vector
var dibujomedicion; //interaccion
var dibujoatributo; //interaccion
var dibujoconsulta;
var visibilidad; //array de links entre layers y checkboxs
var layer = new Array();
//funcion que devuelve un arreglo de capas
var scaleLineControl = new ol.control.ScaleLine();
   
function listarcapas(){
    var i = 1;
    
    var capa = new ol.layer.Tile({
         target: map,
        title: "Global Imagery",
        source: new ol.source.TileWMS({
          url: 'http://maps.opengeo.org/geowebcache/service/wms',
          params: {
          LAYERS: 'bluemarble',
          VERSION: '1.1.1'
          }
        })
      })
/*
   
   var capa = new ol.layer.Tile({
       controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} / ({
        collapsible: false})
        }).extend([scaleLineControl]),
        
        //renderer: exampleNS.getRendererFromQueryString(),
        target: map,
         source: new ol.source.MapQuest({layer: 'sat'})
   })
   */
    layer[0] = capa;

    for (i=1;i<=48;i++) {
      var capa = new ol.layer.Image({
        visible: false,
        title: capas[i],
        source: new ol.source.ImageWMS({
        url: '/cgi-bin/qgis_mapserv.fcgi?map=/home/user/data/gisdatatpi/tpi.qgs',

        //url: '/cgi-bin/qgis_mapserv.fcgi?map=/home/user/proyectoqgislaboratorioqgis.qgs',
        params: {LAYERS: capas[i]}
        })
      })

  layer[i] = capa;

  }
  return layer;


}
    // definicion del mapa

var map = new ol.Map({
    controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
    }).extend([
        scaleLineControl
    ]),
    //renderer: exampleNS.getRendererFromQueryString(),
    target: 'map',
    layers: listarcapas(),
    view: new ol.View({
      projection: 'EPSG:4326',
      //center: [-59, -27.5],
      //zoom: 4
      center: [-59, -27.5],
    zoom: 4
    })
});
    
cargarpanel(); 
//funcion que agrega capas al panel y asocia su checkbox
function leyenda(){      
    var srcpanel="<h3>Leyendas</h3><br/>";

    var node = document.getElementById('panelactivo');
        for (i=1;i<=(layer.length-1);i++) {
            var visibilida = (document.getElementById('check_layer_'+i+''));
        
            if (visibilida.checked){
                srcpanel = srcpanel + "<image src='http://localhost/cgi-bin/qgis_mapserv.fcgi?map=/home/user/data/gisdatatpi/tpi.qgs&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYERS="+layer[i].p.title+"'/><br/>";
                
        }
    }
        node.innerHTML= srcpanel;      
}
function cargarpanel(){
    visibilidad = new Array();
    var node = document.getElementById('panel');
    str1 = '<h3>Capas</h3><br/>';
    //generar el string con codigo html para definir la seccion de capas
    for (i=1;i<=(capasnombres.length-1);i++) {
        str1 = str1+'<input type="checkbox" onClick="leyenda(this)" id="check_layer_'+i+'"><label for="check_layer_'+i+'">'+capasnombres[i]+'</label><br/>';

    }
    //insertar el string en el documento html
    node.innerHTML= str1;
    //arreglo de visibilidad
    for (i=1;i<=(layer.length-1);i++) {
        var visibilida = new ol.dom.Input(document.getElementById('check_layer_'+i+''));
        //creo un enlace entre el checkbox y mi capa
        //(propiedad del input, objeto, propiedad del objeto)
       // visibilida.bindTo('checked', map.getLayers().item(i), 'visible');
        visibilida.bindTo('checked', layer[i], 'visible');
        
        visibilidad[i]=visibilida;
    }
}
function medir(){
    //remover capas y interacciones
    map.removeInteraction(dibujoatributo);
    map.removeInteraction(dibujoconsulta);
    //map.removeLayer(vectoratributo);
    var source = new ol.source.Vector();
    vectormedicion = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
    /**
    * Currently drawed feature
    * @type {ol.Feature}
    */
   map.addLayer(vectormedicion);
    var sketch;
    /**
    * Element for currently drawed feature
     * @type {Element}
                         */
    var sketchElement;


    /**
     * handle pointer move
     * @param {Event} evt
     */
    var mouseMoveHandler = function(evt) {
      if (sketch) {
        var output;
        var geom = (sketch.getGeometry());

          output = formatLength( /** @type {ol.geom.LineString} */ (geom));

        sketchElement.innerHTML = output;
      }
    };

    

    $(map.getViewport()).on('mousemove', mouseMoveHandler);

    //map.addEventListener('click',mouseMoveHandler);
    //map.addEventListener('mousemove', mouseMoveHandler);


    //var typeSelect = document.getElementById('type');

    function addInteraction() {
        var type = "LineString";
        dibujomedicion = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type)
        });
        map.addInteraction(dibujomedicion);

        dibujomedicion.on('drawstart',
        function(evt) {
            //set sketch
            sketch = evt.feature;
            
            sketchElement = document.createElement('li');
            sketchElement.setAttribute("class", "panel-footer");
            var outputList = document.getElementById('measureOutput');
            if (outputList.childNodes) {
                outputList.insertBefore(sketchElement, outputList.firstChild);
            } else {
                outputList.appendChild(sketchElement);
            }
         
        }, this);

        dibujomedicion.on('drawend',
            function(evt) {
                // unset sketch
                sketch = null;
                sketchElement = null;
            }, this);
    } 
    /**
     * Let user change the geometry type.
     * @param {Event} e Change event.
     */
    /*typeSelect.onchange = function(e) {
      map.removeInteraction(draw);
      addInteraction();
    };*/


    /**
     * format length output
     * @param {ol.geom.LineString} line
     * @return {string}
     */
    var formatLength = function(line) {
        var length = Math.round(line.getLength() * 150000);
        //var length = Math.round(line.getLength() * 100) / 100;
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
       } else {
            output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
        }
        return output;
    };
    addInteraction();

    

};


//funcion que agrega capa a la bd y al listado de capas
function agregarelemento() {
    capanuevanombre = $("#crearcapa").find('input[name="texto"]').val();
    console.log(capanuevanombre);
    window.open('php/crearcapa.php?capanombre='+capanuevanombre);
    var capa = new ol.layer.Image({
        visible: true,
        title: capanuevanombre,
        source: new ol.source.ImageWMS({
            url: '/cgi-bin/qgis_mapserv.fcgi?map=/home/user/data/gisdatatpi/tpi.qgs',
            //url: '/cgi-bin/qgis_mapserv.fcgi?map=/home/user/proyectoqgislaboratorioqgis.qgs',
            params: {LAYERS: capanuevanombre}
        })
    })
    //map.addLayer(capa);
    layer[layer.length] = capa;
    capasnombres[capasnombres.length] = capanuevanombre;
    capas[capas.length] = capanuevanombre;
    
}


//funcion que agrega capa a la bd y al listado de capas


    var dialog;
    var form;
   dialog = $( "#crearcapa" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        agregarcapa: function() {
        agregarelemento(),
        dialog.dialog( "close" );   
        

    },
        Cancelar: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        dialog.dialog( "close" );
      }
    });





//funcion que muestra el texbox para introducir el nombre de la capa
function agregarcapa(){
    //remover capas e interacciones de atributos
    map.removeInteraction(dibujoatributo);
    //remover interacciones y capas de medicion
    map.removeInteraction(dibujomedicion);
    map.removeLayer(vectormedicion);
    dialog.dialog( "open" );

 
}


var dialog2;
var form2;
dialog2 = $( "#agregarelementocapa" ).dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
    agregarelementoacapa: function() {
        
        agregaratributocapa(),
        dialog2.dialog( "close" );   
    },
    Cancelar: function() {
        dialog2.dialog( "close" );
    }
    },
    close: function() {
        dialog2.dialog( "close" );
    }
});


var coordenadas;
function agregarelementocapa(){
    //remover interacciones y capas de medicion
    map.removeInteraction(dibujomedicion);
    map.removeInteraction(dibujoconsulta);
    map.removeLayer(vectormedicion);
    
    var source = new ol.source.Vector();
    vectoratributo = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
      
    });    
    function addInteraction() {
        var type = "Point";
        dibujoatributo = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type)
        });
        
        map.addInteraction(dibujoatributo);  
        dibujoatributo.on('drawend',
                          function(evt) {
                            // unset sketch
                            wkt = 'POINT';
                            dialog2.dialog( "open" );;
                                         

                          }, this);
    }
    
    addInteraction();
    map.on('click', function(evt) {
        var coordenadaspunto = evt.coordinate;
        coordenadas='POINT('+coordenadaspunto[0]+' ' +coordenadaspunto[1]+')';
        

    });
    
    var node = document.getElementById('agregarelementocapa');
    var str ='<label>nombre</label><input id="atributocapa" type="text"/><select id="nombrecapaatributo">';

    //generar el string con codigo html para definir la seccion de capas
    for (i=1;i<=(capasnombres.length-1);i++) {
        str = str+'<option value='+i+'>'+capasnombres[i]+'</option>';

    }
    str = str + '</select>';
    //insertar el string en el documento html
    node.innerHTML= str;

                    
                    
                    
                    
}

function agregarpoligonocapa(){
    var source = new ol.source.Vector();
    vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
      
    });    
    var draw; // global so we can remove it later
    function addInteraction() {
        var type = "Polygon";
        draw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type)
        });
        
        map.addInteraction(draw);  
        draw.on('drawend',
                          function(evt) {
                            // unset sketch
                            wkt = 'POLYGON';
                            dialog2.dialog( "open" );;
                                         

                          }, this);
    }
    
    addInteraction();
    map.addLayer(vector);
    layer[layer.length]=vector;
    map.on('click', function(evt) {
        var coordenadaspunto = evt.coordinate;
        coordenadas='POLYGON('+coordenadaspunto[0]+' ' +coordenadaspunto[1]+')'
        

    });
    var node = document.getElementById('agregarelementocapa');
    var str ='<label>nombre</label><input id="atributocapa" type="text"/><select id="nombrecapaatributo">';

    //generar el string con codigo html para definir la seccion de capas
    for (i=1;i<=(capasnombres.length-1);i++) {
        str = str+'<option value='+i+'>'+capasnombres[i]+'</option>';

    }
    str = str + '</select>';
    //insertar el string en el documento html
    node.innerHTML= str;

                    
                    
                    
                    
}








function agregaratributocapa(){
    
    
    atributonombre = document.getElementById('atributocapa').value;
    atributocapa = document.getElementById('nombrecapaatributo');
    
   
   
    console.log(capas[atributocapa.value]);
    console.log(atributocapa.value);
    window.open('php/agregaratributoscapa.php?capanombre='+capas[atributocapa.value]+'&atributonombre='+atributonombre+'&coordenadas='+coordenadas);
       // window.open('php/agregaratributoscapa.php?capanombre=capaprueba&atributonombre='+atributonombre+'&coordenadas='+coordenadas);
    
    
    
}
   
dibujoconsulta = new ol.interaction.DragBox(
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
 //map.addInteraction(dibujoconsulta);
 
 dibujoconsulta.on('boxend', function(evt){
     
     consultar (dibujoconsulta.getGeometry().getCoordinates());
 });
 
 
 var consultar =function(coordinate){
     console.log(coordinate);
     for (i=1;i<=(capasnombres.length-1);i++) {
         var capaSelec = document.getElementById('check_layer_'+i+'').checked;
         if (capaSelec){
            var capa = capas[i];
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
    consultar(evt.coordinate);
 };
 
 var realizarConsulta = function(){
      //remover capas e interacciones de atributos
    map.removeInteraction(dibujoatributo);
    //remover interacciones y capas de medicion
    map.removeInteraction(dibujomedicion);
    map.removeLayer(vectormedicion);
    
    map.addInteraction(dibujoconsulta);
    //map.on('click', clickEnMapa);
    
 };
 
