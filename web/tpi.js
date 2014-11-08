
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

    //funcion que devuelve un arreglo de capas

    var layer = new Array();
    function listarcapas(){
        var i = 1;
        var capa = new ol.layer.Tile({
            title: "Global Imagery",
            source: new ol.source.TileWMS({
              url: 'http://maps.opengeo.org/geowebcache/service/wms',
              params: {
              LAYERS: 'bluemarble',
              VERSION: '1.1.1'
              }
            })
          })

        layer[0] = capa;

        for (i=1;i<=47;i++) {
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
        target: 'map',
        interactions:[],
        layers: listarcapas(),
        view: new ol.View({
          projection: 'EPSG:4326',
          center: [-59, -27.5],
          zoom: 4
        })
    });

    var node = document.getElementById('panel');
    str1 = '<h3>Capas</h3><br/>';
    //generar el string con codigo html para definir la seccion de capas
    for (i=1;i<=47;i++) {
        str1 = str1+'<input type="checkbox" id="check_layer_'+i+'"><label for="check_layer_'+i+'">'+capas[i]+'</label><br/>';

    }
    //insertar el string en el documento html
    node.innerHTML= str1;
    //arreglo de visibilidad

    var visibilidad = new Array();
    for (i=1;i<=47;i++) {
        var visibilida = new ol.dom.Input(document.getElementById('check_layer_'+i+''));
        //creo un enlace entre el checkbox y mi capa
        //(propiedad del input, objeto, propiedad del objeto)
        visibilida.bindTo('checked', map.getLayers().item(i), 'visible');
        visibilidad[i]=visibilida;

    }


function medir(){
    var source = new ol.source.Vector();
    var vector = new ol.layer.Vector({
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
          console.log(output);

        sketchElement.innerHTML = output;
      }
    };

    //EL DRAMA ESTA ACA ABAJO. EL EVENTO MOUSEMOVE ES DE JQUERY. PROBABLEMENTE SI LO INCLUIS SOLUCIONAS
    // PROBLEMA. AHI ANDA CON CADA CLICK.

    map.addEventListener('click',mouseMoveHandler);
    //map.addEventListener('mousemove', mouseMoveHandler);


    //var typeSelect = document.getElementById('type');

    var draw; // global so we can remove it later
    function addInteraction() {
        var type = "LineString";
        draw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type)
        });
        map.addInteraction(draw);

        draw.on('drawstart',
        function(evt) {
            //set sketch
            sketch = evt.feature;
            sketchElement = document.createElement('li');
            var outputList = document.getElementById('measureOutput');
            if (outputList.childNodes) {
                outputList.insertBefore(sketchElement, outputList.firstChild);
            } else {
                outputList.appendChild(sketchElement);
            }
        }, this);

        draw.on('drawend',
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




function agregarCapa(){
    var source = new ol.source.Vector();
    var vector = new ol.layer.Vector({
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
        var type = "Point";
        draw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type)
        });
        map.addInteraction(draw);
        draw.on('drawend',
        function(evt) {
            // unset sketch
            wkt = 'POINT';
        }, this);
    }
    
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
    layer[layer.length+1] = capa;
    addInteraction();



}

function agregarElemento() {



}








 var consultar = function(coordinate){


  console.log(coordinate);
  if(coordinate.length==2){
    //es un punto [lon,lat]
    var wkt='POINT('+coordinate[0]+' ' +coordinate[1]+')';
  }else{
    //es un poligono en la forma [ [ [lon,lat],[lon,lat],....] ]
    var wkt = 'POLYGON((';
    for(var i=0;i<coordinate[0].length - 1;i++){
      wkt+=coordinate[0][i][0]+ ' ' + coordinate[0][i][1]+ ',';
    }
    wkt+=coordinate[0][0][0]+' '+coordinate[0][0][1]+'))'
  }
  console.log(wkt);
  //+ '&'capa?='capa'+capa //
  window.open('php/crearcapa.php?wkt='+wkt);return;
  };


   var clickEnMapa = function(evt){
  console.log(evt.coordinate);

  consultar(evt.coordinate);
      };

      //function para "cambiar" de interaction en function del value de los radios
      var seleccionarControl = function(el){
        if(el.value=="consulta"){
    map.addInteraction(selectInteraction);
    map.on('click',clickEnMapa);

  }else if(el.value=="navegacion"){
    map.removeInteraction(selectInteraction);
    map.un('click',clickEnMapa);
  }
  console.log(el.value);
      };













