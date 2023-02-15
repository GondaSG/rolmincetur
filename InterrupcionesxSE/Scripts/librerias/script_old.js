// JavaScript Document
	dojo.require("esri.map");
	dojo.require("esri.toolbars.navigation");
	dojo.require("esri.layers.FeatureLayer");	
	dojo.require("esri.dijit.BasemapGallery");
	dojo.require("esri.arcgis.utils");
	dojo.require("esri.graphic");
	dojo.require("esri.graphicsUtils");
	dojo.require("esri.lang");
	
	dojo.require("esri.symbols.Symbol");	
	dojo.require("esri.symbols.FillSymbol");		
	dojo.require("esri.symbols.LineSymbol");	
	
	//dojo.require("esri.symbols.SimpleFillSymbol");
	//dojo.require("esri.symbols.SimpleLineSymbol");
	//dojo.require("esri.symbols.SimpleMarkerSymbol"); 
	//dojo.require("esri.Color");
	dojo.require("esri.geometry.Circle");
	
	dojo.require("esri.InfoTemplate");
    dojo.require("esri.arcgis.utils");
    dojo.require("esri.dijit.Scalebar");
	dojo.require("esri.tasks.query");
	dojo.require("esri.tasks.QueryTask");	
	dojo.require("esri.tasks.GeometryService");	
	dojo.require("esri.tasks.geometry");
    dojo.require("esri.toolbars.draw");
	dojo.require("esri.tasks.BufferParameters");
	dojo.require("esri.geometry.Geometry");
	dojo.require("esri.geometry.Point");
	dojo.require("esri.symbols.MarkerSymbol");
	dojo.require("esri.symbols.PictureMarkerSymbol");
	dojo.require("esri.layers.GraphicsLayer");
	dojo.require("esri.tasks.AreasAndLengthsParameters");
	dojo.require("esri.dijit.Legend");
	

	dojo.require("dijit.form.Button");
	dojo.require("dijit.form.Select");
	dojo.require("dijit.form.HorizontalSlider");
	dojo.require("dijit.Toolbar");	
	dojo.require("dijit.layout.BorderContainer");
	dojo.require("dijit.layout.ContentPane");
	dojo.require("dijit.TitlePane");
	dojo.require("dijit.form.CheckBox");
	dojo.require("dijit.TooltipDialog");
	dojo.require("dijit.popup");
	dojo.require("dijit.registry");
	dojo.require("dijit.Dialog");
	dojo.require("agsjs.dijit.TOC");
	dojo.require("dojox.layout.FloatingPane");

	dojo.require("dojo._base.Color");
	dojo.require("dojo.number");
	dojo.require("dojo.parser");
	dojo.require("dojo.dom");
	dojo.require("dojo._base.lang");
	dojo.require("dojo._base.array");	
	dojo.require("dojo._base.declare");		
	dojo.require("dojo.store.Memory");	
	dojo.require("dojo.dom-style");	
	
	dojo.require("esri.layers.ArcGISImageServiceLayer");	
	dojo.require("esri.layers.ImageServiceParameters");		    

	dojo.require("dojo.has");	
	dojo.require("dojo._base.sniff");	
	
	dojo.require('dojox.grid.DataGrid');
	dojo.require('dojo.data.ItemFileWriteStore');

	dojo.require("dojox.widget.Standby");
	dojo.require("esri/geometry/Circle");
	
	dojo.require("dojo.domReady!");


	var map, navToolbar, toolbar, basemapGallery, highlightSymbol, highlightSymbol1, lengthParams, areaParams, symbol_Buffer, symbol_radio, featureSelected, legendDijit, toc, featLayer1,toc1;
	var layers = new Array();
	var loading, loadingSuperGeo, loadingSearch;
	var xMin, yMin, xMax, yMax;
	var swExtend = false;
	var gwkid = 102100;
	var tooltipLayers = new Array();
	var infoTitle = new Array();
	var infoContent = new Array();
	var swIdentify = true;
	//var urlSVR = "http://sigda.cultura.gob.pe:6080/arcgis/rest/services/MAPs/MapServer/";
	var urlSVR = "http://sigda.cultura.gob.pe/arcgis/rest/services/sigda/MAPsDesa/MapServer/";
	var urlSVR1 = "http://192.168.56.88:6080/arcgis/rest/services/geocultura/SrvGeocultura/MapServer/";
	//var urlSVR1 = "https://arcgisest.cultura.gob.pe:6443/arcgis/rest/services/geocultura/SrvGeocultura/MapServer/";
	var urlSVR2 = "http://sigda.cultura.gob.pe/arcgis/rest/services/sigda/Museo/MapServer/";
	//var urlSVR2 = "http://localhost:6080/arcgis/rest/services/geocultura/SrvGeocultura/MapServer/";
	var imgPoint = "http://sigda.cultura.gob.pe:8080/images/buffer_point.png";
	var imgmuseo = "http://repositorioarchivos.cultura.gob.pe/rnm_files/fotos/";
	var geometryService;
	var swBuffer = false;
	var isMeasureLine = true;
	var winData = -1;
	function init() {
		geometryService = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
		
		loading = new dojox.widget.Standby({ target:'sbBuffer', color:'#F3F3F3', image:'images/loading.gif'});
		dojo.body().appendChild(loading.domNode);
		loading.startup();
		
		loadingSuperGeo = new dojox.widget.Standby({ target:'sbShape', color:'#F3F3F3', image:'images/loading.gif'});		
		dojo.body().appendChild(loadingSuperGeo.domNode);
		loadingSuperGeo.startup();
		
		loadingSearch = new dojox.widget.Standby({ target:'sbSearch', color:'#F3F3F3', image:'images/loading.gif'});		
		dojo.body().appendChild(loadingSearch.domNode);
		loadingSearch.startup();				
		
		var lods = [
	  {"level" : 0, "resolution" : 156543.033928, "scale" : 591657527.591555},
	  {"level" : 1, "resolution" : 78271.5169639999, "scale" : 295828763.795777},
	  {"level" : 2, "resolution" : 39135.7584820001, "scale" : 147914381.897889},
	  {"level" : 3, "resolution" : 19567.8792409999, "scale" : 73957190.948944},
	  {"level" : 4, "resolution" : 9783.93962049996, "scale" : 36978595.474472},
	  
	  {"level" : 5, "resolution" : 4891.96981024998, "scale" : 18489297.73724},
	  {"level" : 6, "resolution" : 2445.98490512499, "scale" : 9244648.86862},
	  {"level" : 7, "resolution" : 1222.99245256249, "scale" : 4622324.43431},
	  {"level" : 8, "resolution" : 611.49622628125, "scale" : 2311162.21715},
	  {"level" : 9, "resolution" : 305.74811314062, "scale" : 1155581.10858},
	  {"level" : 10, "resolution" : 152.87405657031, "scale" : 577790.55429},
	  {"level" : 11, "resolution" : 76.43702828516, "scale" : 288895.27714},
	  {"level" : 12, "resolution" : 38.21851414258, "scale" : 144447.63857},
	  {"level" : 13, "resolution" : 19.10925707129, "scale" : 72223.81929},
	  {"level" : 14, "resolution" : 9.55462853564, "scale" : 36111.90964},
	  {"level" : 15, "resolution" : 4.77731426782, "scale" : 18055.95482},
	  {"level" : 16, "resolution" : 2.38865713391, "scale" : 9027.97741},
	  {"level" : 17, "resolution" : 1.19432856696, "scale" : 4513.98871},
	  {"level" : 18, "resolution" : 0.59716428348, "scale" : 2256.99435},
	  {"level" : 19, "resolution" : 0.29858214174, "scale" : 1128.49718},
	  
	  {"level" : 20, "resolution" : 0.14929107087, "scale" : 564.24859},
	  {"level" : 21, "resolution" : 0.07464553543, "scale" : 282.12429},
	  {"level" : 22, "resolution" : 0.03732276772, "scale" : 141.06215},
	  {"level" : 23, "resolution" : 0.01866138386, "scale" : 70.53107}
	  
	];
		
		
		map = new esri.Map("map", {
			basemap: "hybrid",
			center: [-74.049, -9.485],
			zoom: 6,
			lods: lods,
            sliderStyle: "large"
		});
		
		var scalebar = new esri.dijit.Scalebar({
			map: map,
			scalebarUnit: "dual"
		});
 
		layers[0] = new esri.layers.FeatureLayer(urlSVR1+"0",{
		                                    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
											outFields: ["*"]
											//opacity : 1
										  });
							//tooltipLayers[0] = "<b>Museos:</b><br><b>Nombre : </b>${nombre}" <img src="images/SIGDA2.png"> 
		tooltipLayers[0] = "<b>Museos: </b>${SNOMBREMUS}"
		infoTitle[0] = "Informaci&oacute;n del Museo:"
		var cod0 = '+${OBJECTID}+';
		
		layers[0].on("mouse-over", function (evt){
											 	showTooltip(evt, 0);
														var id = evt.graphic.attributes.NCODIGOMUS;
														//alert(id);
												
												$.post( "museo.php", { id: id }).done(function( data ) {

													
												if(data != 0){
													//alert(data);
													//var d = JSON.parse(data);
													$("#script").html(data);
												}
												}
												);
												
												
											});
		layers[0].on("click", function (evt) {
											    if (swIdentify) {
											        //showInfo(evt, 0);
                                                    //zoomfeature(0, evt.graphic.attributes.NCODIGOMUS);
											        //showInfo(evt, 0);
                                                }
												
												
											
											  showInfo(evt, 0);
											});				

		layers[1] = new esri.layers.FeatureLayer(urlSVR1+"2",{
											mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
											outFields: ["*"],
											opacity : 1
										  });
		tooltipLayers[1] = "<b>Archivos: </b>${titulo}"
		infoTitle[1] = "Informaci&oacute;n del Archivo:"
		
		
		layers[1].on("mouse-over", function (evt){
												var id = evt.graphic.attributes.OBJECTID;
														//alert(id);
												
												$.post( "archivo.php", { id: id }).done(function( data ) {

													
												if(data != 0){
													
													//var d = JSON.parse(data);
													$("#script").html(data);
												}
												}
												);
					
											 	showTooltip(evt, 1);
												
											 });
		layers[1].on("click", function (evt){
												if (swIdentify)
												{
													showInfo(evt, 1);
												}																								
								 });

		//layers[2] = new esri.layers.FeatureLayer(urlSVR + "2", {
        layers[2] = new esri.layers.FeatureLayer(urlSVR1 + "3", {
                                            mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                                            //infoTemplate: new esri.InfoTemplate("Nombre: ${NOMBRE}", "${*}"),
											outFields: ["*"]
											//opacity : 1
										  });
							//tooltipLayers[2] = "<b>MAPs</b><br><b>Nombre : </b>${nomb_map}";
		tooltipLayers[2] = "<b>Centro / Organizacion Cultural: </b>${titulo}";
		infoTitle[2] = "Centro / Organizacion Cultural:"
		
		layers[2].on("mouse-over", function (evt){
			
											var id = evt.graphic.attributes.OBJECTID;
														//alert(id);
												
												$.post( "organizacion.php", { id: id }).done(function( data ) {

													
												if(data != 0){
													//alert(data);
													//var d = JSON.parse(data);
													$("#script").html(data);
												}
												}
												);
			
											 	showTooltip(evt, 2);			
											 });
		layers[2].on("click", function (evt){
												if (swIdentify)
												{
													showInfo(evt, 2);
												}																								
										 });
        
		layers[3] = new esri.layers.FeatureLayer(urlSVR1 + "4", {
        //layers[3] = new esri.layers.FeatureLayer(urlSVR2 + "0", {
		                        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
		                        outFields: ["*"],
								opacity : 0.6
				});
		tooltipLayers[3] = "<b>Editoriales: </b>${titulo}";
		infoTitle[3] = "Editoriales:"
		//var html_yr_3 = '<div style="height:25px"><div style="float: left; width:25%"><b>Codigo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${OBJECTID}</div></div>';
		var  html_yr_3 = '<div style="height:25px"><div style="float: left; width:25%"><b>Rason Social</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${razonsocia}</div></div>';
		    html_yr_3 += '<div style="height:25px"><div style="float: left; width:25%"><b>Tematica</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${tematica}</div></div>';
		    html_yr_3 += '<div style="height:25px"><div style="float: left; width:25%"><b>Direccion</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${direccion}</div></div>';
		    html_yr_3 += '<div style="height:25px"><div style="float: left; width:25%"><b>Telefono</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${telf}</div></div>';
		    html_yr_3 += '<div style="height:25px"><div style="float: left; width:25%"><b>Url</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${url}</div></div>';
		    html_yr_3 += '<div style="height:25px"><div style="float: left; width:25%"><b>Email</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${email}</div></div>';
		    html_yr_3 += '<div style="height:25px"><div style="float: left; width:25%"><b>Fuente</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${fuente}</div></div>';
		infoContent[3] = html_yr_3;
		layers[3].on("mouse-over", function (evt) {
		    showTooltip(evt, 3);
		});
		layers[3].on("click", function (evt) {
		    if (swIdentify) {
		        showInfo(evt, 3);
		    }
		});
		layers[4] = new esri.layers.FeatureLayer(urlSVR1 + "5", {
							    //layers[3] = new esri.layers.FeatureLayer(urlSVR2 + "0", {
		                        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
		                        outFields: ["*"]
							    //opacity: 0.6
							});
		tooltipLayers[4] = "<b>Escuelas de Arte: </b>${titulo}";
		infoTitle[4] = "Escuelas de Arte:"
		
		layers[4].on("mouse-over", function (evt) {
		    showTooltip(evt, 4);
			
			var id = evt.graphic.attributes.OBJECTID;
														//alert(id);
												
												$.post( "escuelas.php", { id: id }).done(function( data ) {

													
												if(data != 0){
													//alert(data);
													//var d = JSON.parse(data);
													$("#script").html(data);
												}
												}
												);
		});
		layers[4].on("click", function (evt) {
		    if (swIdentify) {
		        showInfo(evt, 4);
		    }
		});
        layers[5] = new esri.layers.FeatureLayer(urlSVR1 + "6", {
							    //layers[3] = new esri.layers.FeatureLayer(urlSVR2 + "0", {
          				        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
          				        outFields: ["*"],
                                opacity: 0.6
							});
        tooltipLayers[5] = "<b>Galerias: </b>${titulo}";
        infoTitle[5] = "Galeria:"
       
        layers[5].on("mouse-over", function (evt) {
            showTooltip(evt, 5);
			
			var id = evt.graphic.attributes.OBJECTID;
			
			$.post( "galeria.php", { id: id }).done(function( data ) {

													
												if(data != 0){
													//alert(data);
													//var d = JSON.parse(data);
													$("#script").html(data);
												}
												}
												);
        });
        layers[5].on("click", function (evt) {
            if (swIdentify) {
                showInfo(evt, 5);
            }
        })
		layers[6] = new esri.layers.FeatureLayer(urlSVR1 + "7", {
							    //layers[3] = new esri.layers.FeatureLayer(urlSVR2 + "0", {
		                        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
		                        outFields: ["*"]
							    //opacity: 0.6
					});
		tooltipLayers[6] = "<b>Librerias: </b>${nombre}";
		infoTitle[6] = "Librerias:"
		//var html_yr_6 = '<div style="height:25px"><div style="float: left; width:25%"><b>Codigo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${OBJECTID}</div></div>';
		var html_yr_6 = '<div style="height:25px"><div style="float: left; width:25%"><b>Nombre</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nombre}</div></div>';
		html_yr_6 += '<div style="height:25px"><div style="float: left; width:25%"><b>Tipo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${tipo_admin}</div></div>';
		html_yr_6 += '<div style="height:25px"><div style="float: left; width:25%"><b>Direccion</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${direccion}</div></div>';
		html_yr_6 += '<div style="height:25px"><div style="float: left; width:25%"><b>Ubicación</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nomdep} - ${nomprov} - ${nomdist}</div></div>';
		html_yr_6 += '<div style="height:25px"><div style="float: left; width:25%"><b>Telefono</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${telef}</div></div>';
		
		html_yr_6 += '<div style="height:25px"><div style="float: left; width:25%"><b>Email</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${email}</div></div>';
		
		html_yr_6 += '<div style="height:25px"><div style="float: left; width:25%"><b>Web</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${web}</div></div>';
		
		html_yr_6 += '<div style="height:25px"><div style="float: left; width:25%"><b>Descripcion</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${descrip}</div></div>';
        infoContent[6] = html_yr_6;
		layers[6].on("mouse-over", function (evt) {
		    showTooltip(evt, 6);
		});
		layers[6].on("click", function (evt) {
		    if (swIdentify) {
		        showInfo(evt, 6);
		    }
		})
        layers[7] = new esri.layers.FeatureLayer(urlSVR1 + "8", {
							    //layers[3] = new esri.layers.FeatureLayer(urlSVR2 + "0", {
                                mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                                outFields: ["*"]
							    //opacity: 0.6
							});
		tooltipLayers[7] = "<b>Salas de Cine: </b>${titulo}";
		infoTitle[7] = "Salas de Cine:"
		//var html_yr_7 = '<div style="height:25px"><div style="float: left; width:25%"><b>Codigo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${OBJECTID}</div></div>';
		var html_yr_7 = '<div style="height:25px"><div style="float: left; width:25%"><b>Titulo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${titulo}</div></div>';
		
		html_yr_7 += '<div style="height:25px"><div style="float: left; width:25%"><b>Direccion</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${direccion}</div></div>';
		html_yr_7 += '<div style="height:25px"><div style="float: left; width:25%"><b>Ubicación</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nomdep} - ${nomprov} - ${nomdist}</div></div>';
		html_yr_7 += '<div style="height:25px"><div style="float: left; width:25%"><b>Telefono</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${telef}</div></div>';
		
		html_yr_7 += '<div style="height:25px"><div style="float: left; width:25%"><b>Email</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${email}</div></div>';
		
		html_yr_7 += '<div style="height:25px"><div style="float: left; width:25%"><b>Web</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${url}</div></div>';
		
		html_yr_7 += '<div style="height:25px"><div style="float: left; width:25%"><b>Descripcion</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${descrip}</div></div>';
        infoContent[7] = html_yr_7;
		layers[7].on("mouse-over", function (evt) {
		    showTooltip(evt, 7);
		});
		layers[7].on("click", function (evt) {
		    if (swIdentify) {
		        showInfo(evt, 7);
		    }
		})
        layers[8] = new esri.layers.FeatureLayer(urlSVR1 + "9", {
							    //layers[3] = new esri.layers.FeatureLayer(urlSVR2 + "0", {
							    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
							    outFields: ["*"]
                                //opacity: 0.6
							});
        tooltipLayers[8] = "<b>Salas de Teatro: </b>${titulo}";
        infoTitle[8] = "Salas de Teatro:"
        //html_yr_8 = '<div style="height:25px"><div style="float: left; width:25%"><b>Codigo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${OBJECTID}</div></div>';
       var html_yr_8 = '<div style="height:25px"><div style="float: left; width:25%"><b>Titulo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${titulo}</div></div>';
        html_yr_8 += '<div style="height:25px"><div style="float: left; width:25%"><b>Direccion</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${direccion}</div></div>';
		html_yr_8 += '<div style="height:25px"><div style="float: left; width:25%"><b>Ubicación</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nomdep} - ${nomprov} - ${nomdist}</div></div>';
        html_yr_8 += '<div style="height:25px"><div style="float: left; width:25%"><b>Telefono</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${telef}</div></div>';
        
        html_yr_8 += '<div style="height:25px"><div style="float: left; width:25%"><b>Email</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${email}</div></div>';
		html_yr_8 += '<div style="height:25px"><div style="float: left; width:25%"><b>Web</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${url}</div></div>';
        html_yr_8 += '<div style="height:25px"><div style="float: left; width:25%"><b>Distrito</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nomdist}</div></div>';
		 html_yr_8 += '<div style="height:25px"><div style="float: left; width:25%"><b>Descripcion</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${descrip}</div></div>';
        infoContent[8] = html_yr_8;
        layers[8].on("mouse-over", function (evt) {
            showTooltip(evt, 8);
        });
        layers[8].on("click", function (evt) {
            if (swIdentify) {
                showInfo(evt, 8);
            }
        })
        layers[9] = new esri.layers.FeatureLayer(urlSVR1 + "11", {
							    //layers[3] = new esri.layers.FeatureLayer(urlSVR2 + "0", {
							    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
							    outFields: ["*"]
                                //opacity: 0.6
							});
        tooltipLayers[9] = "<b>Poblacion Afroperuana: </b>${nombre}";
        infoTitle[9] = "Poblacion Afroperuana:"
        //var html_yr_9 = '<div style="height:25px"><div style="float: left; width:25%"><b>Codigo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${OBJECTID}</div></div>';
       var html_yr_9 = '<div style="height:25px"><div style="float: left; width:30%"><b>Nombre</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nombre}</div></div>';
        html_yr_9 += '<div style="height:25px"><div style="float: left; width:30%"><b>Departamento</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nomdep}</div></div>';
        html_yr_9 += '<div style="height:25px"><div style="float: left; width:30%"><b>Provincia</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nomprov}</div></div>';
		 html_yr_9 += '<div style="height:25px"><div style="float: left; width:30%"><b>Distrito</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nomdist}</div></div>';
        infoContent[9] = html_yr_9;
        layers[9].on("mouse-over", function (evt) {
            showTooltip(evt, 9);
        });
        layers[9].on("click", function (evt) {
            if (swIdentify) {
                showInfo(evt, 9);
            }
        })
		layers[10] = new esri.layers.FeatureLayer(urlSVR1 + "13", {
							    //layers[3] = new esri.layers.FeatureLayer(urlSVR2 + "0", {
							    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
							    outFields: ["*"]
                                //opacity: 0.6
							});
        tooltipLayers[10] = "<b>Vuelo de Drones: </b>${titulo}";
        infoTitle[10] = "Vuelo de Drones:"
        //var html_yr_10 = '<div style="height:25px"><div style="float: left; width:25%"><b>Codigo</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${OBJECTID}</div></div>';
        var html_yr_10 = '<div style="height:25px"><div style="float: left; width:25%"><b>Nombre</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${titulo}</div></div>';
		html_yr_10 += '<div style="height:25px"><div style="float: left; width:25%"><b>Ubicación</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${nomdep} / ${nomprov} / ${nomdist}</div></div>';
		html_yr_10 += '<div style="height:25px"><div style="float: left; width:25%"><b>Url</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${url}</div></div>';
        html_yr_10 += '<div style="height:25px"><div style="float: left; width:25%"><b>Datos</b></div><div style="float: left; width:70%; border-bottom: 1px ridge;">${datos}</div></div>';
        
       
        infoContent[10] = html_yr_10;
        layers[10].on("mouse-over", function (evt) {
            showTooltip(evt, 10);
        });
        layers[10].on("click", function (evt) {
            if (swIdentify) {
                showInfo(evt, 10);
            }
        })
		//******************TOC*****************************

					/*featLayer1 = new esri.layers.FeatureLayer("http://localhost:6080/arcgis/rest/services/geocultura/SrvGeocultura/MapServer/0", {
					            mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
							    //outFields: ["POP07_SQMI"]//,
							    outFields: ["OBJECTID"]
							});*/
							//featLayer1.setDefinitionExpression("STCOFIPS='21111'"); //Louisville, KY
							var h = dojo.connect(map, 'onLayersAddResult', function (results) {
							    // overwrite the default visibility of service.
							    // TOC will honor the overwritten value.
							    //dynaLayer1.setVisibleLayers([2, 5, 8, 11]);
							    try {
							        toc = new agsjs.dijit.TOC({
							            map: map,
							            layerInfos: [{
							                layer: layers[0],
							                title: "Museos"
							            }/*, {
                                   layer: dynaLayer1,
                                   title: "DynamicMapServiceLayer1"
                                   //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                   //slider: false // whether to display a transparency slider.
                                   }*/]
							        }, 'tocDiv');
							        toc.startup();
							        dojo.connect(toc, 'onTOCNodeChecked', function (rootLayer, serviceLayer, checked) {
							            if (console) {
							                console.log("TOCNodeChecked, rootLayer:"
						+ (rootLayer ? rootLayer.id : 'NULL')
						+ ", serviceLayer:" + (serviceLayer ? serviceLayer.id : 'NULL')
						+ " Checked:" + checked);

							            }
							        });
							        dojo.disconnect(h);
							    } catch (e) {
							        alert(e);
							    }
							});
                        //map.addLayers([/*dynaLayer1, */featLayer1]);

							var h1 = dojo.connect(map, 'onLayersAddResult', function (results) {
							    try {
							        toc1 = new agsjs.dijit.TOC({
							            map: map,
							            layerInfos: [{
							                layer: layers[1],
							                title: "Archivos"
							            }, {
                 				            layer: layers[2],
							                title: "Centro/Organizacion Cultural"
							            },
                                         {
                                            layer: layers[3],
                                            title: "Editoriales"
                                        },
                                         {
                                            layer: layers[4],
                                            title: "Escuelas de Arte"
                                        },
                                         {
                                            layer: layers[5],
                                            title: "Galerias"
                                        },
                                         {
                                            layer: layers[6],
                                            title: "Librerias"
                                        },
                                         {
                                            layer: layers[7],
                                            title: "Salas de Cine"
                                        },
                                         {
                                            layer: layers[8],
                                            title: "Salas de Teatro"
                                        }]
							        }, 'tocDiv1');
							        toc1.startup();
							        dojo.connect(toc1, 'onTOCNodeChecked', function (rootLayer, serviceLayer, checked) {
							            if (console) {
							                console.log("TOCNodeChecked, rootLayer:"
						+ (rootLayer ? rootLayer.id : 'NULL')
						+ ", serviceLayer:" + (serviceLayer ? serviceLayer.id : 'NULL')
						+ " Checked:" + checked);

							            }
							        });
							        dojo.disconnect(h1);
							    } catch (e) {
							        alert(e);
							    }
							});

							var h2 = dojo.connect(map, 'onLayersAddResult', function (results) {
							    try {
							        toc2 = new agsjs.dijit.TOC({
							            map: map,
							            layerInfos: [{
							                layer: layers[9],
							                title: "Poblacion Afroperuana"
							            }
                                    ]
							        }, 'tocDiv2');
							        toc2.startup();
							        dojo.connect(toc2, 'onTOCNodeChecked', function (rootLayer, serviceLayer, checked) {
							            if (console) {
							                console.log("TOCNodeChecked, rootLayer:"
						+ (rootLayer ? rootLayer.id : 'NULL')
						+ ", serviceLayer:" + (serviceLayer ? serviceLayer.id : 'NULL')
						+ " Checked:" + checked);

							            }
							        });
							        dojo.disconnect(h2);
							    } catch (e) {
							        alert(e);
							    }
							});

							var h3 = dojo.connect(map, 'onLayersAddResult', function (results) {
							    try {
							        toc3 = new agsjs.dijit.TOC({
							            map: map,
							            layerInfos: [{
							                layer: layers[10],
							                title: "Vuelo de Drones"
							            }
                                    ]
							        }, 'tocDiv3');
							        toc3.startup();
							        dojo.connect(toc3, 'onTOCNodeChecked', function (rootLayer, serviceLayer, checked) {
							            if (console) {
							                console.log("TOCNodeChecked, rootLayer:"
						+ (rootLayer ? rootLayer.id : 'NULL')
						+ ", serviceLayer:" + (serviceLayer ? serviceLayer.id : 'NULL')
						+ " Checked:" + checked);

							            }
							        });
							        dojo.disconnect(h3);
							    } catch (e) {
							        alert(e);
							    }
							});

        //*******************FIN TOC************************ 

/*		//********************************circulo*******************************
		// selection symbol used to draw the selected census block points within the buffer polygon
		  var symbol = new esri.symbol.SimpleMarkerSymbol(
          esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
          12,
          new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_NULL,
							//new Color([247, 34, 101, 0.9]), 
            new esri.Color([255, 0, 0, 0.5]),
            1
          ),
							//new Color([207, 34, 171, 0.5])
          new esri.Color([255, 0, 0, 0.5])
        );
			//featureLayer.setSelectionSymbol(symbol); 
            //make unselected features invisible
			//var nullSymbol = new SimpleMarkerSymbol().setSize(0);
			//featureLayer.setRenderer(new SimpleRenderer(nullSymbol));


		  // map.addLayer(featureLayer);


		  var circleSymb = new esri.symbol.SimpleFillSymbol(
          esri.symbol.SimpleFillSymbol.STYLE_NULL,
          new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
							//new Color([105, 105, 105]),
            new esri.Color([255, 0, 0]),
            2
							//), new Color([255, 255, 0, 0.25])
          ), new esri.Color([255, 0, 0, 0.25])
        );

		var circle;

		//when the map is clicked create a buffer around the click point of the specified distance.
		map.on("click", function (evt) {
		circle = new esri.geometry.Circle({
		center: evt.mapPoint,
		geodesic: true,
		radius: 0.5,
		radiusUnit: "esriMiles"
		});
		map.graphics.clear();
		map.infoWindow.hide();
		var graphic = new esri.Graphic(circle, circleSymb);
		map.graphics.add(graphic);

		var query = new esri.tasks.Query();
		query.geometry = circle.getExtent();
		//use a fast bounding box query. will only go to the server if bounding box is outside of the visible map
		//featureLayer.queryFeatures(query, selectInBuffer);
		layers[2].queryFeatures(query, selectInBuffer);
		});

		function selectInBuffer(response) {
		var feature;
		var features = response.features;
		var inBuffer = [];
		//filter out features that are not actually in buffer, since we got all points in the buffer's bounding box
		for (var i = 0; i < features.length; i++) {
		feature = features[i];
		if (circle.contains(feature.geometry)) {
		    //inBuffer.push(feature.attributes[featureLayer.objectIdField]);
		    inBuffer.push(feature.attributes[layers[2].objectIdField]);
		}
		}
        var query = new esri.tasks.Query();
		query.objectIds = inBuffer;
		//use a fast objectIds selection query (should not need to go to the server)
		//featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (results) {
		layers[2].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (results) {
		var totalPopulation = sumPopulation(results);
		var r = "";
		var res = "";
		var n1;
		//r = "<b>The total Census Block population within the buffer is <i>" + totalPopulation + "</i>.</b>";
		r = "<b>El total de museos es: <i>" + totalPopulation + "</i></b>";
		//res = "<br>Museo: ";
		for (var x = 0; x < results.length; x++) {
		  //popTotal = popTotal + features[x].attributes["POP2000"]; //Suma de poblacion
		  n1 = x + 1
		res = res + "<br><b><i>" + n1 + "</i>. </b>" + results[x].attributes["NOMBRE"];
		  }
		 dojo.dom.byId("messages").innerHTML = r + res;
		 });
		}

		function sumPopulation(features) {
		var popTotal = 0;
		for (var x = 0; x < features.length; x++) {
		    popTotal = popTotal + features[x].attributes["POP2000"]; //Suma de poblacion
		}
		//return popTotal;
		 return x
		}
		//*****************************fin circulo******************************************************************
*/

    /******* Sub Layer*******   
	var imageParams = new esri.layers.ImageParameters();
	imageParams.layerIds = [6];
	imageParams.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;		
	layers[4] = new esri.layers.ArcGISDynamicMapServiceLayer(urlSVR, {imageParameters:imageParams});	

	var imageParams1 = new esri.layers.ImageParameters();
	imageParams1.layerIds = [7];
	imageParams1.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;		
	layers[5] = new esri.layers.ArcGISDynamicMapServiceLayer(urlSVR, {imageParameters:imageParams1});	

	var imageParams2 = new esri.layers.ImageParameters();
	imageParams2.layerIds = [8];
	imageParams2.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;		
	layers[6] = new esri.layers.ArcGISDynamicMapServiceLayer(urlSVR, {imageParameters:imageParams2});
	
	var imageParams3 = new esri.layers.ImageParameters();
	imageParams3.layerIds = [9];
	imageParams3.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;		
	layers[7] = new esri.layers.ArcGISDynamicMapServiceLayer(urlSVR, {imageParameters:imageParams3});

    */ //***fin sub layer... 
	map.addLayers(layers);
	
	var legendLayers = [];		
		legendLayers.push({layer: layers[0], title: 'Escuelas de Arte'});
		legendLayers.push({layer: layers[1], title: 'Galerias'});
		legendLayers.push({layer: layers[2], title: 'Museos'});
		legendLayers.push({layer: layers[3], title: 'Salas de Teatro'});
		/*
		legendDijit = new esri.dijit.Legend({
			map: map,
			layerInfos: legendLayers
		}, "legendDiv");
		legendDijit.startup();
        */
        layers[0].on("mouse-out", closeDialog);	
        layers[1].on("mouse-out", closeDialog);	
        layers[2].on("mouse-out", closeDialog);
        layers[3].on("mouse-out", closeDialog);
		

		var slider1 = new dijit.form.HorizontalSlider({
            name: "sliderlyr0",
            value: 100,
            minimum: 0,
            maximum: 100,
            intermediateChanges: true,
            style: "width:100%;",
            onChange: function(value){
                layers[0].setOpacity(Math.floor(value) / 100);
            }
        }, "sliderlyr0");

		var slider2 = new dijit.form.HorizontalSlider({
            name: "sliderlyr1",
            value: 100,
            minimum: 0,
            maximum: 100,
            intermediateChanges: true,
            style: "width:100%;",
            onChange: function(value){
                layers[1].setOpacity(Math.floor(value) / 100);
            }
        }, "sliderlyr1");
		
		var slider3 = new dijit.form.HorizontalSlider({
            name: "sliderlyr2",
            value: 100,
            minimum: 0,
            maximum: 100,
            intermediateChanges: true,
            style: "width:100%;",
            onChange: function(value){
				layers[2].setOpacity(Math.floor(value) / 100);
            }
        }, "sliderlyr2");
		
		var slider4 = new dijit.form.HorizontalSlider({
            name: "sliderlyr3",
            value: 70,
            minimum: 0,
            maximum: 100,
            intermediateChanges: true,
            style: "width:100%;",
            onChange: function(value){
				layers[3].setOpacity(Math.floor(value) / 100);
            }
        }, "sliderlyr3");
				
		basemapGallery = new esri.dijit.BasemapGallery({
			showArcGISBasemaps: true,
			map: map
		}, "basemapGallery");
		basemapGallery.startup();

		symbol_Buffer = new esri.symbol.PictureMarkerSymbol(imgPoint, 14, 20);		
		
		highlightSymbol = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_NULL, 
			new esri.symbol.SimpleLineSymbol(
				esri.symbol.SimpleLineSymbol.STYLE_SOLID, 
				new dojo.Color([128,255,255]), 3
			), 
			new dojo.Color([125,125,125,0.35])
		);

		highlightSymbol1 = new esri.symbol.SimpleMarkerSymbol()
              .setStyle("square")
              .setSize(10)
              .setColor(new dojo.Color([255, 0, 0, 0.5]));

		symbol_radio = new esri.symbol.SimpleFillSymbol(
			esri.symbol.SimpleFillSymbol.STYLE_NULL, 
			new esri.symbol.SimpleLineSymbol(
				esri.symbol.SimpleLineSymbol.STYLE_SOLID, 
				new dojo.Color([255,0,0]), 3
			), 
			new dojo.Color([255,0,0,0.25])
		);
		
		navToolbar = new esri.toolbars.Navigation(map);
		dojo.connect(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);		
		dojo.connect(map, "onExtentChange", Extend);
		
		toolbar = new esri.toolbars.Draw(map);
		lengthParams = new esri.tasks.LengthsParameters();		
	 	areaParams = new esri.tasks.AreasAndLengthsParameters();
		
		dojo.connect(toolbar, "onDrawEnd", function(geometry) {
 			if (isMeasureLine)
			{
				map.graphics.add(new esri.Graphic(geometry, new esri.symbol.SimpleLineSymbol()));
				lengthParams.polylines = [geometry];
				lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
				lengthParams.geodesic = true;    	   
				geometryService.lengths(lengthParams);		
			}
			else
			{
				map.graphics.add(new esri.Graphic(geometry, new esri.symbol.SimpleFillSymbol()));
				areaParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
      			areaParams.areaUnit = esri.tasks.GeometryService.UNIT_METER;
				lengthParams.geodesic = true;
				geometryService.simplify([geometry], function(simplifiedGeometries) {
					areaParams.polygons = simplifiedGeometries;
					geometryService.areasAndLengths(areaParams);
				});
			}
        });			
		dojo.connect(geometryService, "onLengthsComplete", outputDistance);		
		geometryService.on("areas-and-lengths-complete", outputDistance);

		geometryService.on("buffer-complete", function(result){	
			swBuffer = true;
			var geo = result.geometries[0];
            var graphic = new esri.Graphic(geo, symbol_radio);
           	map.graphics.add(graphic);
			map.setExtent(graphic._extent.expand(1), true);
			
			var query = new esri.tasks.Query();
			query.geometry = geo;
			layers[2].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function(results){																										
				var data = [];
				dojo.forEach(results, function(feature) {
							data.push({
							   //"col1": feature.attributes.objectid,
							   //"col2": feature.attributes.nomb_map,
							   //"col3": ' zoomfeature(2, ' + feature.attributes.objectid + '); '
                               "col1": feature.attributes.OBJECTID,
							   "col2": feature.attributes.NOMBRE,
							   "col3": ' zoomfeature(2, ' + feature.attributes.OBJECTID + '); '

							});
						});
				var grid = dijit.byId('myDataGrid3');		 	
				var store = new dojo.data.ItemFileWriteStore({
					data: {
						items: data
					}
				});		
				grid.setStore(store);	
			});
			
			layers[0].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function(results){																										
				var data = [];
				dojo.forEach(results, function(feature) {
							data.push({
								"col1": feature.attributes.objectid,
								"col2": feature.attributes.nro_cira,
								"col3": ' zoomfeature(0, ' + feature.attributes.objectid + '); '
							});
						});
				var grid = dijit.byId('myDataGrid4');		 	
				var store = new dojo.data.ItemFileWriteStore({
					data: {
						items: data
					}
				});		
				grid.setStore(store);	
			})

			layers[1].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function(results){																										
					var data = [];
					dojo.forEach(results, function(feature) {
								data.push({
									"col1": feature.attributes.objectid,
									"col2": feature.attributes.nro_cira,
									"col3": ' zoomfeature(1, ' + feature.attributes.objectid + '); '
								});
							});
				var grid = dijit.byId('myDataGrid5');		 	
				var store = new dojo.data.ItemFileWriteStore({
					data: {
						items: data
					}
				});		
				grid.setStore(store);	
			});
			loading.hide();
			pnlBuffer.hide();
			pnlResultado.show();			
		});
		
		ubigeo(3);
		var obj = dojo.byId('div-load');  
		dojo.style(obj, {visibility:'hidden'});
 	}
	
	function upload_shape(){
 		loadingSuperGeo.show();
		var portalUrl = "http://www.arcgis.com";
		var params = {
		'name': name,
		'targetSR': map.spatialReference,
		'maxRecordCount': 1000,
		'enforceInputFileSizeLimit': true,
		'enforceOutputJsonSizeLimit': true
		};
        esri.config.defaults.io.proxyUrl = "/proxy";
		var extent = esri.geometry.getExtentForScale(map, 40000); 
        var resolution = extent.getWidth() / map.width;
        params.generalize = true;
        params.maxAllowableOffset = resolution;
        params.reducePrecision = true;
        params.numberOfDigitsAfterDecimal = 0;
        
        var myContent = {
          'filetype': 'shapefile',
          'publishParameters': dojo.toJson(params),
          'f': 'json',
          'callback.html': 'textarea'
        };

		esri.request({
          url: portalUrl + '/sharing/rest/content/features/generate',
          content: myContent,
          form: dojo.byId('uploadForm'),
          handleAs: 'json',
          load: dojo.hitch(this, function (response) {
           	 if (response.error) {
				dialogAlert('Error!', response.error);
				loadingSuperGeo.hide();
              return;
            }
            addShapefileToMap(response.featureCollection);
          }),
          error: dojo.hitch(this, function (err){
									dialogAlert('Error!', err.message);
									loadingSuperGeo.hide();
								})
        }); 
	}

	function addShapefileToMap(featureCollection) {
        var fullExtent;
        dojo.forEach(featureCollection.layers, function (lyr) {
            var layer = new esri.layers.FeatureLayer(lyr);
            map.addLayers(layer);
            changeRenderer(layer);
            fullExtent = fullExtent ? fullExtent.union(layer.fullExtent) : layer.fullExtent;
                        
            			var geo = layer.graphics[0].geometry;
            			var query = new esri.tasks.Query();
            			query.geometry = geo;
            			layers[2].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function(results){																										
            				var data = [];
            				dojo.forEach(results, function(feature) {
            							data.push({
            							    //"col1": feature.attributes.objectid,
            							    //"col2": feature.attributes.nomb_map,
            							    //"col3": ' zoomfeature(2, ' + feature.attributes.objectid + '); '
                            				"col1": feature.attributes.OBJECTID,
            							    "col2": feature.attributes.NOMBRE,
            							    "col3": ' zoomfeature(2, ' + feature.attributes.OBJECTID + '); '

            							});
            						});
            				var grid = dijit.byId('myDataGrid6');		 	
            				var store = new dojo.data.ItemFileWriteStore({
            					data: {
            						items: data
            					}
            				});		
            				grid.setStore(store);	
            			});
            			
            			layers[0].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function(results){																										
            				var data = [];
            				dojo.forEach(results, function(feature) {
            							data.push({
            							    "col1": feature.attributes.objectid,
            							    "col2": feature.attributes.nro_cira,
            								"col3": ' zoomfeature(0, ' + feature.attributes.objectid + '); '
            							});
            						});
            				var grid = dijit.byId('myDataGrid7');		 	
            				var store = new dojo.data.ItemFileWriteStore({
            					data: {
            						items: data
            					}
            				});		
            				grid.setStore(store);	
            			})

            			layers[1].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function(results){																										
            					var data = [];
            					dojo.forEach(results, function(feature) {
            								data.push({
            								    "col1": feature.attributes.objectid,
            									"col2": feature.attributes.nro_cira,
            									"col3": ' zoomfeature(1, ' + feature.attributes.objectid + '); '
            								});
            							});
            				var grid = dijit.byId('myDataGrid8');		 	
            				var store = new dojo.data.ItemFileWriteStore({
            					data: {
            						items: data
            					}
            				});		
            				grid.setStore(store);	
            			});
        });
        
		map.setExtent(fullExtent.expand(1.25), true);        
		
		pnlShape.hide();
		sbResultadoGeo.show();
		winData = 1;
		loadingSuperGeo.hide();
    }
	
	function changeRenderer(layer) {
	    var symbol = null;
        switch (layer.geometryType) {
        case 'esriGeometryPoint':
          /*symbol = new esri.symbol.PictureMarkerSymbol({
            'angle':0,
            'xoffset':0,
            'yoffset':0,
            'type':'esriPMS',
            'url': imgPoint,
            'contentType':'image/png',
            'width':20,
            'height':20
          });*/
		  symbol = symbol_Buffer;
          break;
        case 'esriGeometryPolygon':
          //symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([112, 112, 112]), 1), new dojo.Color([136, 136, 136, 0.25]));
		  symbol = highlightSymbol;
          break;
  }
  console.log(symbol);
        if (symbol) {
          layer.setRenderer(new esri.renderer.SimpleRenderer(symbol));
        }
      }	

	function outputDistance(result) {
		toggleMeasure();
		if (isMeasureLine)
		{
			dojo.byId("div-measure").innerHTML = "Distancia total: " + dojo.number.format(result.lengths[0] / 1000) + " kms";
		}
		else
		{
			dojo.byId("div-measure").innerHTML = "&Aacute;rea total: " + dojo.number.format(result.result.areas[0] / 1000000) + " kms2 <br>Distancia total: " + dojo.number.format(result.result.lengths[0] / 1000) + " kms";
		}
 	 }

	function Extend(extent) {
		if (!swExtend){
	  		xMin = map.extent.xmin;
			yMin = map.extent.ymin;
			xMax = map.extent.xmax;
			yMax = map.extent.ymax;
			swExtend = true;
		}
	}
	  
	function extentHistoryChangeHandler() {
		dijit.byId("zoomprev").disabled = navToolbar.isFirstExtent();
		dijit.byId("zoomnext").disabled = navToolbar.isLastExtent();
	}

	function zoomExtend(){
		var extent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, new esri.SpatialReference({ wkid: gwkid }));
    	map.setExtent(extent)
		swIdentify = false;
	}
	
	function OnOffLayers(lry, OnOff){
		if(!OnOff){
			map.removeLayer(layers[lry]);
		}else{
			map.addLayer(layers[lry]);
		}
	}
		
	function showTooltip(evt, lyr){
        closeDialog();
		var txt = tooltipLayers[lyr];
		var tipContent = "";
		require(["esri/lang"], function(esriLang){
			tipContent = esriLang.substitute(evt.graphic.attributes, txt);
        });
	
	   var dialog = new dijit.TooltipDialog({
          id: "tooltip",
          content: tipContent,
          style: "position: absolute; width: 320px; font: normal normal normal 10pt Verdana;z-index:100"
        });
        dialog.startup();
        dojo.style(dialog.domNode, "opacity", 0.85);
        dijit.placeOnScreen(dialog.domNode, {x: evt.pageX, y: evt.pageY}, ["TL", "BL"], {x: 10, y: 10});
	}

	function showInfo(evt, lyr){
		map.graphics.remove(featureSelected);
		closeDialog();		
		var title = infoTitle[lyr];
		var template = infoContent[lyr];
		var content = "";
		require(["esri/lang"], function(esriLang){
			content = esriLang.substitute(evt.graphic.attributes, template);
        });				 
		featureSelected = new esri.Graphic(evt.graphic.geometry, highlightSymbol);
		map.graphics.add(featureSelected);
		
		map.infoWindow.resize(390, 500);
		map.infoWindow.setTitle(title);
		map.infoWindow.setContent(content);
		map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
	}
		
	function closeDialog() {
        var tooltip = dijit.byId("tooltip");
        if (tooltip) {
          tooltip.destroy();
        }
	}
	  
	function clearAll(){
		closeDialog();
		map.infoWindow.hide();
		map.graphics.clear();
		swIdentify = false;
		swBuffer = false; 
		
		for (l = layers.length; l < map.graphicsLayerIds.length ; l++){
			var lyr = map.getLayer(map.graphicsLayerIds[l]);
			map.removeLayer(lyr);
		}
	}
	
	function selectRow(e){
		console.log(e.target.innerHTML);
	}
	
	function identify(){
		swIdentify =  true;
	}
		
	function openSearch(){
		pnlBuscar.show();		
	}
	function openLayer() {
	    //pnlLayer.show();
	    floater.show();
	}

	function CreateImage(evt){
		var imgtag=" <img style=\"cursor:pointer; \" ondblclick= \" " + evt + " \" src='images/zoom.png' width=\"15\" height=\"15\" >";
		return imgtag;
	}

	function search(){ 		  
		loadingSearch.show();			
		var txt ;
		var obj = "";
		txt = dojo.dom.byId('txtQueryMap').value;
		if (txt == '') {
		    loadingSearch.hide();
		    return false;
		}
		var queryMAPs = new esri.tasks.Query();
		//queryMAPs.where = "upper(nomb_map) like '%" + txt.toUpperCase() + "%'";
		queryMAPs.where = "upper(nombre) like '%" + txt.toUpperCase() + "%'";

		var queryCIRAs = new esri.tasks.Query();
		queryCIRAs.where = "upper(titulo) like '%" + txt.toUpperCase() + "%'";
		//queryCIRAs.where = "upper(nro_cira) like '%" + txt.toUpperCase() + "%' AND DISPONIBLE=1 AND ERR_CIRA=0";

		layers[0].selectFeatures(queryMAPs, esri.layers.FeatureLayer.SELECTION_NEW, function (results) {
		    var data = [];
		    dojo.forEach(results, function (feature) {
		        data.push({
		            //"col1": feature.attributes.objectid,
		            //"col2": feature.attributes.nomb_map,
		            //"col3": ' zoomfeature(2, ' + feature.attributes.objectid + '); '
		            "col1": feature.attributes.OBJECTID,
		            "col2": feature.attributes.nombre,
		            "col3": ' zoomfeature(0, ' + feature.attributes.OBJECTID + '); '
		        }); //alert(feature.attributes.OBJECTID);
		    });
		    

		    var grid = dijit.byId('myDataGrid');
		    var store = new dojo.data.ItemFileWriteStore({
		        data: {
		            items: data
		        }
		    });
		    grid.setStore(store);
		});
		
		layers[2].selectFeatures(queryCIRAs, esri.layers.FeatureLayer.SELECTION_NEW, function(results){																										
			var data = [];
			dojo.forEach(results, function(feature) {
						data.push({
						    "col1": feature.attributes.OBJECTID,
							"col2": feature.attributes.titulo,
							"col3": ' zoomfeature(2, ' + feature.attributes.OBJECTID + '); '
						});
					});
			var grid = dijit.byId('myDataGrid1');		 	
			var store = new dojo.data.ItemFileWriteStore({
				data: {
					items: data
				}
			});		
			grid.setStore(store);			
		})

		layers[4].selectFeatures(queryCIRAs, esri.layers.FeatureLayer.SELECTION_NEW, function(results){																										
				var data = [];
				dojo.forEach(results, function(feature) {
							data.push({
							    "col1": feature.attributes.OBJECTID,
							    "col2": feature.attributes.titulo,
							    "col3": ' zoomfeature(1, ' + feature.attributes.OBJECTID + '); '
							});
						});
			var grid = dijit.byId('myDataGrid2');		 	
			var store = new dojo.data.ItemFileWriteStore({
				data: {
					items: data
				}
			});		
			grid.setStore(store);
        });

        layers[5].selectFeatures(queryCIRAs, esri.layers.FeatureLayer.SELECTION_NEW, function (results) {
          var data = [];
          dojo.forEach(results, function (feature) {
          data.push({
            "col1": feature.attributes.OBJECTID,
            "col2": feature.attributes.titulo,
            "col3": ' zoomfeature(5, ' + feature.attributes.OBJECTID + '); '
           });
         });
          var grid = dijit.byId('myDataGrid3');
          var store = new dojo.data.ItemFileWriteStore({
            data: {
              items: data
            }
           });
           grid.setStore(store);
        });

       layers[6].selectFeatures(queryMAPs, esri.layers.FeatureLayer.SELECTION_NEW, function (results) {
           var data = [];
           dojo.forEach(results, function (feature) {
               data.push({
                   "col1": feature.attributes.OBJECTID,
                   "col2": feature.attributes.nombre,
                   "col3": ' zoomfeature(6, ' + feature.attributes.OBJECTID + '); '
               });
           });
           var grid = dijit.byId('myDataGrid4');
           var store = new dojo.data.ItemFileWriteStore({
               data: {
                   items: data
               }
           });
           grid.setStore(store);
       });

       layers[7].selectFeatures(queryCIRAs, esri.layers.FeatureLayer.SELECTION_NEW, function (results) {
           var data = [];
           dojo.forEach(results, function (feature) {
               data.push({
                   "col1": feature.attributes.OBJECTID,
                   "col2": feature.attributes.titulo,
                   "col3": ' zoomfeature(7, ' + feature.attributes.OBJECTID + '); '
               });
           });
           var grid = dijit.byId('myDataGrid5');
           var store = new dojo.data.ItemFileWriteStore({
               data: {
                   items: data
               }
           });
           grid.setStore(store);
       });

       layers[8].selectFeatures(queryCIRAs, esri.layers.FeatureLayer.SELECTION_NEW, function (results) {
           var data = [];
           dojo.forEach(results, function (feature) {
               data.push({
                   "col1": feature.attributes.OBJECTID,
                   "col2": feature.attributes.titulo,
                   "col3": ' zoomfeature(8, ' + feature.attributes.OBJECTID + '); '
               });
           });
           var grid = dijit.byId('myDataGrid61');
           var store = new dojo.data.ItemFileWriteStore({
               data: {
                   items: data
               }
           });
           grid.setStore(store);
       });

       loadingSearch.hide();
	}

	function zoomfeature(lry, id){
		//map.graphics.remove(featureSelected);
		var query = new esri.tasks.Query();
		query.where = "OBJECTID=" + id;
		switch (lry){
			case 0:
				/*layers[0].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW,function(features){
					var stateExtent = features[0].geometry.getExtent().expand(5.0);
					map.setExtent(stateExtent);
					featureSelected = new esri.Graphic(features[0].geometry,highlightSymbol);
					map.graphics.add(featureSelected);  
				});*/
                 layers[0].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW,function(features){
					map.centerAndZoom(features[0].geometry, 18);
	             });					
			break;
			case 1:
				/*layers[1].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW,function(features){
					var stateExtent = features[0].geometry.getExtent().expand(5.0);
					map.setExtent(stateExtent);
					featureSelected = new esri.Graphic(features[0].geometry,highlightSymbol);
					map.graphics.add(featureSelected);
	            });	*/
			    layers[4].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
			        map.centerAndZoom(features[0].geometry, 18);
			    });               							
			break;
			case 2:
				layers[2].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW,function(features){
					map.centerAndZoom(features[0].geometry, 18);
	             });
	        break;
	        case 5:
	            layers[5].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
	              map.centerAndZoom(features[0].geometry, 18);
	            });
	        break;
	        case 6:
	            layers[6].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
	              map.centerAndZoom(features[0].geometry, 18);
	        });
	        break;
	        case 7:
	            layers[7].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
	              map.centerAndZoom(features[0].geometry, 18);
	        });
	        break;
	        case 8:
	            layers[8].selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
	              map.centerAndZoom(features[0].geometry, 18);
	        });
	        break;
		} 			
	}

	function buffer(){
		pnlBuffer.show();
		winData = 0;
	}
	
	function toggleMeasure(){
		var obj = dojo.byId('div-measure');  
		dojo.style(obj, {visibility:'visible'});
	}

	function measure(){
		navToolbar.deactivate();
        toolbar.activate(esri.toolbars.Draw.POLYLINE);
		//map.hideZoomSlider();
		isMeasureLine = true;
	}
	
	function measure_poly(){
		navToolbar.deactivate();
        toolbar.activate(esri.toolbars.Draw.POLYGON);
		//map.hideZoomSlider();
		isMeasureLine = false;
	}
	
	function execBuffer(){
		clearAll();
		var este      = dojo.dom.byId('txtEste').value;
		var norte     = dojo.dom.byId('txtNorte').value;	
		var distancia = dojo.dom.byId('txtDistancia').value;
		var unidad = dojo.dijit.byId('cboUnidad').get('value');
		distancia = (unidad == 'kilometros')?(distancia * 1000) : distancia;			
		var zona_utm  = 327 + '' + dojo.dijit.byId('txtZona').get('value');
		var wkid      = parseInt(zona_utm);
		var point     = new esri.geometry.Point([este,norte],new esri.SpatialReference({ wkid: wkid }));				
		
		var params_proj = new esri.tasks.ProjectParameters();
		params_proj.geometries = [point];
		params_proj.outSR = new esri.SpatialReference({ wkid: gwkid});
		params_proj.transformation = { wkid: null };
		geometryService.project(params_proj, function( point_reproj ) {													  
			var pointCenter = new esri.geometry.Point([point_reproj[0].x, point_reproj[0].y],new esri.SpatialReference({ wkid: gwkid}));			
			var graphic = new esri.Graphic(pointCenter, symbol_Buffer);
            map.graphics.add(graphic);			
			var params_buff = new esri.tasks.BufferParameters();
			params_buff.geometries  = [ point_reproj[0] ];
			params_buff.distances = [ distancia ];
			params_buff.unit = geometryService.UNIT_METER;
			geometryService.buffer(params_buff);
			loading.show();
		});
	}

	function ubigeo(lyr){
		var lyrQuery = new esri.tasks.QueryTask(urlSVR + lyr);
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		switch (lyr){
			case 3:
				dijit.byId('cboDpto').addOption({ label: '[Seleccione]', value: '0'}); 
				query.where = " objectid<>0 ";
				query.orderByFields = ["nombdep"];
				query.outFields = ["first_iddp", "nombdep"];
				lyrQuery.execute(query, function(results){
					dojo.forEach(results.features, function(feature) {
						var obj = feature.attributes.first_iddp;
						var txt = feature.attributes.nombdep;
						dijit.byId('cboDpto').addOption({ label: txt, value: obj}); 
					});
				});	
			break;
			case 4:
				dijit.byId('cboProv').removeOption(dijit.byId('cboProv').getOptions());
				dijit.byId('cboProv').addOption({ label: '[Seleccione]', value: '0'}); 				
				var dpto = dijit.byId('cboDpto').get('value');				
				query.where = " substring(first_idpr, 1, 2) = '" + dpto + "' ";
				query.orderByFields = ["nombprov"];
				query.outFields = ["first_idpr", "nombprov"];
				lyrQuery.execute(query, function(results){
					dojo.forEach(results.features, function(feature) {
						var obj = '' + feature.attributes.first_idpr;
						var txt = feature.attributes.nombprov;
						dijit.byId('cboProv').addOption({ label: txt, value: obj}); 
					});
				});
				dijit.byId('cboDist').removeOption(dijit.byId('cboDist').getOptions());
				dijit.byId('cboDist').addOption({ label: '[Seleccione]', value: '0'}); 					
			break;			
			case 5:
				dijit.byId('cboDist').removeOption(dijit.byId('cboDist').getOptions());
				dijit.byId('cboDist').addOption({ label: '[Seleccione]', value: '0'}); 	
				var prov = dijit.byId('cboProv').get('value');
				query.where = " idprov = '" + prov + "' ";
				query.orderByFields = ["nombdist"];
				query.outFields = ["iddist", "nombdist"];
				lyrQuery.execute(query, function(results){
					dojo.forEach(results.features, function(feature) {
						var obj = '' + feature.attributes.iddist;
						var txt = feature.attributes.nombdist;
						dijit.byId('cboDist').addOption({ label: txt, value: obj}); 
					});
				});
			break;						
		}		
	}
	
	function zoomUbigeo(lyr){	
		clearAll();
		var lyrQuery = new esri.tasks.QueryTask(urlSVR + lyr);
		var query = new esri.tasks.Query();
		query.returnGeometry = true;

		switch (lyr){
			case 3:
				var dpto = dijit.byId('cboDpto').get('value');
				query.where = " first_iddp='" + dpto + "' ";
				lyrQuery.execute(query, function(results){
					var stateExtent = results.features[0].geometry.getExtent().expand(2.0);
					map.setExtent(stateExtent);
					featureSelected = new esri.Graphic(results.features[0].geometry,highlightSymbol);
					map.graphics.add(featureSelected);  
				});	
			break;
			case 4:
				var prov = dijit.byId('cboProv').get('value');
				query.where = " first_idpr='" + prov + "' ";
				lyrQuery.execute(query, function(results){
					var stateExtent = results.features[0].geometry.getExtent().expand(2.0);
					map.setExtent(stateExtent);
					featureSelected = new esri.Graphic(results.features[0].geometry,highlightSymbol);
					map.graphics.add(featureSelected);  
				});	
			break;
			case 5:
				var dist = dijit.byId('cboDist').get('value');
				query.where = " iddist='" + dist + "' ";
				lyrQuery.execute(query, function(results){
					var stateExtent = results.features[0].geometry.getExtent().expand(2.0);
					map.setExtent(stateExtent);
					featureSelected = new esri.Graphic(results.features[0].geometry,highlightSymbol);
					map.graphics.add(featureSelected);  
				});	
			break;
		}		
	}

	function openWin(){
		if (winData==-1)
			dialogAlert('Advertencia!', 'No se ha realizado ninguna b&uacute;squeda geogr&aacute;fica hasta el momento');		
			
		if (winData==0)
			pnlResultado.show();
			
		if (winData==1)
			sbResultadoGeo.show();					
	}

	function dialogAlert(txtTitle, txtContent){
		var thisdialog = new dijit.Dialog({ title: txtTitle, content: txtContent });
		dojo.body().appendChild(thisdialog.domNode);
		thisdialog.startup();
		thisdialog.show();
	}

	dojo.ready(init);

function openLegend(){
		  
}

function infoLyr(tip, obj){
    var anio, nro;
	if (tip!=2){
	    var datos = obj.split('-');
	    anio = datos[0];
	    nro = dojo.trim(datos[1]);

	    if (nro.toString().indexOf(" ") > -1) {
	        nro = nro.substring(0, nro.toString().indexOf(" "));
	    }

	    if (nro.toString().indexOf("/") > -1) {
	        nro = nro.substring(0, nro.toString().indexOf("/"));
	    }

	    if (nro.toString().indexOf("-") > -1) {
	        nro = nro.substring(0, nro.toString().indexOf("-"));
	    }

	    var formData = { SERVICE: "7", DO: nro,
	        REF: "", U: "uWSConsulta",
	        C: "WSMC@1", I: "",
	        Y: anio
	    };

	    $.ajax({
	        type: "POST",
	        async: false,
	        url: "http://192.25.0.69/wsrConsulta/servicioAjax",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        data: formData,
	        jsonpCallback: 'jsonCallback',
	        crossDomain: true,
	        success: function (results) {
	            results.data.forEach(function (item) {
	                dojo.dom.byId('txtcira-nro').value = item.CIRA;
	                dojo.dom.byId('txtcira-expediente').value = item.EXPEDIENTE;
	                dojo.dom.byId('txtcira-fecha').value = item.FECHAEXP;
	                dojo.dom.byId('txtcira-proyecto').value = item.PROYECTO;
	                dojo.dom.byId('txtcira-recurrente').value = item.RECURRENTE;
	            });
	            myCIRA.show();
	        },
	        error: function (e) {
	            alert("Error " + e);
	        }
	    });

	}else{
//	    var formData = { SERVICE: "4", DO: "",
//	        REF: "", U: "uWSConsulta",
//	        C: "WSMC@1", I: obj,
//	        Y: ""
//	    };

//	    $.ajax({
//	        type: "POST",
//	        async: false,
//	        url: "http://192.25.0.69/wsrConsulta/servicioAjax",
//	        contentType: "application/json; charset=utf-8",
//	        dataType: "jsonp",
//	        data: formData,
//	        //jsonpCallback: 'jsonCallback',
//	        crossDomain: true,
//	        success: function (results) {
//	            console.log(results.data);
//	            results.data.forEach(function (item) {
//	                dojo.dom.byId('txtmap-nombre').value = item.nombre;
//	                dojo.dom.byId('txtmap-clasificacion').value = item.clasificacion;
//	                dojo.dom.byId('txtmap-resolucion').value = item.resolucion;
//	                dojo.dom.byId('txtmap-tipo').value = item.tipo;
//	                dojo.dom.byId('txtmap-ubigeo').value = item.departamento + '/' + item.provincia + '/' + item.distrito;
//	            });

//	            

//	            myMAP.show();
//	        },
//	        error: function (e) {
//	            alert("Error " + e);
//	        }
//	    });
	}
}


function exportarBusqueda() {
    var table = "<table border='1'>";
    table += "<tr><th>N</th><th>Tipo (MAPs o CIRAs)</th><th>MAP / Nro CIRA</th></tr>";

    var grid = dijit.byId('myDataGrid');
    grid.store._arrayOfAllItems.forEach(function (item, inx) {
        table += "<tr><td>" + (inx + 1) + "</td><td>MAP</td><td>" + item.col2  + "</td></tr>";
    });

    var grid1 = dijit.byId('myDataGrid1');
    grid1.store._arrayOfAllItems.forEach(function (item, inx) {
        table += "<tr><td>" + (inx + 1) + "</td><td>CIRA(Areas)</td><td>" + item.col2 + "</td></tr>";

    });

    var grid2 = dijit.byId('myDataGrid2');
    grid2.store._arrayOfAllItems.forEach(function (item, inx) {
        table += "<tr><td>" + (inx + 1) + "</td><td>CIRA(Obras Lineales)</td><td>" + item.col2 + "</td></tr>";

    });

    table += "</table>";
    table = escape(table);
    exportData(table, 'Resultado de B\u00fasqueda de MAPs y CIRAs');
}

function exportData(table, title) {
    $('body').prepend("<form method='post' action='exportPage.aspx' style='top:-3333333333px;' id='tempForm'><input type='hidden' name='data' value='" + table + "' ><input type='hidden' name='title' value='" + title + "' ></form>");
    $('#tempForm').submit();
    $("tempForm").remove();
}


function exportUbigeo(lyr) {
    var inx = 0;
    var features_maps;
    var table = "<table border='1'>";
    table += "<tr><th>N</th><th>Tipo (MAPs o CIRAs)</th><th>MAP / Nro CIRA</th></tr>";

    var lyrQuery = new esri.tasks.QueryTask(urlSVR + lyr);
    var query = new esri.tasks.Query();
    query.returnGeometry = true;

    switch (lyr) {
        case 3:
            var dpto = dijit.byId('cboDpto').get('value');
            query.where = " first_iddp='" + dpto + "' ";
            lyrQuery.execute(query, function (results) {

                var queryTask2 = new esri.tasks.QueryTask(urlSVR + "2");
                var query2 = new esri.tasks.Query();
                query2.geometry = results.features[0].geometry;
                query2.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                query2.returnGeometry = false;
                query2.outFields = ["nomb_map"];
                queryTask2.execute(query2, function (results2) {
                    results2.features.forEach(function (item2) {
                        table += "<tr><td>" + (inx + 1) + "</td><td>MAP</td><td>" + item2.attributes.nomb_map + "</td></tr>";
                    });

                    var queryTask1 = new esri.tasks.QueryTask(urlSVR + "1");
                    var query1 = new esri.tasks.Query();
                    query1.geometry = results.features[0].geometry;
                    query1.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                    query1.returnGeometry = false;
                    query1.outFields = ["nro_cira"];
                    queryTask1.execute(query1, function (results1) {
                        results1.features.forEach(function (item1) {
                            table += "<tr><td>" + (inx + 1) + "</td><td>CIRA(Areas)</td><td>" + item1.attributes.nro_cira + "</td></tr>";
                        });

                        var queryTask0 = new esri.tasks.QueryTask(urlSVR + "0");
                        var query0 = new esri.tasks.Query();
                        query0.geometry = results.features[0].geometry;
                        query0.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                        query0.returnGeometry = false;
                        query0.outFields = ["nro_cira"];
                        queryTask0.execute(query0, function (results0) {
                            results0.features.forEach(function (item0) {
                                table += "<tr><td>" + (inx + 1) + "</td><td>CIRA(Obras Lineales)</td><td>" + item0.attributes.nro_cira + "</td></tr>";
                            });

                            table += "</table>";
                            table = escape(table);
                            exportData(table, 'Resultado de B\u00fasqueda de MAPs y CIRAs por Ubigeo');
                        });
                    });
                });

            });

            break;
        case 4:
            var prov = dijit.byId('cboProv').get('value');
            query.where = " first_idpr='" + prov + "' ";
            lyrQuery.execute(query, function (results) {

                var queryTask2 = new esri.tasks.QueryTask(urlSVR + "2");
                var query2 = new esri.tasks.Query();
                query2.geometry = results.features[0].geometry;
                query2.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                query2.returnGeometry = false;
                query2.outFields = ["nomb_map"];
                queryTask2.execute(query2, function (results2) {
                    results2.features.forEach(function (item2) {
                        table += "<tr><td>" + (inx + 1) + "</td><td>MAP</td><td>" + item2.attributes.nomb_map + "</td></tr>";
                    });

                    var queryTask1 = new esri.tasks.QueryTask(urlSVR + "1");
                    var query1 = new esri.tasks.Query();
                    query1.geometry = results.features[0].geometry;
                    query1.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                    query1.returnGeometry = false;
                    query1.outFields = ["nro_cira"];
                    queryTask1.execute(query1, function (results1) {
                        results1.features.forEach(function (item1) {
                            table += "<tr><td>" + (inx + 1) + "</td><td>CIRA(Areas)</td><td>" + item1.attributes.nro_cira + "</td></tr>";
                        });

                        var queryTask0 = new esri.tasks.QueryTask(urlSVR + "0");
                        var query0 = new esri.tasks.Query();
                        query0.geometry = results.features[0].geometry;
                        query0.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                        query0.returnGeometry = false;
                        query0.outFields = ["nro_cira"];
                        queryTask0.execute(query0, function (results0) {
                            results0.features.forEach(function (item0) {
                                table += "<tr><td>" + (inx + 1) + "</td><td>CIRA(Obras Lineales)</td><td>" + item0.attributes.nro_cira + "</td></tr>";
                            });

                            table += "</table>";
                            table = escape(table);
                            exportData(table, 'Resultado de B\u00fasqueda de MAPs y CIRAs por Ubigeo');
                        });
                    });
                });


            });
            break;
        case 5:
            var dist = dijit.byId('cboDist').get('value');
            query.where = " iddist='" + dist + "' ";
            lyrQuery.execute(query, function (results) {

                var queryTask2 = new esri.tasks.QueryTask(urlSVR + "2");
                var query2 = new esri.tasks.Query();
                query2.geometry = results.features[0].geometry;
                query2.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                query2.returnGeometry = false;
                query2.outFields = ["nomb_map"];
                queryTask2.execute(query2, function (results2) {
                    results2.features.forEach(function (item2) {
                        table += "<tr><td>" + (inx + 1) + "</td><td>MAP</td><td>" + item2.attributes.nomb_map + "</td></tr>";
                    });

                    var queryTask1 = new esri.tasks.QueryTask(urlSVR + "1");
                    var query1 = new esri.tasks.Query();
                    query1.geometry = results.features[0].geometry;
                    query1.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                    query1.returnGeometry = false;
                    query1.outFields = ["nro_cira"];
                    queryTask1.execute(query1, function (results1) {
                        results1.features.forEach(function (item1) {
                            table += "<tr><td>" + (inx + 1) + "</td><td>CIRA(Areas)</td><td>" + item1.attributes.nro_cira + "</td></tr>";
                        });

                        var queryTask0 = new esri.tasks.QueryTask(urlSVR + "0");
                        var query0 = new esri.tasks.Query();
                        query0.geometry = results.features[0].geometry;
                        query0.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
                        query0.returnGeometry = false;
                        query0.outFields = ["nro_cira"];
                        queryTask0.execute(query0, function (results0) {
                            results0.features.forEach(function (item0) {
                                table += "<tr><td>" + (inx + 1) + "</td><td>CIRA(Obras Lineales)</td><td>" + item0.attributes.nro_cira + "</td></tr>";
                            });

                            table += "</table>";
                            table = escape(table);
                            exportData(table, 'Resultado de B\u00fasqueda de MAPs y CIRAs por Ubigeo');
                        });
                    });
                });

            });
            break;
    }
    //loadingDpto.hide();
}