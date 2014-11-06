    
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
        //interactions:[],
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